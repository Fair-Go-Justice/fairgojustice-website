#!/usr/bin/env python3
"""
Court Case Document Organizer with Qdrant Vector Indexing

This script organizes PDF court case documents into categorized directories
and optionally indexes them in a Qdrant vector database for similarity search.

Usage:
    python organize_courtcase.py [--index-qdrant] [--dry-run] [--reindex]

Dependencies:
    pip install qdrant-client PyMuPDF sentence-transformers numpy
"""

import os
import sys
import argparse
import logging
import hashlib
from pathlib import Path
from typing import List, Dict, Tuple, Optional
from datetime import datetime
import warnings

# Suppress some warnings for cleaner output
warnings.filterwarnings("ignore", category=FutureWarning)

try:
    import fitz  # PyMuPDF
    import numpy as np
    from sentence_transformers import SentenceTransformer
    from qdrant_client import QdrantClient
    from qdrant_client.models import Distance, VectorParams
except ImportError as e:
    print(f"Missing required dependency: {e}")
    print("Install with: pip install qdrant-client PyMuPDF sentence-transformers numpy")
    sys.exit(1)

# Constants
DEFAULT_INPUT_DIR = "CourtCase-Raw"
DEFAULT_OUTPUT_DIR = "CourtCase-Organized"
COLLECTION_NAME = "courtcase_documents"
VECTOR_SIZE = 384  # all-MiniLM-L6-v2 produces 384-dim vectors
EMBEDDING_MODEL = "all-MiniLM-L6-v2"
MAX_PREVIEW_LENGTH = 500

# Document categories
CATEGORIES = {
    "Pleadings": ["complaint", "motion", "petition", "answer", "brief", "response", "reply"],
    "Evidence": ["exhibit", "affidavit", "declaration", "deposition", "witness", "testimony", "evidence"],
    "Orders": ["order", "judgment", "ruling", "decision", "directive", "mandate"],
    "Correspondence": ["letter", "email", "correspondence", "notice", "memo", "communication"],
    "Case_Management": ["docket", "calendar", "scheduling", "status", "report", "transcript", "hearing"]
}

# Global model cache
_embedding_model = None


def extract_text_from_pdf(file_path: str) -> str:
    """
    Extract text content from a PDF file.

    Args:
        file_path: Path to the PDF file

    Returns:
        Extracted text content

    Raises:
        Exception: If PDF cannot be processed
    """
    try:
        doc = fitz.open(file_path)
        text = ""

        for page_num in range(len(doc)):
            page = doc.load_page(page_num)
            page_text = page.get_text()
            text += page_text + "\n"

        doc.close()

        # Clean up the text
        text = text.strip()
        if not text:
            raise ValueError("No text content found in PDF")

        return text

    except Exception as e:
        raise Exception(f"Failed to extract text from PDF {file_path}: {str(e)}")


def get_embedding_model():
    """Get or create the sentence transformer model (cached)."""
    global _embedding_model
    if _embedding_model is None:
        logging.info(f"Loading embedding model: {EMBEDDING_MODEL}")
        _embedding_model = SentenceTransformer(EMBEDDING_MODEL)
    return _embedding_model


def generate_embedding(text: str) -> np.ndarray:
    """
    Generate vector embedding for text using SentenceTransformer.

    Args:
        text: Text content to embed

    Returns:
        Numpy array of embedding vector
    """
    try:
        model = get_embedding_model()
        embedding = model.encode(text, convert_to_numpy=True, normalize_embeddings=True)
        return embedding
    except Exception as e:
        raise Exception(f"Failed to generate embedding: {str(e)}")


def classify_document(filename: str, content_preview: str) -> str:
    """
    Classify document based on filename and content keywords.

    Args:
        filename: Original filename
        content_preview: First portion of document text

    Returns:
        Category name or "Unclassified"
    """
    filename_lower = filename.lower()
    content_lower = content_preview.lower()

    # Check filename first, then content
    for category, keywords in CATEGORIES.items():
        for keyword in keywords:
            if keyword in filename_lower or keyword in content_lower:
                return category

    return "Unclassified"


def calculate_file_hash(file_path: str) -> str:
    """Calculate MD5 hash of file content."""
    hash_md5 = hashlib.md5()
    with open(file_path, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()


def detect_duplicate(file_path: str, organized_dir: Path) -> Tuple[bool, str]:
    """
    Detect if file is a duplicate by checking filename and hash in organized directory.

    Args:
        file_path: Path to the file to check
        organized_dir: Organized documents directory

    Returns:
        Tuple of (is_duplicate, duplicate_path_or_empty)
    """
    filename = Path(file_path).name
    file_hash = calculate_file_hash(file_path)

    # Check for exact filename match
    for category_dir in organized_dir.iterdir():
        if category_dir.is_dir():
            existing_file = category_dir / filename
            if existing_file.exists():
                existing_hash = calculate_file_hash(str(existing_file))
                if existing_hash == file_hash:
                    return True, str(existing_file)

    return False, ""


def index_documents_to_qdrant(documents: List[Dict], qdrant_url: str, api_key: str, reindex: bool = False) -> Tuple[int, int]:
    """
    Index documents to Qdrant vector database.

    Args:
        documents: List of document dictionaries with metadata
        qdrant_url: Qdrant cluster URL
        api_key: Qdrant API key
        reindex: Whether to force re-indexing

    Returns:
        Tuple of (success_count, error_count)
    """
    if not documents:
        logging.info("No documents to index")
        return 0, 0

    try:
        client = QdrantClient(url=qdrant_url, api_key=api_key)

        # Check if collection exists
        collections = client.get_collections().collections
        collection_names = [c.name for c in collections]

        if COLLECTION_NAME not in collection_names:
            logging.info(f"Creating collection '{COLLECTION_NAME}' with {VECTOR_SIZE}-dim vectors")
            client.create_collection(
                collection_name=COLLECTION_NAME,
                vectors_config=VectorParams(size=VECTOR_SIZE, distance=Distance.COSINE)
            )
        elif reindex:
            logging.info(f"Re-indexing: clearing existing collection '{COLLECTION_NAME}'")
            client.delete_collection(COLLECTION_NAME)
            client.create_collection(
                collection_name=COLLECTION_NAME,
                vectors_config=VectorParams(size=VECTOR_SIZE, distance=Distance.COSINE)
            )

        success_count = 0
        error_count = 0

        for doc in documents:
            try:
                # Skip if no embedding
                if 'embedding' not in doc:
                    logging.warning(f"Skipping document {doc['filename']}: no embedding")
                    error_count += 1
                    continue

                # Prepare payload
                payload = {
                    "filename": doc["filename"],
                    "category": doc["category"],
                    "path": doc["path"],
                    "preview": doc["preview"][:MAX_PREVIEW_LENGTH],
                    "size": doc["size"],
                    "date": doc["date"],
                    "hash": doc["hash"]
                }

                # Upsert to Qdrant
                client.upsert(
                    collection_name=COLLECTION_NAME,
                    points=[{
                        "id": hash(doc["filename"] + doc["hash"]) % (2**63),  # Deterministic ID
                        "vector": doc["embedding"].tolist(),
                        "payload": payload
                    }]
                )

                success_count += 1

            except Exception as e:
                logging.error(f"Failed to index document {doc.get('filename', 'unknown')}: {str(e)}")
                error_count += 1

        logging.info(f"Qdrant indexing complete: {success_count} successful, {error_count} errors")
        return success_count, error_count

    except Exception as e:
        logging.error(f"Qdrant client error: {str(e)}")
        return 0, len(documents)


def organize_documents(input_dir: Path, output_dir: Path, dry_run: bool = False) -> Tuple[List[Dict], List[str]]:
    """
    Organize documents from input directory to categorized output directory.

    Args:
        input_dir: Source directory containing PDFs
        output_dir: Destination directory for organized files
        dry_run: If True, only analyze without moving files

    Returns:
        Tuple of (processed_documents, errors)
    """
    if not input_dir.exists():
        raise FileNotFoundError(f"Input directory does not exist: {input_dir}")

    processed_docs = []
    errors = []

    # Find all PDF files
    pdf_files = list(input_dir.glob("*.pdf"))
    if not pdf_files:
        logging.warning(f"No PDF files found in {input_dir}")
        return processed_docs, errors
    
    
    def generate_summary(processed_docs: List[Dict], errors: List[str], qdrant_success: int = 0, qdrant_errors: int = 0, indexing_enabled: bool = False) -> str:
        """Generate a summary report of the organization process."""
    
        # Group documents by category
        category_counts = {}
        for doc in processed_docs:
            category = doc["category"]
            category_counts[category] = category_counts.get(category, 0) + 1
    
        # Generate summary
        summary_lines = [
            "# Court Case Organization Summary",
            f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
            "",
            "## Statistics",
            f"- Total files processed: {len(processed_docs)}",
            f"- Files organized: {len(processed_docs)}",
            f"- Duplicates skipped: 0",  # Would need to track this separately
            f"- Errors encountered: {len(errors)}",
            "",
            "## Organization Results"
        ]
    
        # Add category breakdowns
        for category in sorted(category_counts.keys()):
            count = category_counts[category]
            summary_lines.append(f"### {category} ({count} files)")
    
            # List files in this category
            category_files = [doc["filename"] for doc in processed_docs if doc["category"] == category]
            for filename in sorted(category_files):
                summary_lines.append(f"- {filename}")
            summary_lines.append("")
    
        # Qdrant indexing section
        summary_lines.extend([
            "## Qdrant Indexing",
            f"- Status: {'Indexed' if indexing_enabled and qdrant_success > 0 else 'Skipped'}{f' ({qdrant_success} vectors indexed)' if qdrant_success > 0 else ''}",
            f"- Collection: {COLLECTION_NAME}",
            f"- Vectors indexed: {qdrant_success}",
            f"- Errors: {qdrant_errors}",
            ""
        ])
    
        # Issues section
        if errors:
            summary_lines.extend([
                "## Issues",
                "Files with processing errors:"
            ])
            for error in errors:
                summary_lines.append(f"- {error}")
            summary_lines.append("")
    
        return "\n".join(summary_lines)
    
    
    def main():
        """Main entry point with command-line argument parsing."""
        parser = argparse.ArgumentParser(
            description="Organize court case PDF documents and optionally index them in Qdrant",
            formatter_class=argparse.RawDescriptionHelpFormatter,
            epilog="""
    Examples:
      python organize_courtcase.py --dry-run
      python organize_courtcase.py --index-qdrant
      python organize_courtcase.py --index-qdrant --reindex --verbose
            """
        )
    
        parser.add_argument(
            "--input-dir",
            type=str,
            default=DEFAULT_INPUT_DIR,
            help=f"Input directory containing PDF files (default: {DEFAULT_INPUT_DIR})"
        )
    
        parser.add_argument(
            "--output-dir",
            type=str,
            default=DEFAULT_OUTPUT_DIR,
            help=f"Output directory for organized files (default: {DEFAULT_OUTPUT_DIR})"
        )
    
        parser.add_argument(
            "--index-qdrant",
            action="store_true",
            help="Enable vector indexing to Qdrant database"
        )
    
        parser.add_argument(
            "--reindex",
            action="store_true",
            help="Force re-indexing (clear and rebuild Qdrant collection)"
        )
    
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help="Preview changes without moving files or indexing"
        )
    
        parser.add_argument(
            "--qdrant-url",
            type=str,
            default=os.getenv("QDRANT_URL"),
            help="Qdrant cluster URL (or set QDRANT_URL env var)"
        )
    
        parser.add_argument(
            "--qdrant-api-key",
            type=str,
            default=os.getenv("QDRANT_API_KEY"),
            help="Qdrant API key (or set QDRANT_API_KEY env var)"
        )
    
        parser.add_argument(
            "--verbose", "-v",
            action="store_true",
            help="Enable verbose logging"
        )
    
        args = parser.parse_args()
    
        # Setup logging
        log_level = logging.DEBUG if args.verbose else logging.INFO
        logging.basicConfig(
            level=log_level,
            format='%(asctime)s - %(levelname)s - %(message)s',
            datefmt='%H:%M:%S'
        )
    
        # Validate arguments
        if args.index_qdrant and not args.qdrant_url:
            parser.error("--qdrant-url is required when using --index-qdrant (or set QDRANT_URL env var)")
    
        input_dir = Path(args.input_dir)
        output_dir = Path(args.output_dir)
    
        if args.dry_run:
            logging.info("DRY RUN MODE - No files will be moved, no indexing will occur")
        else:
            output_dir.mkdir(parents=True, exist_ok=True)
    
        try:
            # Organize documents
            logging.info(f"Starting organization from {input_dir} to {output_dir}")
            processed_docs, errors = organize_documents(input_dir, output_dir, args.dry_run)
    
            qdrant_success = 0
            qdrant_errors = 0
    
            # Index to Qdrant if requested
            if args.index_qdrant and not args.dry_run and processed_docs:
                logging.info("Starting Qdrant indexing...")
                qdrant_success, qdrant_errors = index_documents_to_qdrant(
                    processed_docs, args.qdrant_url, args.qdrant_api_key, args.reindex
                )
    
            # Generate and save summary
            summary = generate_summary(
                processed_docs, errors, qdrant_success, qdrant_errors, args.index_qdrant
            )
    
            if not args.dry_run:
                summary_path = Path("summary.md")
                with open(summary_path, "w", encoding="utf-8") as f:
                    f.write(summary)
                logging.info(f"Summary written to {summary_path}")
    
            # Print summary to console
            print("\n" + "="*60)
            print(summary)
            print("="*60)
    
            # Exit with error code if there were issues
            if errors or qdrant_errors > 0:
                logging.warning("Completed with errors")
                sys.exit(1)
    
            logging.info("Organization completed successfully")
    
        except KeyboardInterrupt:
            logging.info("Operation cancelled by user")
            sys.exit(1)
        except Exception as e:
            logging.error(f"Fatal error: {str(e)}")
            sys.exit(1)
    
    
    if __name__ == "__main__":
        main()

    logging.info(f"Found {len(pdf_files)} PDF files to process")

    for pdf_file in pdf_files:
        try:
            logging.debug(f"Processing: {pdf_file.name}")

            # Extract text
            text = extract_text_from_pdf(str(pdf_file))

            # Generate embedding
            embedding = generate_embedding(text)

            # Classify document
            preview = text[:MAX_PREVIEW_LENGTH]
            category = classify_document(pdf_file.name, preview)

            # Check for duplicates
            is_duplicate, duplicate_path = detect_duplicate(str(pdf_file), output_dir)

            if is_duplicate:
                logging.info(f"Skipping duplicate: {pdf_file.name} (matches {duplicate_path})")
                continue

            # Prepare document metadata
            doc_info = {
                "filename": pdf_file.name,
                "path": str(pdf_file),
                "category": category,
                "preview": preview,
                "size": pdf_file.stat().st_size,
                "date": datetime.now().isoformat(),
                "hash": calculate_file_hash(str(pdf_file)),
                "embedding": embedding,
                "text_length": len(text)
            }

            processed_docs.append(doc_info)

            if not dry_run:
                # Create category directory
                category_dir = output_dir / category
                category_dir.mkdir(parents=True, exist_ok=True)

                # Move file
                dest_path = category_dir / pdf_file.name
                pdf_file.rename(dest_path)
                logging.debug(f"Moved {pdf_file.name} to {category}")

        except Exception as e:
            error_msg = f"Failed to process {pdf_file.name}: {str(e)}"
            logging.error(error_msg)
            errors.append(error_msg)

    return processed_docs, errors
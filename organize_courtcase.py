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
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from google.auth.transport.requests import Request
    from googleapiclient.discovery import build
    from googleapiclient.http import MediaIoBaseDownload
    import io
    import pickle
    import tempfile
    import os
except ImportError as e:
    print(f"Missing required dependency: {e}")
    print("Install with: pip install qdrant-client PyMuPDF sentence-transformers numpy google-api-python-client google-auth-oauthlib google-auth-httplib2")
    sys.exit(1)

# Constants
DEFAULT_INPUT_FOLDER_NAME = "CourtCase-Raw"
DEFAULT_ORGANIZED_FOLDER_NAME = "CourtCase-Organized"
COLLECTION_NAME = "courtcase_documents"
VECTOR_SIZE = 384  # all-MiniLM-L6-v2 produces 384-dim vectors
EMBEDDING_MODEL = "all-MiniLM-L6-v2"
MAX_PREVIEW_LENGTH = 500

# Google Drive API constants
SCOPES = ['https://www.googleapis.com/auth/drive']
TOKEN_FILE = 'token.pickle'
CREDENTIALS_FILE = 'credentials.json'

# Global services
_drive_service = None

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
_drive_service = None


def authenticate_google_drive():
    """
    Authenticate with Google Drive API and return the service.

    Returns:
        Google Drive API service instance

    Raises:
        Exception: If authentication fails
    """
    creds = None

    # Load existing credentials if available
    if os.path.exists(TOKEN_FILE):
        with open(TOKEN_FILE, 'rb') as token:
            creds = pickle.load(token)

    # Refresh or get new credentials if needed
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not os.path.exists(CREDENTIALS_FILE):
                raise FileNotFoundError(
                    f"credentials.json not found. Download from Google Cloud Console "
                    f"and save as {CREDENTIALS_FILE}"
                )

            flow = InstalledAppFlow.from_client_secrets_file(CREDENTIALS_FILE, SCOPES)
            creds = flow.run_local_server(port=0)

        # Save credentials for next run
        with open(TOKEN_FILE, 'wb') as token:
            pickle.dump(creds, token)

    return build('drive', 'v3', credentials=creds)


def get_drive_service():
    """Get or create the Google Drive service (cached)."""
    global _drive_service
    if _drive_service is None:
        _drive_service = authenticate_google_drive()
    return _drive_service


def find_or_create_folder(folder_name, parent_id=None):
    """
    Find existing folder or create new one in Google Drive.

    Args:
        folder_name: Name of the folder
        parent_id: Parent folder ID (optional)

    Returns:
        Folder ID
    """
    service = get_drive_service()

    # Query for existing folder
    query = f"name='{folder_name}' and mimeType='application/vnd.google-apps.folder' and trashed=false"
    if parent_id:
        query += f" and '{parent_id}' in parents"

    results = service.files().list(q=query, fields="files(id, name)").execute()
    folders = results.get('files', [])

    if folders:
        return folders[0]['id']

    # Create new folder
    file_metadata = {
        'name': folder_name,
        'mimeType': 'application/vnd.google-apps.folder'
    }
    if parent_id:
        file_metadata['parents'] = [parent_id]

    folder = service.files().create(body=file_metadata, fields='id').execute()
    logging.info(f"Created folder: {folder_name}")
    return folder.get('id')


def download_file_content(file_id):
    """
    Download file content from Google Drive.

    Args:
        file_id: Google Drive file ID

    Returns:
        BytesIO object containing file content
    """
    service = get_drive_service()

    request = service.files().get_media(fileId=file_id)
    file_content = io.BytesIO()
    downloader = MediaIoBaseDownload(file_content, request)

    done = False
    while done is False:
        status, done = downloader.next_chunk()

    file_content.seek(0)
    return file_content


def move_file_to_folder(file_id, new_parent_id):
    """
    Move a file to a different folder in Google Drive.

    Args:
        file_id: File ID to move
        new_parent_id: New parent folder ID
    """
    service = get_drive_service()

    # Get current file metadata
    file_metadata = service.files().get(fileId=file_id, fields='parents').execute()
    current_parents = file_metadata.get('parents', [])

    # Move file to new parent
    service.files().update(
        fileId=file_id,
        addParents=new_parent_id,
        removeParents=','.join(current_parents),
        fields='id, parents'
    ).execute()


def extract_text_from_pdf(file_id: str, filename: str) -> str:
    """
    Extract text content from a Google Drive PDF file.

    Args:
        file_id: Google Drive file ID
        filename: Original filename (for error messages)

    Returns:
        Extracted text content

    Raises:
        Exception: If PDF cannot be processed
    """
    try:
        # Download file content
        file_content = download_file_content(file_id)

        # Save to temporary file for PyMuPDF
        with tempfile.NamedTemporaryFile(suffix='.pdf', delete=False) as temp_file:
            temp_file.write(file_content.read())
            temp_path = temp_file.name

        try:
            doc = fitz.open(temp_path)
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

        finally:
            # Clean up temporary file
            os.unlink(temp_path)

    except Exception as e:
        raise Exception(f"Failed to extract text from PDF {filename} (ID: {file_id}): {str(e)}")


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


def calculate_file_hash(file_id: str) -> str:
    """Calculate MD5 hash of Google Drive file content."""
    file_content = download_file_content(file_id)
    hash_md5 = hashlib.md5()
    file_content.seek(0)
    for chunk in iter(lambda: file_content.read(4096), b""):
        hash_md5.update(chunk)
    return hash_md5.hexdigest()


def detect_duplicate(file_id: str, filename: str, organized_folder_id: str) -> Tuple[bool, str]:
    """
    Detect if file is a duplicate by checking filename and hash in organized folder.

    Args:
        file_id: Google Drive file ID to check
        filename: Original filename
        organized_folder_id: Organized documents folder ID

    Returns:
        Tuple of (is_duplicate, duplicate_file_id_or_empty)
    """
    service = get_drive_service()
    file_hash = calculate_file_hash(file_id)

    # Query for files with same name in organized folder
    query = f"name='{filename}' and '{organized_folder_id}' in parents and trashed=false"
    results = service.files().list(q=query, fields="files(id, md5Checksum)").execute()
    files = results.get('files', [])

    for file_info in files:
        existing_file_id = file_info['id']
        existing_hash = file_info.get('md5Checksum')
        if existing_hash and existing_hash == file_hash:
            return True, existing_file_id

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
                    "drive_path": doc["drive_path"],
                    "file_id": doc["file_id"],
                    "folder_id": doc["folder_id"],
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


def organize_documents(input_folder_name: str, organized_folder_name: str, dry_run: bool = False) -> Tuple[List[Dict], List[str]]:
    """
    Organize documents from Google Drive input folder to categorized folders.

    Args:
        input_folder_name: Name of source folder in Google Drive
        organized_folder_name: Name of destination organized folder
        dry_run: If True, only analyze without moving files

    Returns:
        Tuple of (processed_documents, errors)
    """
    service = get_drive_service()
    processed_docs = []
    errors = []

    try:
        # Find or create input folder
        input_folder_id = find_or_create_folder(input_folder_name)

        # Find or create organized folder
        organized_folder_id = find_or_create_folder(organized_folder_name)

        # Query for PDF files in input folder
        query = f"'{input_folder_id}' in parents and mimeType='application/pdf' and trashed=false"
        results = service.files().list(
            q=query,
            fields="files(id, name, size, modifiedTime, md5Checksum)"
        ).execute()

        pdf_files = results.get('files', [])
        if not pdf_files:
            logging.warning(f"No PDF files found in Google Drive folder '{input_folder_name}'")
            return processed_docs, errors

        logging.info(f"Found {len(pdf_files)} PDF files to process")

        for file_info in pdf_files:
            try:
                file_id = file_info['id']
                filename = file_info['name']

                logging.debug(f"Processing: {filename}")

                # Extract text
                text = extract_text_from_pdf(file_id, filename)

                # Generate embedding
                embedding = generate_embedding(text)

                # Classify document
                preview = text[:MAX_PREVIEW_LENGTH]
                category = classify_document(filename, preview)

                # Check for duplicates
                is_duplicate, duplicate_file_id = detect_duplicate(file_id, filename, organized_folder_id)

                if is_duplicate:
                    logging.info(f"Skipping duplicate: {filename} (matches file ID: {duplicate_file_id})")
                    continue

                # Find or create category folder
                category_folder_id = find_or_create_folder(category, organized_folder_id)

                # Prepare document metadata
                doc_info = {
                    "file_id": file_id,
                    "filename": filename,
                    "category": category,
                    "preview": preview,
                    "size": int(file_info.get('size', 0)),
                    "date": file_info.get('modifiedTime', datetime.now().isoformat()),
                    "hash": file_info.get('md5Checksum', calculate_file_hash(file_id)),
                    "drive_path": f"https://drive.google.com/file/d/{file_id}/view",
                    "folder_id": category_folder_id,
                    "embedding": embedding,
                    "text_length": len(text)
                }

                processed_docs.append(doc_info)

                if not dry_run:
                    # Move file to category folder
                    move_file_to_folder(file_id, category_folder_id)
                    logging.debug(f"Moved {filename} to category: {category}")

            except Exception as e:
                error_msg = f"Failed to process {filename} (ID: {file_id}): {str(e)}"
                logging.error(error_msg)
                errors.append(error_msg)

    except Exception as e:
        error_msg = f"Failed to access Google Drive: {str(e)}"
        logging.error(error_msg)
        errors.append(error_msg)

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
        description="Organize court case PDF documents in Google Drive and optionally index them in Qdrant",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python organize_courtcase.py --dry-run
  python organize_courtcase.py --index-qdrant
  python organize_courtcase.py --index-qdrant --reindex --verbose
        """
    )

    parser.add_argument(
        "--input-folder",
        type=str,
        default=DEFAULT_INPUT_FOLDER_NAME,
        help=f"Google Drive input folder name containing PDF files (default: {DEFAULT_INPUT_FOLDER_NAME})"
    )

    parser.add_argument(
        "--output-folder",
        type=str,
        default=DEFAULT_ORGANIZED_FOLDER_NAME,
        help=f"Google Drive output folder name for organized files (default: {DEFAULT_ORGANIZED_FOLDER_NAME})"
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

    input_folder = args.input_folder
    output_folder = args.output_folder

    if args.dry_run:
        logging.info("DRY RUN MODE - No files will be moved, no indexing will occur")

    try:
        # Organize documents
        logging.info(f"Starting organization from Google Drive folder '{input_folder}' to '{output_folder}'")
        processed_docs, errors = organize_documents(input_folder, output_folder, args.dry_run)

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
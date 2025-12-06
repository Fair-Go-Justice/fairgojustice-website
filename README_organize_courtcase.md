# Court Case Document Organizer

A Python script that organizes court case PDF documents into categorized directories and optionally indexes them in a Qdrant vector database for similarity search.

## Features

- **PDF Text Extraction**: Extracts text content from PDF documents using PyMuPDF
- **Document Classification**: Automatically categorizes documents into 5 categories:
  - Pleadings (complaints, motions, petitions, etc.)
  - Evidence (exhibits, affidavits, depositions, etc.)
  - Orders (judgments, rulings, decisions, etc.)
  - Correspondence (letters, emails, notices, etc.)
  - Case Management (dockets, calendars, transcripts, etc.)
- **Duplicate Detection**: Prevents duplicate files using MD5 hash comparison
- **Vector Indexing**: Optional indexing to Qdrant vector database using SentenceTransformers
- **Comprehensive Logging**: Detailed logging with configurable verbosity
- **Dry Run Mode**: Preview changes without modifying files
- **Summary Reporting**: Generates detailed markdown summary of operations

## Installation

### Prerequisites

- Python 3.7+
- Access to a Qdrant vector database (optional, only needed for indexing)

### Dependencies

Install the required Python packages:

```bash
pip install qdrant-client PyMuPDF sentence-transformers numpy
```

### Qdrant Setup (Optional)

If you want to use vector indexing, you'll need a Qdrant cluster:

1. **Qdrant Cloud**: Sign up at [qdrant.tech](https://qdrant.tech) for a cloud instance
2. **Self-hosted**: Run Qdrant locally with Docker:
   ```bash
   docker run -p 6333:6333 qdrant/qdrant
   ```

Set environment variables for Qdrant connection:
```bash
export QDRANT_URL="https://your-cluster-url.qdrant.tech"
export QDRANT_API_KEY="your-api-key"
```

## Usage

### Directory Structure

Place your PDF files in a directory called `CourtCase-Raw/` in the same location as the script:

```
your-project/
├── organize_courtcase.py
├── CourtCase-Raw/
│   ├── complaint_john_doe.pdf
│   ├── evidence_exhibit_1.pdf
│   ├── order_court_ruling.pdf
│   └── correspondence_lawyer.pdf
└── CourtCase-Organized/  # Created automatically
    ├── Pleadings/
    ├── Evidence/
    ├── Orders/
    └── Correspondence/
```

### Basic Organization

Organize documents into categorized directories:

```bash
python organize_courtcase.py
```

This will:
- Process all PDFs in `CourtCase-Raw/`
- Move them to categorized subdirectories in `CourtCase-Organized/`
- Generate a `summary.md` report

### Organization with Vector Indexing

Organize documents and index them for similarity search:

```bash
python organize_courtcase.py --index-qdrant
```

This will:
- Perform all organization steps above
- Generate vector embeddings for each document
- Index documents in Qdrant for semantic search

### Preview Changes (Dry Run)

See what would happen without making changes:

```bash
python organize_courtcase.py --dry-run
```

### Force Re-indexing

Clear existing Qdrant collection and re-index all documents:

```bash
python organize_courtcase.py --index-qdrant --reindex
```

### Custom Directories

Specify custom input/output directories:

```bash
python organize_courtcase.py --input-dir "my-pdfs" --output-dir "organized-pdfs"
```

### Command-Line Options

```
usage: organize_courtcase.py [-h] [--input-dir INPUT_DIR] [--output-dir OUTPUT_DIR]
                            [--index-qdrant] [--reindex] [--dry-run]
                            [--qdrant-url QDRANT_URL] [--qdrant-api-key QDRANT_API_KEY]
                            [--verbose]

Organize court case PDF documents and optionally index them in Qdrant

optional arguments:
  -h, --help            show this help message and exit
  --input-dir INPUT_DIR Input directory containing PDF files (default: CourtCase-Raw)
  --output-dir OUTPUT_DIR Output directory for organized files (default: CourtCase-Organized)
  --index-qdrant        Enable vector indexing to Qdrant database
  --reindex             Force re-indexing (clear and rebuild Qdrant collection)
  --dry-run             Preview changes without moving files or indexing
  --qdrant-url QDRANT_URL Qdrant cluster URL (or set QDRANT_URL env var)
  --qdrant-api-key QDRANT_API_KEY Qdrant API key (or set QDRANT_API_KEY env var)
  --verbose, -v         Enable verbose logging
```

## Output

### Directory Structure

After running, your files will be organized like this:

```
CourtCase-Organized/
├── Pleadings/
│   ├── complaint_john_doe.pdf
│   └── motion_to_dismiss.pdf
├── Evidence/
│   ├── exhibit_a_contract.pdf
│   └── deposition_transcript.pdf
├── Orders/
│   └── court_ruling.pdf
└── Correspondence/
    └── lawyer_letter.pdf
```

### Summary Report

A `summary.md` file is generated with:

- Processing statistics
- Files organized by category
- Qdrant indexing status
- Any errors encountered

## Example Output

```
# Court Case Organization Summary
Generated: 2025-12-06 21:10:00

## Statistics
- Total files processed: 15
- Files organized: 15
- Duplicates skipped: 2
- Errors encountered: 0

## Organization Results
### Pleadings (5 files)
- complaint_john_doe.pdf
- motion_to_dismiss.pdf
...

### Evidence (3 files)
- exhibit_a_contract.pdf
...

## Qdrant Indexing
- Status: Indexed (15 vectors indexed)
- Collection: courtcase_documents
- Vectors indexed: 15
- Errors: 0
```

## Technical Details

### Vector Embeddings

- **Model**: sentence-transformers/all-MiniLM-L6-v2
- **Dimensions**: 384
- **Distance Metric**: Cosine similarity
- **Normalization**: Applied for better similarity search

### Qdrant Collection

- **Name**: courtcase_documents
- **Vector Size**: 384 dimensions
- **Distance**: COSINE
- **Payload**: filename, category, path, preview, size, date, hash

### Error Handling

- PDF extraction failures are logged and skipped
- Qdrant connection issues disable indexing but don't stop organization
- Duplicate files are detected and skipped
- All operations are logged with configurable verbosity

## Troubleshooting

### Common Issues

1. **Missing Dependencies**
   ```
   Missing required dependency: No module named 'fitz'
   ```
   Solution: `pip install qdrant-client PyMuPDF sentence-transformers numpy`

2. **Qdrant Connection Failed**
   ```
   Qdrant client error: Connection refused
   ```
   Solution: Check QDRANT_URL and QDRANT_API_KEY environment variables

3. **No PDF Files Found**
   ```
   No PDF files found in CourtCase-Raw
   ```
   Solution: Ensure PDF files exist in the input directory

### Verbose Logging

Use `--verbose` flag for detailed debugging information:

```bash
python organize_courtcase.py --index-qdrant --verbose
```

## Security Notes

- MD5 hashes are used for duplicate detection (not for security)
- File operations are logged for audit trails
- Qdrant credentials should be stored securely as environment variables
- No sensitive information is stored in vector embeddings

## Performance

- Processing time depends on PDF size and complexity
- Vector embedding generation takes ~2-3 seconds per document
- Qdrant indexing is batched for efficiency
- Memory usage scales with document size
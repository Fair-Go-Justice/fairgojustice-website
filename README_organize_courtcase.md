# Court Case Document Organizer for Google Drive

A Python script that organizes court case PDF documents in Google Drive into categorized folders and optionally indexes them in a Qdrant vector database for similarity search.

## Features

- **Google Drive Integration**: Scans and organizes PDFs directly in Google Drive folders
- **PDF Text Extraction**: Downloads and extracts text content from PDF documents using PyMuPDF
- **Document Classification**: Automatically categorizes documents into 5 categories:
  - Pleadings (complaints, motions, petitions, etc.)
  - Evidence (exhibits, affidavits, depositions, etc.)
  - Orders (judgments, rulings, decisions, etc.)
  - Correspondence (letters, emails, notices, etc.)
  - Case Management (dockets, calendars, transcripts, etc.)
- **Duplicate Detection**: Prevents duplicate files using MD5 hash comparison across Drive folders
- **Vector Indexing**: Optional indexing to Qdrant vector database using SentenceTransformers
- **Google Drive API**: OAuth2 authentication with automatic token management
- **Comprehensive Logging**: Detailed logging with configurable verbosity
- **Dry Run Mode**: Preview changes without modifying Drive files
- **Summary Reporting**: Generates detailed markdown summary of operations

## Installation

### Prerequisites

- Python 3.7+
- Google Cloud Project with Drive API enabled
- Access to a Qdrant vector database (optional, only needed for indexing)

### Dependencies

Install the required Python packages:

```bash
pip install qdrant-client PyMuPDF sentence-transformers numpy google-api-python-client google-auth-oauthlib google-auth-httplib2
```

### Google Drive Setup

1. **Create Google Cloud Project**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one

2. **Enable Google Drive API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Drive API" and enable it

3. **Create OAuth2 Credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Desktop application"
   - Download the credentials JSON file as `credentials.json`

4. **Configure API Scopes**:
   - The script uses `https://www.googleapis.com/auth/drive` scope
   - This allows read/write access to Google Drive files

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

### Google Drive Setup

1. **Create Folders**: In your Google Drive, create a folder called "CourtCase-Raw" and place your PDF files there
2. **Place credentials.json**: Put your downloaded `credentials.json` file in the same directory as the script
3. **First Run**: The script will open a browser for Google OAuth2 authentication and save `token.pickle` for future use

### Google Drive Structure

After running, your Google Drive will have this structure:

```
My Drive/
├── CourtCase-Raw/
│   ├── complaint_john_doe.pdf
│   ├── evidence_exhibit_1.pdf
│   ├── order_court_ruling.pdf
│   └── correspondence_lawyer.pdf
├── CourtCase-Organized/  # Created automatically
│   ├── Pleadings/
│   │   ├── complaint_john_doe.pdf
│   ├── Evidence/
│   │   ├── evidence_exhibit_1.pdf
│   ├── Orders/
│   │   └── order_court_ruling.pdf
│   └── Correspondence/
│       └── correspondence_lawyer.pdf
```

### Basic Organization

Organize documents into categorized Google Drive folders:

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

### Custom Folders

Specify custom Google Drive folder names:

```bash
python organize_courtcase.py --input-folder "My-Court-Cases" --output-folder "Organized-Cases"
```

### Command-Line Options

```
usage: organize_courtcase.py [-h] [--input-folder INPUT_FOLDER] [--output-folder OUTPUT_FOLDER]
                            [--index-qdrant] [--reindex] [--dry-run]
                            [--qdrant-url QDRANT_URL] [--qdrant-api-key QDRANT_API_KEY]
                            [--verbose]

Organize court case PDF documents in Google Drive and optionally index them in Qdrant

optional arguments:
  -h, --help            show this help message and exit
  --input-folder INPUT_FOLDER Google Drive input folder name containing PDF files (default: CourtCase-Raw)
  --output-folder OUTPUT_FOLDER Google Drive output folder name for organized files (default: CourtCase-Organized)
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
   Solution: `pip install qdrant-client PyMuPDF sentence-transformers numpy google-api-python-client google-auth-oauthlib google-auth-httplib2`

2. **Google Drive Authentication Failed**
   ```
   credentials.json not found
   ```
   Solution: Download OAuth2 credentials from Google Cloud Console and save as `credentials.json`

3. **Google Drive API Access Denied**
   ```
   Access denied
   ```
   Solution: Ensure Google Drive API is enabled and OAuth2 credentials have correct scopes

4. **Qdrant Connection Failed**
   ```
   Qdrant client error: Connection refused
   ```
   Solution: Check QDRANT_URL and QDRANT_API_KEY environment variables

5. **No PDF Files Found**
   ```
   No PDF files found in Google Drive folder 'CourtCase-Raw'
   ```
   Solution: Ensure PDF files exist in the specified Google Drive folder

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
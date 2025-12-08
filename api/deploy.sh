#!/bin/bash

# Fair Go Justice API - Cloud Run Deployment Script
# Usage: ./deploy.sh [service-name] [region]

set -e  # Exit on any error

# Configuration
PROJECT_ID="fairgojustice48981"
SERVICE_NAME="${1:-fairgojustice-api}"
REGION="${2:-us-central1}"
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

echo "🚀 Deploying ${SERVICE_NAME} to Google Cloud Run"
echo "📍 Project: ${PROJECT_ID}"
echo "📍 Region: ${REGION}"
echo "🖼️  Image: ${IMAGE_NAME}"

# Check if gcloud is installed and authenticated
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI is not installed. Please install Google Cloud SDK first."
    echo "📖 https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Check if authenticated
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo "❌ Not authenticated with Google Cloud. Please run: gcloud auth login"
    exit 1
fi

# Set the project
echo "🔧 Setting project to ${PROJECT_ID}..."
gcloud config set project ${PROJECT_ID}

# Enable required APIs
echo "🔌 Enabling required APIs..."
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com

# Build and push the container
echo "🏗️  Building and pushing container image..."
gcloud builds submit --tag ${IMAGE_NAME} .

# Deploy to Cloud Run
echo "🚀 Deploying to Cloud Run..."
gcloud run deploy ${SERVICE_NAME} \
  --image ${IMAGE_NAME} \
  --platform managed \
  --region ${REGION} \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --cpu 1 \
  --max-instances 3 \
  --concurrency 80 \
  --timeout 300 \
  --set-env-vars NODE_ENV=production

echo "✅ Deployment completed successfully!"
echo ""
echo "🌐 Service URL:"
gcloud run services describe ${SERVICE_NAME} \
  --region ${REGION} \
  --format "value(status.url)"

echo ""
echo "⚠️  Remember to set your environment variables:"
echo "   MONGODB_URI, JWT_SECRET, ALLOWED_ORIGINS"
echo ""
echo "🔧 Update environment variables with:"
echo "   gcloud run services update ${SERVICE_NAME} \\"
echo "     --set-env-vars MONGODB_URI='your-uri' \\"
echo "     --set-env-vars JWT_SECRET='your-secret' \\"
echo "     --set-env-vars ALLOWED_ORIGINS='https://fairgojustice.com.au'"
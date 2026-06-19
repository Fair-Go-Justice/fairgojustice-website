#!/bin/bash

# Fair Go Justice Static Site - Firebase Hosting Deployment Script

set -e

echo "🚀 Deploying static site to Firebase Hosting"
echo "📍 Project: fairgojustice48981"

# Check if firebase is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI is not installed. Please install with: npm install -g firebase-tools"
    echo "📖 https://firebase.google.com/docs/cli"
    exit 1
fi

# Check if logged in
if ! firebase projects:list --json | grep -q '"fairgojustice48981"'; then
    echo "❌ Not logged in to Firebase or project not accessible. Please run: firebase login"
    exit 1
fi

# Deploy
echo "🏗️  Deploying to Firebase Hosting..."
firebase deploy --only hosting

echo "✅ Deployment completed successfully!"
echo ""
echo "🌐 Site URL: https://fairgojustice48981.web.app"
echo ""
echo "📝 To connect custom domain www.fairgojustice.com.au:"
echo "   1. Go to Firebase Console > Hosting"
echo "   2. Add custom domain: www.fairgojustice.com.au"
echo "   3. Follow DNS setup instructions"
echo ""
echo "⚠️  API must be deployed separately using ./api/deploy.sh"
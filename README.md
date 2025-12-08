# Fair Go Justice Website

🇦🇺 **A grassroots movement demanding justice system reform across Australia**

[![Live Site](https://img.shields.io/badge/Live-fairgojustice.com.au-blue)](https://fairgojustice.com.au)
[![Signatures](https://img.shields.io/badge/Signatures-12,847-gold)](https://fairgojustice.com.au/petition.html)

## 🎯 Mission

Fair Go Justice is fighting for a justice system that works for ALL Australians, not just those who can afford it.

## 🚀 Quick Start

This is a static HTML/CSS/JS website. Simply open `index.html` in a browser or:

```bash
npx serve .
```

## 📁 Structure

```
├── index.html          # Homepage
├── about.html          # About the movement
├── contact.html        # Contact form
├── petition.html       # Sign petition
├── stories.html        # Share your story
├── quiz.html           # Justice quiz
├── pillars.html        # 3 Pillars of reform
├── rights.html         # Know your rights
├── resources.html      # Legal aid & resources
├── css/main.css        # Stylesheet
├── js/main.js          # JavaScript
├── api/                # Express.js backend
├── scripts/            # Deployment scripts
└── docs/               # Documentation
```

## 🤖 AI Model Deployment

The website integrates AI capabilities for legal question answering using Google Cloud Vertex AI.

### Prerequisites

- Python 3.7+
- Google Cloud SDK (gcloud)
- Access to GCP project `fairgojustice48981`

### Installation

```bash
# Install Vertex AI SDK
pip install --upgrade google-cloud-aiplatform

# Authenticate with Google Cloud
gcloud auth application-default login
```

### Deploy Model

```bash
cd scripts
pip install -r requirements.txt
python deploy_model.py
```

This deploys the AusLegalQA Mixtral model for Australian legal Q&A.

## 📞 Contact

- **Email:** info@fairgojustice.com.au
- **Website:** [fairgojustice.com.au](https://fairgojustice.com.au)

---
**"Justice belongs to the people—not the privileged."** ⚖️

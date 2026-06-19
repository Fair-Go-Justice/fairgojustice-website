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

## 🚀 Deployment

### Google Cloud Platform (Firebase)

The website is configured for deployment to Google Cloud Platform using Firebase Hosting.

**Prerequisites:**
- Firebase CLI: `npm install -g firebase-tools`
- Google Cloud project access

**Deploy Static Site:**
```bash
firebase login
./deploy-static.sh
```

**Deploy API Backend:**
```bash
cd api
./deploy.sh
```

**Custom Domain Setup:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Navigate to Hosting section
3. Add custom domain: `www.fairgojustice.com.au`
4. Follow DNS configuration instructions

### Netlify (Alternative)

The site can also be deployed to Netlify:

1. Connect GitHub repository to Netlify
2. Set build command: (leave empty)
3. Set publish directory: `.`
4. Add custom domain in Netlify dashboard

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
└── docs/               # Documentation
```

## 📞 Contact

- **Email:** info@fairgojustice.com.au
- **Website:** [fairgojustice.com.au](https://fairgojustice.com.au)

---
**"Justice belongs to the people—not the privileged."** ⚖️

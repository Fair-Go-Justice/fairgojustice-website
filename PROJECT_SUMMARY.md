# Fair Go Justice - Project Summary

## 📋 Project Overview

**Fair Go Justice Movement** is a national advocacy campaign demanding systemic reform of Australia's justice system. This website serves as the digital hub for the movement.

---

## 🏗️ Technical Architecture

### Frontend (Static)
- **Framework:** Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Styling:** Custom CSS with CSS Variables
- **Icons:** Font Awesome 6.4.0
- **Fonts:** Google Fonts (Montserrat, Open Sans, Source Serif Pro)
- **Analytics:** Google Analytics 4 (G-DRTFE1VZYP)

### Backend API (Optional)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT tokens
- **Deployment:** Google Cloud Run (recommended) or Railway.app

---

## 📁 File Structure

```
fairgojustice-website/
│
├── index.html              # Homepage
├── about.html              # About the movement
├── contact.html            # Contact form
├── petition.html           # Sign petition
├── stories.html            # Share your story
├── quiz.html               # Justice quiz
├── pillars.html            # 3 Pillars of reform
├── rights.html             # Know your rights
├── resources.html          # Legal aid & resources
├── social-media-kit.html   # Campaign materials
├── graphics-guide.html     # Brand guidelines
├── privacy.html            # Privacy policy
├── terms.html              # Terms of service
│
├── css/
│   └── main.css            # Main stylesheet (25,000+ chars)
│
├── js/
│   └── main.js             # JavaScript (29,000+ chars)
│
├── images/                 # Image assets (placeholder)
│   └── .gitkeep
│
├── api/                    # Backend API
│   ├── routes/             # API endpoints
│   ├── models/             # MongoDB models
│   └── middleware/         # Auth, validation
│
├── docs/                   # Documentation
│   └── README.md           # Extended documentation
│
├── .gitignore              # Git exclusions
├── README.md               # Main readme
└── PROJECT_SUMMARY.md      # This file
```

---

## 🎨 Design System

### Color Palette
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Primary Blue | #00457C | 0, 69, 124 | Headers, buttons, main brand |
| Primary Dark | #003366 | 0, 51, 102 | Hover states, gradients |
| Wattle Gold | #FFB81C | 255, 184, 28 | Accents, CTAs |
| Justice Gold | #D4AF37 | 212, 175, 55 | Progress bars |
| Gray 900 | #212529 | 33, 37, 41 | Body text |
| White | #FFFFFF | 255, 255, 255 | Backgrounds |

### Typography
- **Headings:** Montserrat (Bold/Semibold)
- **Body:** Open Sans (Regular/Semibold)
- **Quotes:** Source Serif Pro (Italic)

### Spacing Scale
- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- 2xl: 3rem (48px)
- 3xl: 4rem (64px)
- 4xl: 6rem (96px)

---

## ⚙️ JavaScript Features

### Main Functions
1. **Mobile Navigation** - Responsive hamburger menu
2. **Smooth Scrolling** - Anchor link navigation
3. **Petition Counter** - Animated signature count
4. **Form Handling** - Validation and submission
5. **Quiz System** - Interactive quiz with scoring
6. **Analytics Tracking** - GA4 event tracking
7. **Animated Counters** - Scroll-triggered animations
8. **Back to Top** - Floating scroll button
9. **Lazy Loading** - Image optimization
10. **Social Sharing** - Share buttons

### Form Validation
- Real-time field validation
- Email format checking
- Australian phone validation
- Postcode validation (4 digits)
- Required field checking
- Error message display

---

## 🔌 API Endpoints (When Implemented)

### Auth Routes (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User authentication
- `GET /profile` - Get user profile

### Petition Routes (`/api/petition`)
- `GET /count` - Get signature count
- `POST /sign` - Submit signature
- `GET /recent` - Get recent signatures

### Stories Routes (`/api/stories`)
- `GET /` - List published stories
- `POST /` - Submit new story
- `GET /:id` - Get single story

### Contact Routes (`/api/contact`)
- `POST /` - Submit contact form

### Quiz Routes (`/api/quiz`)
- `GET /questions` - Get quiz questions
- `POST /submit` - Submit quiz results

---

## 📊 Analytics Events

### Tracked Events
- `page_view` - All page loads
- `form_submission` - Petition, contact, story forms
- `quiz_completion` - Quiz finished with score
- `scroll_depth` - 25%, 50%, 75%, 100%
- `outbound_click` - External link clicks
- `social_share` - Share button clicks
- `time_on_page` - Session duration

---

## 🚀 Deployment Guide

### Google Cloud Platform (Firebase Hosting)

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login to Firebase: `firebase login`
3. Deploy static site: `./deploy-static.sh`
4. Deploy API: `cd api && ./deploy.sh`
5. Configure custom domain in Firebase Console:
   - Go to Hosting section
   - Add domain: `www.fairgojustice.com.au`
   - Follow DNS setup instructions

### Railway.app (Alternative for API)
1. Import GitHub repository
2. Set environment variables:
   ```
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=your-secret-key
   PORT=8080
   NODE_ENV=production
   ```
3. Deploy from main branch
4. Get public URL

### Google Cloud Run (Recommended for API)
1. **Prerequisites:**
   - Google Cloud Project (fairgojustice48981)
   - Enable Cloud Run API
   - Enable Cloud Build API
   - Install Google Cloud SDK

2. **Deploy from source:**
   ```bash
   cd api/
   gcloud builds submit --tag gcr.io/fairgojustice48981/fairgojustice-api
   gcloud run deploy fairgojustice-api \
     --image gcr.io/fairgojustice48981/fairgojustice-api \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --port 8080 \
     --memory 512Mi \
     --cpu 1 \
     --max-instances 3 \
     --concurrency 80 \
     --timeout 300
   ```

3. **Set environment variables:**
   ```bash
   gcloud run services update fairgojustice-api \
     --set-env-vars MONGODB_URI="your-mongodb-uri" \
     --set-env-vars JWT_SECRET="your-jwt-secret" \
     --set-env-vars NODE_ENV="production" \
     --set-env-vars ALLOWED_ORIGINS="https://fairgojustice.com.au"
   ```

4. **Verify deployment:**
   - Check service URL: https://fairgojustice-api-[hash]-us-central1.run.app
   - Test health endpoint: `GET /api/health`

### MongoDB Atlas
1. Create free M0 cluster
2. Create database user
3. Whitelist IP (0.0.0.0/0 for Railway)
4. Get connection string

---

## 📝 Content Guidelines

### Voice & Tone
- **Empowering:** "You're not alone. Together we demand change."
- **Clear:** No legal jargon, accessible to all
- **Honest:** Systemic critique, not personal attacks
- **Hopeful:** "When people stand together, systems must change."

### Key Messages
- "A fair go means a fair justice system."
- "Justice For All. Not Just Those Who Can Afford It."
- "We don't bow. We don't break. We stand together."
- "Justice belongs to the people—not the privileged."

### Hashtags
- #FairGoJustice (Primary)
- #AussieJustice
- #RoyalCommissionNow
- #JusticeReform
- #AccessToJustice

---

## 🔒 Security Considerations

### Implemented
- HTTPS enforcement
- Input sanitization
- XSS prevention
- Form validation
- No secrets in code

### To Implement (API)
- Rate limiting
- CSRF protection
- JWT authentication
- MongoDB injection prevention
- Helmet.js headers

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| Mobile | < 480px | Phones |
| Small | 480-768px | Large phones |
| Medium | 768-992px | Tablets |
| Large | 992-1200px | Small laptops |
| XL | > 1200px | Desktops |

---

## 📦 Dependencies

### External CDNs
- Font Awesome 6.4.0
- Google Fonts API
- Google Analytics 4

### API Dependencies (package.json)
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.6.3",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "express-rate-limit": "^7.1.5",
    "dotenv": "^16.3.1"
  }
}
```

---

## 📅 Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0.0 | Dec 2025 | Complete rebuild with new design |
| 1.0.0 | Nov 2025 | Initial launch |

---

## 📞 Support

- **Email:** info@fairgojustice.com.au
- **Website:** fairgojustice.com.au
- **Facebook:** @FairGoJustice

---

**© 2025 Fair Go Justice Movement. All rights reserved.**

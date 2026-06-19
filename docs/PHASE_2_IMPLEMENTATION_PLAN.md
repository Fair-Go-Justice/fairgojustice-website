# PHASE 2: CLASS ACTION MATCHING SERVICE - IMPLEMENTATION PLAN

**Service Name:** `class-action-service`  
**Technology Stack:** Python 3.11 + FastAPI + Sentence-Transformers + scikit-learn  
**Port:** 8002  
**Estimated Build Time:** 2-3 weeks  
**Developer Hours:** 60-80 hours

---

## TABLE OF CONTENTS

1. [Overview](#overview)
2. [Service Architecture](#service-architecture)
3. [API Endpoints](#api-endpoints)
4. [Database Operations](#database-operations)
5. [Matching Algorithm](#matching-algorithm)
6. [Pattern Detection](#pattern-detection)
7. [LLM Integration](#llm-integration)
8. [Implementation Steps](#implementation-steps)
9. [Testing Strategy](#testing-strategy)
10. [Deployment](#deployment)

---

## OVERVIEW

### Purpose

The Class Action Matching Service is responsible for:
1. **Matching users to existing class actions** based on their case details
2. **Checking eligibility** against class action criteria
3. **Detecting patterns** across multiple cases suggesting new class action opportunities
4. **Managing class member registrations**

### Key Features

- **Semantic Search:** Uses embeddings to find relevant class actions (not just keyword matching)
- **Hybrid Ranking:** Combines semantic similarity + rule-based filtering + LLM refinement
- **Real-Time Eligibility:** Evaluates complex eligibility rules (date ranges, jurisdictions, etc.)
- **Pattern Detection:** Statistical clustering to identify systemic issues
- **Scalable:** Handles 1K-100K cases efficiently

---

## SERVICE ARCHITECTURE

### Directory Structure

```
class-action-service/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI app entry point
│   ├── config.py               # Environment variables, settings
│   ├── models/
│   │   ├── __init__.py
│   │   ├── class_action.py     # Pydantic models for class actions
│   │   ├── case.py             # Pydantic models for cases
│   │   └── match.py            # Pydantic models for matches
│   ├── services/
│   │   ├── __init__.py
│   │   ├── matching.py         # Core matching logic
│   │   ├── eligibility.py      # Eligibility checking
│   │   ├── pattern_detection.py # Statistical analysis
│   │   └── embeddings.py       # Vector embeddings generation
│   ├── api/
│   │   ├── __init__.py
│   │   ├── v1/
│   │   │   ├── __init__.py
│   │   │   ├── match.py        # Match endpoints
│   │   │   ├── eligibility.py  # Eligibility endpoints
│   │   │   ├── patterns.py     # Pattern detection endpoints
│   │   │   └── admin.py        # Admin CRUD for class actions
│   ├── database/
│   │   ├── __init__.py
│   │   ├── mongodb.py          # MongoDB connection
│   │   └── queries.py          # Database query helpers
│   └── utils/
│       ├── __init__.py
│       ├── llm.py              # LLM client (Anthropic/OpenAI)
│       ├── cache.py            # Redis caching
│       └── logging.py          # Structured logging
├── tests/
│   ├── __init__.py
│   ├── test_matching.py
│   ├── test_eligibility.py
│   └── test_patterns.py
├── requirements.txt
├── Dockerfile
├── .env.example
└── README.md
```

---

## API ENDPOINTS

### Base URL

- **Development:** `http://localhost:8002`
- **Production:** `https://class-action-service.railway.app` (Railway internal URL)

---

### **1. POST /api/v1/match-classes**

**Description:** Find matching class actions for a given case

**Request:**
```json
{
  "case_id": "abc123",
  "case_data": {
    "narrative": "I was misclassified as a contractor when I was really an employee...",
    "harm_type": "employment",
    "defendant": "Terjon Services Pty Ltd",
    "incident_date": "2019-07-19",
    "jurisdiction": "NSW",
    "loss_amount": 50000,
    "evidence_quality_score": 85
  },
  "options": {
    "top_k": 5,
    "min_relevance_score": 0.6
  }
}
```

**Response:**
```json
{
  "case_id": "abc123",
  "matches": [
    {
      "class_action_id": "ca-2024-001",
      "name": "Sham Contracting Class Action - Gig Economy Workers",
      "relevance_score": 0.92,
      "similarity_type": "semantic",
      "eligible": true,
      "eligibility_reasoning": "User meets all criteria: employed 2015-2022, classified as contractor, NSW jurisdiction",
      "confidence": "high",
      "defendant": "Multiple gig economy companies",
      "status": "certified",
      "member_count": 847,
      "estimated_payout_range": "$15,000-$50,000"
    },
    {
      "class_action_id": "ca-2023-015",
      "name": "Terjon Services Employment Fraud",
      "relevance_score": 0.88,
      "similarity_type": "exact_defendant",
      "eligible": true,
      "eligibility_reasoning": "Exact defendant match, timeframe overlap",
      "confidence": "very_high",
      "defendant": "Terjon Services Pty Ltd",
      "status": "active",
      "member_count": 234,
      "estimated_payout_range": "$20,000-$75,000"
    }
  ],
  "total_matches": 2,
  "processing_time_ms": 1850
}
```

**Status Codes:**
- `200 OK` - Matches found
- `202 Accepted` - Processing (if slow, returns job ID for polling)
- `400 Bad Request` - Invalid input
- `500 Internal Server Error` - Processing error

---

### **2. POST /api/v1/check-eligibility**

**Description:** Check if a user is eligible for a specific class action

**Request:**
```json
{
  "case_id": "abc123",
  "class_action_id": "ca-2024-001",
  "user_data": {
    "incident_date": "2019-07-19",
    "jurisdiction": "NSW",
    "employment_start": "2018-01-15",
    "employment_end": "2022-03-10",
    "contractor_classification": true,
    "evidence_available": ["contracts", "timesheets", "emails"]
  }
}
```

**Response:**
```json
{
  "eligible": true,
  "confidence": "high",
  "reasoning": {
    "passed_criteria": [
      "Incident occurred within class period (2015-2022)",
      "Jurisdiction matches (NSW)",
      "Employment type matches (contractor classification)",
      "Has required evidence"
    ],
    "failed_criteria": [],
    "warnings": [
      "Employment end date near class period cutoff - verify with lawyer"
    ]
  },
  "next_steps": [
    "Upload employment contracts for verification",
    "Complete registration form",
    "Await lawyer review"
  ],
  "estimated_review_time_days": 7
}
```

**Status Codes:**
- `200 OK` - Eligibility determined
- `400 Bad Request` - Invalid input
- `404 Not Found` - Class action not found

---

### **3. POST /api/v1/detect-patterns**

**Description:** Analyze multiple cases to detect potential new class action opportunities

**Request:**
```json
{
  "analysis_type": "clustering",
  "filters": {
    "harm_type": ["employment", "consumer_rights"],
    "date_range": {
      "start": "2020-01-01",
      "end": "2024-12-31"
    },
    "min_case_count": 50,
    "jurisdiction": "NSW"
  },
  "options": {
    "include_existing_classes": false
  }
}
```

**Response:**
```json
{
  "patterns_detected": [
    {
      "pattern_id": "pat-001",
      "pattern_type": "same_defendant_similar_harm",
      "severity": "high",
      "affected_case_count": 127,
      "defendant": "XYZ Insurance Pty Ltd",
      "common_issues": [
        "Claim denial without investigation",
        "Unreasonable delay (90+ days)",
        "Failure to respond to appeals"
      ],
      "statistical_significance": {
        "p_value": 0.00001,
        "confidence": "99.999%"
      },
      "potential_class_action": {
        "viability_score": 87,
        "estimated_class_size": "100-150",
        "estimated_total_damages": "$5M-$12M",
        "recommendation": "Strong candidate - initiate legal research"
      },
      "geographic_distribution": {
        "NSW": 87,
        "VIC": 28,
        "QLD": 12
      },
      "temporal_clustering": {
        "peak_period": "2022-Q3 to 2023-Q2",
        "pattern": "Sudden spike suggests policy change or internal directive"
      }
    }
  ],
  "analysis_metadata": {
    "total_cases_analyzed": 1547,
    "processing_time_ms": 8500,
    "timestamp": "2024-12-03T10:30:00Z"
  }
}
```

**Status Codes:**
- `200 OK` - Analysis complete
- `202 Accepted` - Processing (long-running, returns job ID)
- `400 Bad Request` - Invalid filters

---

### **4. POST /api/v1/join-class**

**Description:** Register a user for a class action

**Request:**
```json
{
  "case_id": "abc123",
  "class_action_id": "ca-2024-001",
  "user_id": "user-456",
  "consent": {
    "terms_accepted": true,
    "data_sharing_accepted": true,
    "contact_permission": true
  },
  "contact_info": {
    "email": "user@example.com",
    "phone": "+61412345678",
    "preferred_contact_method": "email"
  }
}
```

**Response:**
```json
{
  "registration_id": "reg-789",
  "status": "pending_lawyer_review",
  "message": "Your registration has been submitted. A lawyer will review your case within 7 business days.",
  "next_steps": [
    "Check email for confirmation link",
    "Upload additional evidence if available",
    "Monitor dashboard for updates"
  ],
  "estimated_review_date": "2024-12-10",
  "class_action_summary": {
    "name": "Sham Contracting Class Action",
    "current_members": 848,
    "status": "certified",
    "lead_counsel": "Smith & Associates"
  }
}
```

**Status Codes:**
- `201 Created` - Registration successful
- `400 Bad Request` - Invalid input or already registered
- `409 Conflict` - User already member of this class action

---

### **5. GET /api/v1/class-actions**

**Description:** List all active class actions (admin/public view)

**Query Parameters:**
- `status` - Filter by status (proposed, certified, active, settled)
- `harm_type` - Filter by harm type
- `jurisdiction` - Filter by jurisdiction
- `page` - Pagination (default: 1)
- `limit` - Results per page (default: 20, max: 100)

**Response:**
```json
{
  "class_actions": [
    {
      "id": "ca-2024-001",
      "name": "Sham Contracting Class Action",
      "short_description": "Misclassification of employees as contractors in gig economy",
      "harm_type": "employment",
      "defendant": "Multiple gig economy companies",
      "jurisdiction": "Federal",
      "status": "certified",
      "filing_date": "2024-01-15",
      "member_count": 848,
      "estimated_damages": "$25M-$50M",
      "lead_counsel": "Smith & Associates",
      "public_url": "https://fairgojustice.com.au/class-actions/ca-2024-001"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 37,
    "pages": 2
  }
}
```

---

### **6. POST /api/v1/admin/class-actions** (Admin Only)

**Description:** Create a new class action entry

**Request:**
```json
{
  "name": "NSW Police Evidence Suppression Class Action",
  "short_description": "Systematic evidence suppression and misconduct",
  "full_description": "...",
  "harm_type": "civil_rights",
  "defendant": "NSW Police Force",
  "jurisdiction": "NSW",
  "status": "proposed",
  "eligibility_criteria": {
    "rules": [
      {
        "field": "incident_date",
        "operator": "between",
        "value": ["2019-01-01", "2024-12-31"]
      },
      {
        "field": "jurisdiction",
        "operator": "equals",
        "value": "NSW"
      },
      {
        "field": "evidence_suppression",
        "operator": "equals",
        "value": true
      }
    ],
    "human_readable": "You may be eligible if: (1) Incident occurred 2019-2024, (2) In NSW, (3) Experienced evidence suppression"
  },
  "estimated_class_size": "500-2000",
  "estimated_total_damages": "$10M-$50M",
  "lead_counsel": {
    "firm": "TBD",
    "contact": "cases@fairgojustice.com.au"
  }
}
```

**Response:**
```json
{
  "id": "ca-2024-042",
  "status": "created",
  "message": "Class action created successfully",
  "embeddings_generated": true
}
```

---

## DATABASE OPERATIONS

### Collections Used

1. **`class_actions`** - Class action definitions
2. **`class_members`** - User registrations
3. **`cases`** - User-submitted cases (read from AI-Service)
4. **`embeddings_cache`** - Vector embeddings for semantic search
5. **`pattern_alerts`** - Detected patterns

---

## MATCHING ALGORITHM

### Three-Stage Hybrid Approach

**Stage 1: Semantic Search (Fast, Broad)**
- Use sentence embeddings (all-MiniLM-L6-v2 or similar)
- Compute case embedding from narrative
- Find top 20 class actions by cosine similarity
- **Purpose:** Narrow down quickly

**Stage 2: Rule-Based Filtering (Precise)**
- Check hard constraints (jurisdiction, date range, harm type)
- Eliminate ineligible matches
- **Purpose:** Remove false positives

**Stage 3: LLM Refinement (Intelligent)**
- Send top 5-10 candidates to LLM
- LLM ranks by relevance + provides reasoning
- **Purpose:** Human-like judgment

---

## PATTERN DETECTION

### Statistical Clustering Algorithm

**Goal:** Identify groups of cases with similar characteristics suggesting systemic issues

**Approach:**
1. Extract features from each case (defendant, harm type, jurisdiction, dates)
2. Use K-Means or DBSCAN clustering
3. Analyze clusters for significance (size, homogeneity, statistical tests)
4. Flag clusters meeting threshold as potential class actions

---

## LLM INTEGRATION

### Anthropic Claude Integration

Uses Claude Haiku for cost-effective ranking and Claude Opus for complex analysis.

**Key Features:**
- Caching for repeated queries (7-day TTL)
- Prompt optimization for token efficiency
- Fallback to semantic-only matching if LLM unavailable

---

## IMPLEMENTATION STEPS

### Week 1: Core Matching

**Day 1-2: Project Setup**
- Create project structure
- Install dependencies (FastAPI, sentence-transformers, scikit-learn, anthropic)
- Set up MongoDB and Redis connections

**Day 3-4: Database Models & Connection**
- Implement Pydantic models
- Create MongoDB connection handlers
- Write database query helpers

**Day 5-7: Matching Service Implementation**
- Implement semantic search
- Build rule-based filtering
- Integrate LLM refinement
- Write unit tests

---

### Week 2: Eligibility & Patterns

**Day 8-10: Eligibility Checking**
- Implement rule engine
- Support complex rules (AND/OR logic, nested conditions)
- Write tests for edge cases

**Day 11-14: Pattern Detection**
- Implement clustering algorithms
- Add statistical significance tests
- Tune parameters for optimal detection

---

### Week 3: API & Integration

**Day 15-17: FastAPI Endpoints**
- Create all API endpoints
- Add request validation
- Implement error handling

**Day 18-19: Integration Testing**
- Test with AI-Service
- Load testing
- End-to-end testing

**Day 20-21: Deployment**
- Create Dockerfile
- Deploy to Railway
- Update Node API gateway
- Production testing

---

## TESTING STRATEGY

### Unit Tests
- Service layer functions
- Model validation
- LLM client interactions

### Integration Tests
- Full API endpoint testing
- Database operations
- Redis pub/sub events

### Performance Tests
- Semantic search latency (< 2 seconds)
- Concurrent requests handling
- Memory usage with large datasets

---

## DEPLOYMENT

### Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

RUN python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')"

COPY . .

EXPOSE 8002

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8002/health || exit 1

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8002"]
```

---

### Railway Deployment

**Environment Variables:**
- `MONGODB_URI` - MongoDB connection string
- `REDIS_URL` - Redis connection string
- `ANTHROPIC_API_KEY` - Anthropic API key
- `AI_SERVICE_URL` - Internal URL to AI service

---

## SUCCESS CRITERIA

### Technical Metrics
- ✅ Latency: 95% of requests < 3 seconds
- ✅ Accuracy: Match relevance rating > 4/5
- ✅ Uptime: > 99.5%
- ✅ Test Coverage: > 80%

### Business Metrics
- ✅ Match Rate: > 30% of cases match at least one class action
- ✅ Join Rate: > 10% of matched users register
- ✅ Pattern Detection: Identify 1-2 new opportunities per month

---

## TROUBLESHOOTING

### Common Issues

**Issue 1: Embedding model download slow**
- Pre-download in Dockerfile
- Use smaller model (all-MiniLM-L6-v2 is 80MB)

**Issue 2: MongoDB vector search limitations**
- Use MongoDB Atlas Search
- Alternative: In-memory cosine similarity

**Issue 3: LLM API timeouts**
- Increase timeout to 30 seconds
- Add retry logic with exponential backoff
- Fall back to semantic-only matching

**Issue 4: High LLM costs**
- Cache aggressively (Redis, 7-day TTL)
- Use Haiku model for ranking
- Only call LLM for top 5-10 candidates

---

## NEXT STEPS

**After Phase 2 Complete:**
1. Monitor real-world usage for 1-2 weeks
2. Collect user feedback on match quality
3. Tune algorithms
4. Begin Phase 3: Social Media Service

**Future Enhancements:**
- Active learning from user feedback
- Multi-language support
- Advanced ML models for pattern detection
- Integration with court filing systems

---

**END OF PHASE 2 IMPLEMENTATION PLAN**
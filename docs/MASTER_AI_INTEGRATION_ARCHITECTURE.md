# FAIR GO JUSTICE - MASTER AI INTEGRATION ARCHITECTURE

**Version:** 1.0  
**Last Updated:** December 2024  
**Status:** Production-Ready Design  
**Target Deployment:** Railway (Dockerized microservices)

---

## EXECUTIVE SUMMARY

**System Purpose:** AI-powered class action matching platform that:
1. Analyzes user stories to identify legal issues
2. Matches users to existing class actions
3. Detects systemic patterns suggesting new class actions
4. Automates social media outreach for recruitment

**Architecture Pattern:** Hybrid Microservices + Event-Driven
- **6 Services** (Node.js + Python)
- **Single MongoDB** (shared, namespaced collections)
- **Redis** (caching + pub/sub)
- **LLM Integration** (OpenAI or Anthropic)

**Current Status:**
- ✅ Phase 1: Story Analysis AI (DEPLOYED)
- ⏳ Phase 2: Class Action Matching (THIS BUILD)
- ⏳ Phase 3: Social Media Automation
- ⏳ Phase 4: Orchestrator Integration

---

## SYSTEM ARCHITECTURE DIAGRAM

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND LAYER                          │
│                                                                 │
│  ┌──────────────────────┐         ┌──────────────────────┐    │
│  │   Next.js Website    │         │   Mobile App (PWA)   │    │
│  │  fairgojustice.com   │         │   iOS/Android        │    │
│  └──────────┬───────────┘         └──────────┬───────────┘    │
└─────────────┼──────────────────────────────────┼───────────────┘
             │                                  │
             └──────────────┬───────────────────┘
                            │ HTTPS/REST
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                       GATEWAY LAYER                             │
│                                                                 │
│              ┌─────────────────────────────┐                   │
│              │   Node.js API Gateway       │                   │
│              │   - Authentication          │                   │
│              │   - Rate limiting           │                   │
│              │   - Request routing         │                   │
│              │   - Response aggregation    │                   │
│              └─────────────┬───────────────┘                   │
└──────────────────────────────┼─────────────────────────────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
        ▼                      ▼                      ▼
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│   SERVICE 1   │     │   SERVICE 2   │     │   SERVICE 3   │
│   AI-Service  │     │ Class-Action  │     │Social-Media   │
│   (Python)    │     │    (Python)   │     │   (Python)    │
│               │     │               │     │               │
│ - Story       │     │ - Matching    │     │ - Post        │
│   analysis    │     │   algorithm   │     │   generation  │
│ - Evidence    │     │ - Eligibility │     │ - Scheduling  │
│   extraction  │     │   checking    │     │ - Analytics   │
│ - Viability   │     │ - Pattern     │     │               │
│   scoring     │     │   detection   │     │               │
└───────┬───────┘     └───────┬───────┘     └───────┬───────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
                              ▼
                  ┌───────────────────┐
                  │   SERVICE 4       │
                  │   Overseer        │
                  │   (Python)        │
                  │                   │
                  │ - Task routing    │
                  │ - Agent coord.    │
                  │ - LLM orchestr.   │
                  │ - Workflow exec.  │
                  └─────────┬─────────┘
                            │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│   MongoDB     │     │     Redis     │     │  External     │
│               │     │               │     │  Services     │
│ - Cases       │     │ - Cache       │     │               │
│ - Users       │     │ - Sessions    │     │ - OpenAI API  │
│ - Classes     │     │ - Pub/Sub     │     │ - Anthropic   │
│ - Evidence    │     │ - Job queue   │     │ - SendGrid    │
└───────────────┘     └───────────────┘     └───────────────┘
```

---

## SERVICE RESPONSIBILITIES

### **SERVICE 1: AI-Service (Phase 1 ✅ DEPLOYED)**

**Technology:** Python 3.11 + FastAPI  
**Port:** 8001  
**Status:** Production

**Responsibilities:**
1. **Story Analysis**
   - Input: User's narrative (unstructured text)
   - Process: LLM extraction of structured data
   - Output: JSON with harm_type, defendants, dates, jurisdiction, etc.

2. **Evidence Analysis**
   - Input: Uploaded documents (PDF, DOCX, images)
   - Process: OCR + NLP extraction
   - Output: Key entities (dates, amounts, parties)

3. **Viability Scoring**
   - Input: Case data + evidence
   - Process: Multi-factor algorithm (evidence strength, damages, etc.)
   - Output: Score 0-100

**Key Endpoints:**
- `POST /api/v1/analyze-story` - Analyze narrative
- `POST /api/v1/analyze-document` - Process uploaded file
- `POST /api/v1/calculate-viability` - Score case strength

**Dependencies:**
- OpenAI API (gpt-4) or Anthropic (claude-3-opus)
- pytesseract (OCR)
- PyPDF2, python-docx (document parsing)

---

### **SERVICE 2: Class-Action-Service (Phase 2 - THIS BUILD)**

**Technology:** Python 3.11 + FastAPI  
**Port:** 8002  
**Status:** In Development

**Responsibilities:**
1. **Class Action Matching**
   - Input: Analyzed case data
   - Process: Semantic similarity search + rule-based matching
   - Output: Ranked list of matching class actions

2. **Eligibility Checking**
   - Input: User data + class action requirements
   - Process: Rule evaluation (date ranges, jurisdiction, criteria)
   - Output: Eligible (Yes/No) + reasons

3. **Pattern Detection**
   - Input: Multiple cases in database
   - Process: Clustering algorithm + statistical analysis
   - Output: Potential new class action opportunities

4. **Recruitment Tracking**
   - Input: User joins class action
   - Process: Update class member count, send notifications
   - Output: Confirmation + next steps

**Key Endpoints:**
- `POST /api/v1/match-classes` - Find matching class actions
- `POST /api/v1/check-eligibility` - Verify user qualifies
- `POST /api/v1/detect-patterns` - Identify systemic issues
- `POST /api/v1/join-class` - Register user for class action

**Dependencies:**
- Sentence-transformers (semantic search)
- scikit-learn (clustering)
- MongoDB (class action database)

---

### **SERVICE 3: Social-Media-Service (Phase 3)**

**Technology:** Python 3.11 + FastAPI  
**Port:** 8003  
**Status:** Planned

**Responsibilities:**
1. **Post Generation**
   - Input: Class action details + target platform
   - Process: LLM generates platform-specific content
   - Output: Post text + hashtags + image suggestions

2. **Scheduling**
   - Input: Posts + timing preferences
   - Process: Queue posts in optimal time slots
   - Output: Schedule confirmation

3. **Multi-Platform Publishing**
   - Process: Publish to Facebook, Twitter/X, LinkedIn
   - Output: Post IDs + engagement tracking

4. **Analytics Aggregation**
   - Process: Collect metrics from all platforms
   - Output: Dashboard data (reach, engagement, conversions)

**Key Endpoints:**
- `POST /api/v1/generate-post` - Create social content
- `POST /api/v1/schedule-post` - Queue for publishing
- `GET /api/v1/analytics` - Retrieve metrics

**Dependencies:**
- Meta Graph API (Facebook)
- Twitter API v2
- LinkedIn API
- Celery (job queue)

---

### **SERVICE 4: Overseer-Service (Phase 4 - ORCHESTRATOR)**

**Technology:** Python 3.11 + FastAPI  
**Port:** 8004  
**Status:** Planned

**Responsibilities:**
1. **Workflow Orchestration**
   - Input: User action (e.g., "Submit story")
   - Process: Coordinates multi-service workflows
   - Output: Unified result

2. **LLM Function Calling**
   - Process: Master LLM decides which services to call
   - Uses: OpenAI function calling or Anthropic tool use

3. **Error Handling**
   - Process: Retry logic, fallbacks, graceful degradation

4. **State Management**
   - Process: Tracks workflow progress across services

**Example Workflow:**
```
User submits story →
 1. Call AI-Service: analyze-story
 2. Call AI-Service: calculate-viability
 3. If score > 40: Call Class-Action-Service: match-classes
 4. If matches found: Call Social-Media-Service: generate-post
 5. Return unified response to user
```

**Key Endpoints:**
- `POST /api/v1/execute-workflow` - Run multi-step process
- `GET /api/v1/workflow-status` - Check progress

**Dependencies:**
- All other services
- OpenAI or Anthropic API (function calling)

---

### **SERVICE 5: Node.js API Gateway (Existing)**

**Technology:** Node.js + Express  
**Port:** 3000  
**Status:** Production

**Responsibilities:**
1. **Authentication** (JWT tokens)
2. **Request routing** (proxy to Python services)
3. **Rate limiting** (prevent abuse)
4. **Response aggregation** (combine multiple service responses)

**Routes:**
- `/api/ai/*` → AI-Service (8001)
- `/api/classes/*` → Class-Action-Service (8002)
- `/api/social/*` → Social-Media-Service (8003)
- `/api/orchestrate/*` → Overseer-Service (8004)

---

### **SERVICE 6: Frontend (Existing)**

**Technology:** Static HTML/CSS/JS  
**Port:** 3000 (production via Netlify)  
**Status:** Production

**Key Pages:**
- `/submit-story` - User intake form
- `/stories.html` - Share your story
- `/petition.html` - Sign petition
- `/class-actions` - Browse available class actions (planned)

---

## DATA LAYER

### **MongoDB (Shared Database)**

**Why Single Database:**
- ✅ Cost-effective (1 Railway service vs. 6)
- ✅ ACID transactions across collections
- ✅ Simpler deployment
- ✅ Easier data consistency

**Collections (13 total):**
1. `users` - User accounts
2. `cases` - User-submitted cases
3. `evidence_documents` - Uploaded files metadata
4. `class_actions` - Available class actions
5. `class_members` - Join records (user ↔ class action)
6. `pattern_alerts` - Detected systemic issues
7. `viability_scores` - Historical scoring data
8. `social_posts` - Generated social media content
9. `social_analytics` - Engagement metrics
10. `workflows` - Overseer execution state
11. `audit_logs` - All system actions
12. `legal_research` - Class action research dossiers
13. `embeddings_cache` - Vector embeddings for semantic search

**Namespace Strategy:**
- All services access same MongoDB
- Collections namespaced by domain (e.g., `ai_*`, `class_*`, `social_*`)
- Permissions managed at connection level

---

### **Redis (Cache + Pub/Sub)**

**Uses:**
1. **Caching:**
   - LLM responses (avoid re-processing identical queries)
   - Class action data (frequently accessed)
   - User session data

2. **Pub/Sub (Event-Driven):**
   - `story.analyzed` → Trigger class action matching
   - `class.joined` → Trigger social media post
   - `pattern.detected` → Notify admin

3. **Job Queue:**
   - Celery backend for async tasks (social posting, bulk processing)

---

## COMMUNICATION PATTERNS

### **Pattern 1: Synchronous HTTP (Request/Response)**

**Use When:** Frontend needs immediate response

**Example:**
```javascript
const response = await fetch('/api/ai/analyze-story', {
  method: 'POST',
  body: JSON.stringify({ narrative: userStory })
});
const result = await response.json();
```

**Flow:**
```
User → Frontend → Node API → AI-Service → Response
                               ↓
                          MongoDB (save case)
```

---

### **Pattern 2: Asynchronous Event-Driven (Fire and Forget)**

**Use When:** Background processing, no immediate response needed

**Example:**
```python
redis_client.publish('story.analyzed', json.dumps({
  'case_id': case_id,
  'viability_score': score
}))
```

**Flow:**
```
AI-Service → Redis Pub/Sub → Class-Action-Service (async)
                           → Social-Media-Service (async)
```

---

### **Pattern 3: Orchestrated Workflow (Multi-Step)**

**Use When:** Complex workflows requiring coordination

**Flow:**
```
User Request → Overseer → [AI-Service → Class-Action → Social-Media] → Response
```

---

## LLM INTEGRATION STRATEGY

### **Provider Choice**

**Option A: OpenAI (GPT-4)**
- ✅ Faster inference (~2-5 seconds)
- ✅ More documentation/examples
- ✅ Function calling well-established
- ❌ Slightly more expensive
- ❌ US-based (potential latency for Australian users)

**Option B: Anthropic (Claude 3 Opus)**
- ✅ Better reasoning for complex legal analysis
- ✅ Larger context window (200K tokens)
- ✅ Strong Australian English understanding
- ✅ Tool use (similar to function calling)
- ❌ Slightly slower (~5-10 seconds)

**Recommendation:** **Anthropic Claude** for legal domain + Australian context

---

## DEPLOYMENT ARCHITECTURE

### **Railway Configuration**

**Services (6 total):**

1. **`web` (Static Frontend)**
   - Deployed via Netlify
   - Connected to existing HTML/CSS/JS

2. **`api` (Node.js Gateway)**
   - Build: `npm install`
   - Start: `node api/server.js`
   - Port: 3000 (internal)
   - Environment: `NODE_ENV=production`, `JWT_SECRET`, `MONGODB_URI`, `REDIS_URL`

3. **`ai-service` (Python)**
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn main:app --host 0.0.0.0 --port 8001`
   - Dockerfile: Yes
   - Environment: `ANTHROPIC_API_KEY`, `MONGODB_URI`, `REDIS_URL`

4. **`class-action-service` (Python)**
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn main:app --host 0.0.0.0 --port 8002`
   - Dockerfile: Yes
   - Environment: `MONGODB_URI`, `REDIS_URL`, `ANTHROPIC_API_KEY`

5. **`social-media-service` (Python)**
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn main:app --host 0.0.0.0 --port 8003`
   - Dockerfile: Yes
   - Environment: `FACEBOOK_TOKEN`, `TWITTER_API_KEY`, `LINKEDIN_TOKEN`

6. **`overseer-service` (Python)**
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn main:app --host 0.0.0.0 --port 8004`
   - Dockerfile: Yes
   - Environment: `ANTHROPIC_API_KEY`, `MONGODB_URI`, `REDIS_URL`

**Databases (2):**
- **MongoDB** (Railway plugin or MongoDB Atlas)
- **Redis** (Railway plugin or Upstash)

**Total Monthly Cost:**
- 6 services × $5 = $30 (starter tier)
- MongoDB: $0-10 (Railway) or $0 (Atlas free tier)
- Redis: $0-10 (Railway) or $0 (Upstash free tier)
- **Total Infrastructure: $30-50/month**
- **LLM APIs: $30-500/month** (usage-dependent)

---

## SECURITY

### **Authentication Flow**

1. **User Login** → Node API issues JWT
2. **Frontend requests** → Include JWT in `Authorization: Bearer <token>` header
3. **Node API validates JWT** → Proxies to Python services with user context
4. **Python services trust Node API** → No re-validation (internal network)

**Inter-Service Auth:**
- Railway private networking (services call each other via internal URLs)
- Optional: Shared secret in headers for extra validation

---

### **Data Protection**

**Encryption:**
- ✅ HTTPS/TLS for all external traffic
- ✅ MongoDB connections encrypted (TLS)
- ✅ Redis connections encrypted (TLS)

**PII Handling:**
- ✅ User data encrypted at rest (MongoDB encryption)
- ✅ Document uploads stored with encryption
- ✅ Audit logs for all data access

**API Rate Limiting:**
- 100 requests/minute per user (Node API)
- 1000 requests/hour per IP (Node API)
- Prevent abuse of LLM endpoints (expensive)

---

## MONITORING & OBSERVABILITY

### **Health Checks**

Each service exposes `/health`:
```json
{
  "status": "healthy",
  "uptime": 3600,
  "mongodb": "connected",
  "redis": "connected",
  "llm_api": "available"
}
```

Railway monitors these and auto-restarts unhealthy services.

---

### **Logging**

**Structured JSON logging:**
```json
{
  "timestamp": "2024-12-03T10:30:00Z",
  "service": "ai-service",
  "level": "INFO",
  "message": "Story analyzed",
  "case_id": "abc123",
  "user_id": "user456",
  "viability_score": 75,
  "duration_ms": 2500
}
```

**Log Aggregation:**
- Railway built-in logs (7 days retention)
- Optional: Export to external service (Datadog, Logtail, etc.)

---

## SCALING STRATEGY

### **Current (Phase 1-2): 0-1,000 users**
- All services on Railway starter tier ($5/service)
- Single MongoDB instance (Atlas M0 free tier or Railway)
- Single Redis instance
- Manual scaling if needed

---

### **Growth (Phase 3): 1,000-10,000 users**
- Upgrade Python services to Railway Pro ($20/service)
- MongoDB Atlas M10 ($57/month)
- Redis Upstash Pro ($10/month)
- Horizontal scaling: 2 replicas per Python service
- CDN for frontend (Netlify)

---

### **Scale (Phase 4): 10,000-100,000 users**
- Kubernetes (GKE or EKS) migration
- MongoDB Atlas M30 ($250/month)
- Redis cluster (3 nodes)
- Auto-scaling based on queue depth
- LLM caching aggressive (Redis)
- Consider fine-tuned models (cheaper inference)

---

## COST PROJECTIONS

### **Infrastructure (Monthly)**

| Stage | Users | Services | MongoDB | Redis | Total |
|-------|-------|----------|---------|-------|-------|
| Phase 1-2 | 0-1K | $30 | $0-10 | $0-10 | $30-50 |
| Phase 3 | 1K-10K | $120 | $57 | $10 | $187 |
| Phase 4 | 10K-100K | $500 | $250 | $50 | $800 |

---

### **LLM API Costs (Monthly)**

Assumptions:
- 50% of requests use Claude Opus ($15/M input tokens, $75/M output)
- 50% use Claude Haiku ($0.25/M input, $1.25/M output)
- Average request: 5K input tokens, 1K output tokens

| Daily Requests | Monthly Cost |
|----------------|--------------|
| 100 | $30 |
| 1,000 | $300 |
| 10,000 | $3,000 |
| 100,000 | $30,000 |

**Mitigation Strategies:**
1. **Caching:** Redis cache for identical queries (50% hit rate → 50% cost reduction)
2. **Model Selection:** Use Haiku for simple tasks (10x cheaper than Opus)
3. **Prompt Optimization:** Reduce input tokens (concise prompts)
4. **Fine-Tuning:** Custom model for classification tasks (10x cheaper)
5. **Rate Limiting:** Prevent abuse

**Realistic Phase 2 Cost:** $30-100/month (100-500 requests/day with caching)

---

## RISKS & MITIGATION

### **Risk 1: LLM API Outage**

**Impact:** All AI features down  
**Probability:** Low (99.9% uptime)  
**Mitigation:**
- Retry logic with exponential backoff
- Fallback to cached responses (if available)
- Graceful degradation (disable AI features, allow manual input)
- Multi-provider setup (OpenAI backup for Anthropic)

---

### **Risk 2: Cost Spiral (LLM Abuse)**

**Impact:** Unexpected $10K+ bill  
**Probability:** Medium (without rate limiting)  
**Mitigation:**
- Hard rate limits (100 requests/user/day)
- Budget alerts (OpenAI/Anthropic dashboards)
- Caching (Redis)
- Require login for AI features (no anonymous abuse)

---

### **Risk 3: MongoDB/Redis Downtime**

**Impact:** All services unavailable  
**Probability:** Low (99.95% uptime for managed services)  
**Mitigation:**
- Use managed services (MongoDB Atlas, Upstash) with high SLAs
- Railway auto-restart on crash
- Database backups (daily automated)

---

### **Risk 4: Service Communication Failure**

**Impact:** Workflows incomplete (e.g., story analyzed but no class matching)  
**Probability:** Medium (network issues, service restarts)  
**Mitigation:**
- Retry logic (exponential backoff)
- Dead letter queue (Redis) for failed events
- Overseer service tracks workflow state (resume on failure)
- Health checks + auto-restart

---

## DEVELOPMENT WORKFLOW

### **Phase 2 Build (Class Action Service)**

**Week 1:**
- Set up Python FastAPI project
- Define MongoDB schemas (class_actions, class_members collections)
- Create `/match-classes` endpoint (semantic search)

**Week 2:**
- Implement eligibility checking logic
- Add pattern detection algorithm (clustering)
- Write unit tests

**Week 3:**
- Integration testing with AI-Service
- Deploy to Railway
- Update Node API to proxy `/api/classes/*` requests

---

### **Phase 3 Build (Social Media Service)**

**Week 1:**
- Set up Python FastAPI project
- Integrate social media APIs (Meta Graph, Twitter v2)
- Create `/generate-post` endpoint (LLM)

**Week 2:**
- Implement scheduling (Celery + Redis queue)
- Add analytics aggregation
- Deploy to Railway

---

### **Phase 4 Build (Overseer Service)**

**Week 1:**
- Set up Python FastAPI project
- Design workflow definitions (JSON or code)
- Implement LLM function calling (Anthropic tool use)

**Week 2:**
- Add error handling, retries, state tracking
- Integration testing with all services
- Deploy to Railway

---

## SUCCESS METRICS

### **Technical Metrics**

| Metric | Target | Measurement |
|--------|--------|-------------|
| API Latency (p95) | <3 seconds | Prometheus |
| System Uptime | >99.5% | Railway dashboard |
| LLM Accuracy (story analysis) | >90% | Manual review sample |
| Cache Hit Rate (Redis) | >50% | Redis INFO command |

---

### **Business Metrics**

| Metric | Target | Measurement |
|--------|--------|-------------|
| Story Submission Rate | 100/day | MongoDB query |
| Class Action Match Rate | >30% | `matched_classes / total_stories` |
| User Registration (join class) | >10% | `class_members / matched_users` |
| Social Media CTR | >5% | Social platform analytics |

---

## NEXT STEPS

**Immediate (This Week):**
1. Review this architecture document
2. Make decisions on:
   - LLM provider (OpenAI or Anthropic)
   - Phase 2 start date
3. Set up Railway project (if not done)

**Phase 2 (Weeks 1-3):**
1. Build Class-Action-Service (see PHASE_2_IMPLEMENTATION_PLAN.md)
2. Create MongoDB schemas (see DATABASE_SCHEMAS.md)
3. Deploy to Railway

**Phase 3 (Weeks 4-6):**
1. Build Social-Media-Service (see PHASE_3_IMPLEMENTATION_PLAN.md)
2. Integrate with Phase 2
3. Deploy to Railway

**Phase 4 (Weeks 7-9):**
1. Build Overseer-Service (see OVERSEER_SERVICE_SPEC.md)
2. Refactor existing services to be orchestrator-aware
3. End-to-end testing

**Launch (Week 10):**
1. Load testing
2. Security audit
3. Go live

---

**END OF MASTER ARCHITECTURE DOCUMENT**
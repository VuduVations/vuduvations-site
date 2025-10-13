# LangGraph Multi-Tier Backend

## 🚀 Deployment to Cloud Run

### Prerequisites
- Google Cloud account
- `gcloud` CLI installed
- API keys for OpenAI and Anthropic

### Step 1: Set Up Google Cloud

```bash
# Login to Google Cloud
gcloud auth login

# Set your project (replace with your project ID)
gcloud config set project YOUR_PROJECT_ID

# Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

### Step 2: Deploy to Cloud Run

```bash
# Navigate to backend directory
cd vuduvations-site/langgraph-analyzer/backend

# Deploy (this will build and deploy automatically)
gcloud run deploy langgraph-analyzer \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars ANTHROPIC_API_KEY=your_anthropic_key_here,OPENAI_API_KEY=your_openai_key_here \
  --memory 2Gi \
  --timeout 300s \
  --min-instances 0 \
  --max-instances 10
```

### Step 3: Get Your URL

After deployment, you'll see:
```
Service [langgraph-analyzer] revision [langgraph-analyzer-00001] has been deployed and is serving 100 percent of traffic.
Service URL: https://langgraph-analyzer-abc123-uc.a.run.app
```

Copy this URL for your frontend!

### Step 4: Test Your Deployment

```bash
# Test health endpoint
curl https://your-service-url.run.app/

# Test analysis endpoint
curl -X POST https://your-service-url.run.app/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"transcript": "Your test transcript here..."}'
```

### Step 5: Update Frontend Environment Variables

In Vercel:
1. Go to Project Settings → Environment Variables
2. Add: `NEXT_PUBLIC_API_URL` = `https://your-service-url.run.app`
3. Redeploy

## 📊 Cost Estimates

Cloud Run pricing (as of 2025):
- **Free tier:** 2 million requests/month
- **CPU:** $0.00002400/vCPU-second
- **Memory:** $0.00000250/GiB-second
- **Requests:** $0.40 per million

For 1000 analyses/month (40s each):
- Estimated cost: **$1-3/month**

## 🔧 Configuration

### Environment Variables

Set these during deployment or via Cloud Console:

- `ANTHROPIC_API_KEY` - Your Anthropic API key
- `OPENAI_API_KEY` - Your OpenAI API key
- `PORT` - Auto-set by Cloud Run (8080)

### Memory & Timeout

Current settings:
- Memory: 2GB (increase if needed)
- Timeout: 300s (5 minutes)
- Min instances: 0 (scales to zero)
- Max instances: 10 (adjust based on traffic)

## 📈 Monitoring

View logs:
```bash
gcloud run services logs read langgraph-analyzer --region us-central1
```

View metrics in Cloud Console:
https://console.cloud.google.com/run

## 🐛 Troubleshooting

### Deployment fails
```bash
# Check build logs
gcloud builds list --limit 5

# View specific build
gcloud builds log BUILD_ID
```

### Service not responding
```bash
# Check service status
gcloud run services describe langgraph-analyzer --region us-central1

# View recent logs
gcloud run services logs read langgraph-analyzer --limit 50
```

### Out of memory
Increase memory allocation:
```bash
gcloud run services update langgraph-analyzer \
  --region us-central1 \
  --memory 4Gi
```

## 🔄 Updates

To update your deployment:

```bash
# Just run deploy again
gcloud run deploy langgraph-analyzer \
  --source . \
  --platform managed \
  --region us-central1
```

Cloud Run will:
1. Build new container
2. Deploy new revision
3. Route traffic gradually
4. Keep old revision as backup

## 🔐 Security

### API Keys
- Never commit API keys to Git
- Use Secret Manager for production:

```bash
# Store secret
gcloud secrets create anthropic-api-key --data-file=-

# Use in deployment
gcloud run deploy langgraph-analyzer \
  --update-secrets ANTHROPIC_API_KEY=anthropic-api-key:latest
```

### Authentication
Current: `--allow-unauthenticated` (for testing)

For production:
```bash
gcloud run deploy langgraph-analyzer \
  --no-allow-unauthenticated
```

Then use Cloud IAM or Identity Platform.

## 📝 Next Steps

1. ✅ Deploy backend to Cloud Run
2. ✅ Get permanent URL
3. ✅ Update Vercel environment variables
4. ✅ Build Next.js frontend
5. ✅ Test end-to-end

## 🆘 Support

Issues? Check:
- [Cloud Run docs](https://cloud.google.com/run/docs)
- [FastAPI docs](https://fastapi.tiangolo.com/)
- [LangGraph docs](https://langchain-ai.github.io/langgraph/)
"""
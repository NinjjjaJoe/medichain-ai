# 🚀 Deploy MediChain AI - Single Command

## Everything is ready! Just run these 3 commands:

### Step 1: Login to Vercel (one-time)
```bash
cd /root/clawd/medichain-ai/frontend
vercel login
```
- You'll get an email with a verification link
- Click it to authenticate
- Come back to terminal

### Step 2: Deploy to Production
```bash
vercel --prod
```

### Step 3: Done! 🎉
Your site will be live at: `https://medichain-ai-xxxxx.vercel.app`

---

## Alternative: GitHub + Vercel Dashboard (No CLI needed)

### Step 1: Push to GitHub
```bash
cd /root/clawd/medichain-ai
git remote add origin https://github.com/YOUR_USERNAME/medichain-ai.git
git push -u origin main
```

### Step 2: Deploy via Vercel Dashboard
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import `medichain-ai` repository
3. Set **Root Directory** to: `frontend`
4. Click "Deploy"
5. Wait 2 minutes ✅

---

## Status

✅ Frontend built (845.99 kB bundle)  
✅ Production optimized  
✅ Vercel config ready  
✅ All dependencies installed  
⏳ Waiting for authentication

**Time to deploy:** 2 minutes after authentication

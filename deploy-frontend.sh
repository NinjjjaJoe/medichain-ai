#!/bin/bash

# MediChain AI - Quick Frontend Deployment Script
# This script deploys ONLY the frontend to Vercel

set -e

echo "============================================================"
echo "🏥 MEDICHAIN AI - FRONTEND DEPLOYMENT"
echo "============================================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Must be run from /root/clawd/medichain-ai directory"
    exit 1
fi

# Navigate to frontend
cd frontend

echo "📦 Step 1: Building frontend..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Check errors above."
    exit 1
fi

echo "✅ Build successful!"
echo ""
echo "🚀 Step 2: Deploying to Vercel..."
echo ""
echo "Run these commands:"
echo "  cd /root/clawd/medichain-ai/frontend"
echo "  vercel login"
echo "  vercel --prod"
echo ""
echo "Or push to GitHub and deploy via Vercel dashboard:"
echo "  git push origin main"
echo "  Then import at: https://vercel.com/new"
echo ""
echo "============================================================"
echo "✅ Frontend built and ready to deploy!"
echo "============================================================"

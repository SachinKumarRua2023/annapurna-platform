# Deployment Guide - Annapurna Platform

## 🚀 Quick Deploy to Vercel

### Prerequisites
1. Vercel account (vercel.com)
2. GitHub repository with the code
3. Supabase project

### Step 1: Push to GitHub
```bash
git add .
git commit -m "feat: complete e-commerce platform with 3D features"
git push origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure settings:
   - **Framework Preset:** Next.js
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

### Step 3: Environment Variables
Add these in Vercel Dashboard → Project Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_URL=your_backend_url
```

### Step 4: Deploy
Click "Deploy" and wait for build to complete.

---

## 📋 Routes Reference

After deployment, these routes will be available:

### Public Routes
- `/` - Homepage
- `/products` - Product catalog
- `/about` - About Us
- `/contact` - Contact Us
- `/services` - Services
- `/login` - Login page (auth group)
- `/register` - Registration page

### Protected Routes (require login)
- `/account` - User profile
- `/cart` - Shopping cart
- `/checkout` - Checkout flow
- `/orders` - Order history

### Role-Based Routes
- `/supplier/dashboard` - Supplier portal
- `/shipper/dashboard` - Shipper portal

---

## 🔧 Troubleshooting

### Login Page 404
If `/login` shows 404 after deployment:
1. Verify deployment completed successfully
2. Check build logs in Vercel dashboard
3. Clear browser cache and try again
4. Redeploy if needed

### Build Errors
If build fails:
1. Check for TypeScript errors: `npm run build` locally
2. Ensure all dependencies installed: `npm install`
3. Check import paths are correct
4. Verify no syntax errors in files

---

## ✅ Pre-Deployment Checklist

- [ ] All pages created and exporting default component
- [ ] Environment variables configured
- [ ] Supabase Google Auth enabled
- [ ] Build succeeds locally
- [ ] Routes work in local dev
- [ ] Responsive design tested
- [ ] Auth flow tested

---

## 🎯 Features Ready

✅ **Customer Features**
- Browse products, add to cart, checkout
- User profile with edit functionality
- Order tracking

✅ **Supplier Features**
- Dashboard with analytics
- Product upload with 3D generation
- Inventory management

✅ **Shipper Features**
- Delivery management
- Order tracking
- Performance stats

✅ **Technical**
- TypeScript throughout
- Three.js 3D globe and product viewer
- Responsive design
- Protected routes

**Status: Ready for production deployment**

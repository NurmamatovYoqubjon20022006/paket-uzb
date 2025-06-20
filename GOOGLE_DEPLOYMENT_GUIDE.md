# 🚀 PAKET UZB - GOOGLE CLOUD DEPLOYMENT GUIDE

## 📋 QUICK DEPLOYMENT STEPS

### 1️⃣ BACKEND DEPLOYMENT (Vercel)

#### A. Install Vercel CLI
```bash
npm install -g vercel
```

#### B. Deploy Backend
```bash
cd backend
vercel --prod
```

#### C. Configure Environment Variables on Vercel Dashboard
- `MONGODB_URI` - Your MongoDB Atlas connection string
- `JWT_SECRET` - Your JWT secret key
- `TELEGRAM_BOT_TOKEN` - Your Telegram bot token
- `TELEGRAM_CHAT_ID` - Your Telegram chat ID
- `GOOGLE_SHEETS_ID` - Your Google Sheets ID
- `GOOGLE_SERVICE_ACCOUNT_EMAIL` - Google service account email
- `GOOGLE_PRIVATE_KEY` - Google service account private key
- `FRONTEND_URL` - Your frontend URL (for CORS)

### 2️⃣ FRONTEND DEPLOYMENT (Vercel/Netlify)

#### Option A: Vercel
```bash
cd frontend
npm run build
vercel --prod
```

#### Option B: Netlify
```bash
cd frontend
npm run build
# Upload build folder to Netlify
```

#### C. Configure Environment Variables
- `REACT_APP_API_URL` - Your backend URL from step 1

### 3️⃣ DATABASE SETUP (MongoDB Atlas)

#### A. Create MongoDB Atlas Account
1. Go to https://cloud.mongodb.com/
2. Create free cluster
3. Create database user
4. Get connection string
5. Whitelist IP addresses (0.0.0.0/0 for all)

### 4️⃣ TELEGRAM BOT SETUP

#### A. Create Telegram Bot
1. Message @BotFather on Telegram
2. Use `/newbot` command
3. Get bot token
4. Get your chat ID using @userinfobot

### 5️⃣ GOOGLE SHEETS SETUP

#### A. Create Google Service Account
1. Go to Google Cloud Console
2. Create new project
3. Enable Google Sheets API
4. Create service account
5. Download credentials JSON
6. Share your Google Sheet with service account email

---

## 🔧 ENVIRONMENT VARIABLES CHECKLIST

### Backend (.env)
- ✅ `NODE_ENV=production`
- ✅ `PORT=3004`
- ✅ `MONGODB_URI=your-mongodb-connection`
- ✅ `JWT_SECRET=your-jwt-secret`
- ✅ `TELEGRAM_BOT_TOKEN=your-bot-token`
- ✅ `TELEGRAM_CHAT_ID=your-chat-id`
- ✅ `GOOGLE_SHEETS_ID=your-sheets-id`
- ✅ `GOOGLE_SERVICE_ACCOUNT_EMAIL=your-email`
- ✅ `GOOGLE_PRIVATE_KEY=your-private-key`
- ✅ `FRONTEND_URL=https://your-frontend-domain.vercel.app`

### Frontend (.env)
- ✅ `REACT_APP_API_URL=https://your-backend-domain.vercel.app/api`
- ✅ `REACT_APP_APP_NAME=Paket UZB`

---

## 🧪 TESTING DEPLOYMENT

### 1. Backend Test
```bash
curl https://your-backend-domain.vercel.app/api/health
```

### 2. Frontend Test
- Visit your frontend URL
- Test product loading
- Test contact form
- Test order creation

### 3. Integration Test
- Place a test order
- Check Telegram for notification
- Check Google Sheets for new row

---

## 🚨 PRODUCTION CHECKLIST

### Before Going Live:
- [ ] All environment variables set correctly
- [ ] MongoDB connection working
- [ ] Telegram bot responding
- [ ] Google Sheets integration working
- [ ] CORS configured for production domain
- [ ] Rate limiting enabled
- [ ] Security headers configured
- [ ] HTTPS enabled on both frontend and backend
- [ ] Error logging configured
- [ ] Backup system in place

### After Deployment:
- [ ] Test all user flows
- [ ] Monitor error logs
- [ ] Test payment integrations (if enabled)
- [ ] Verify SEO meta tags
- [ ] Test mobile responsiveness
- [ ] Check page load speeds
- [ ] Verify analytics tracking

---

## 📞 SUPPORT

If you encounter any issues during deployment:

1. Check the deployment logs on Vercel/Netlify
2. Verify all environment variables are set
3. Test API endpoints individually
4. Check browser console for errors
5. Verify MongoDB Atlas IP whitelist

---

## 🎯 POST-DEPLOYMENT OPTIMIZATION

### Performance
- Enable Vercel/Netlify CDN
- Compress images
- Enable browser caching
- Monitor Core Web Vitals

### Security
- Set up monitoring alerts
- Regular dependency updates
- Database backup automation
- Access logs monitoring

### Business
- Set up Google Analytics
- Configure email notifications
- Add customer support chat
- Set up inventory management

---

**🎉 Your Paket UZB e-commerce platform is now ready for global deployment on Google Cloud infrastructure!**

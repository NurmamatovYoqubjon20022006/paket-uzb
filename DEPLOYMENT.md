# 🚀 PAKET UZB - DEPLOYMENT GUIDE

## Production Deployment

### 1. Vercel Deployment (Recommended)

#### Backend Deployment
```bash
cd backend
npm install -g vercel
vercel

# Environment variables qo'shish
vercel env add MONGODB_URI
vercel env add JWT_SECRET
vercel env add TELEGRAM_BOT_TOKEN
vercel env add TELEGRAM_CHAT_ID
```

#### Frontend Deployment
```bash
cd frontend
vercel

# Environment variables
vercel env add REACT_APP_API_URL
```

### 2. Manual Deployment

#### Frontend Build
```bash
cd frontend
npm run build

# Build papkasini static hosting'ga yuklang
# (Netlify, Surge, GitHub Pages, etc.)
```

#### Backend Hosting
- **Railway**: Connect GitHub repo
- **Render**: Free tier available
- **DigitalOcean**: App Platform
- **AWS**: Elastic Beanstalk
- **Google Cloud**: App Engine

## Environment Setup

### Production Environment Variables

#### Backend (.env.production)
```env
NODE_ENV=production
PORT=3004
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/paket-uzb-prod
JWT_SECRET=production-very-long-secure-secret-key
FRONTEND_URL=https://your-frontend-domain.com
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
TELEGRAM_CHAT_ID=your-telegram-chat-id
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=50
```

#### Frontend (.env.production)
```env
REACT_APP_API_URL=https://your-backend-domain.com/api
REACT_APP_APP_NAME=Paket UZB
REACT_APP_COMPANY_NAME=Paket UZB LLC
```

### 3. Database Setup

#### MongoDB Atlas Production
1. Atlas'da yangi cluster yarating
2. Database user yarating
3. IP whitelist sozlang (0.0.0.0/0 yoki specific IPs)
4. Connection string'ni oling
5. Environment variable'ga qo'shing

#### Sample Data Loading
```bash
# Production database'ga sample data yuklash
NODE_ENV=production npm run seed
```

## Security Checklist

### ✅ Pre-deployment Security
- [ ] .env fayllar git'ga qo'shilmagan
- [ ] Secure JWT secret (32+ characters)
- [ ] CORS production URL'larga restrict qilingan
- [ ] Rate limiting sozlangan
- [ ] Helmet.js middleware qo'shilgan
- [ ] Input validation qo'shilgan
- [ ] MongoDB connection secure
- [ ] API keys xavfsiz saqlangan

### Production CORS Setup
```javascript
// backend/server.js
const corsOptions = {
  origin: [
    'https://paket-uzb.vercel.app',
    'https://your-custom-domain.com'
  ],
  credentials: true
};
```

## Performance Optimization

### Frontend Optimization
```bash
# Bundle analyzer
npm install --save-dev webpack-bundle-analyzer
npm run build
npx webpack-bundle-analyzer build/static/js/*.js
```

### Backend Optimization
- MongoDB indexlar qo'shing
- Image compression (Sharp)
- Caching headers
- Gzip compression

## Monitoring & Analytics

### Error Tracking
```bash
# Sentry.io integration
npm install @sentry/node @sentry/react
```

### Performance Monitoring
- **Google Analytics** - User tracking
- **Hotjar** - User behavior
- **LogRocket** - Session replay
- **New Relic** - Performance monitoring

## Backup Strategy

### Database Backup
```bash
# MongoDB Atlas automatic backups
# yoki manual:
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/paket-uzb"
```

### Code Backup
- GitHub repository
- Vercel automatic deployments
- Local backup copy

## Domain & SSL

### Custom Domain Setup
```bash
# Vercel'da
vercel domains add your-domain.com
vercel domains verify your-domain.com
```

### SSL Certificate
- Vercel/Netlify - automatic HTTPS
- Let's Encrypt - free SSL
- Cloudflare - proxy + SSL

## CI/CD Pipeline

### GitHub Actions (Optional)
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Run tests
      run: npm test
      
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## Post-Deployment

### Testing Production
1. **Functional Testing**
   - Barcha sahifalar ishlaydi
   - API endpoints javob beradi
   - Forms ishlay di
   - Cart functionality

2. **Performance Testing**
   - Lighthouse audit
   - GTmetrix test
   - PageSpeed Insights

3. **Security Testing**
   - SSL Labs test
   - Security headers check
   - OWASP ZAP scan

### Monitoring Setup
```javascript
// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});
```

## Common Issues & Solutions

### 1. CORS Errors
```javascript
// Backend CORS'ni production URL'ga o'zgartiring
origin: process.env.FRONTEND_URL
```

### 2. Environment Variables
```bash
# Vercel'da environment variables tekshiring
vercel env ls
```

### 3. Database Connection
- MongoDB Atlas IP whitelist
- Connection string to'g'riligi
- Database user permissions

### 4. Build Errors
```bash
# Clear cache
npm run clean
npm install
npm run build
```

## Scaling Considerations

### Database Scaling
- MongoDB Atlas auto-scaling
- Read replicas
- Database indexes

### Application Scaling
- Vercel serverless functions auto-scale
- CDN for static assets
- Image optimization service

### Traffic Management
- Rate limiting
- API versioning
- Load balancing (if needed)

---

## Quick Deployment Commands

```bash
# Complete deployment process
git add .
git commit -m "Production ready"
git push origin main

# Frontend
cd frontend
vercel --prod

# Backend  
cd backend
vercel --prod

# Domain setup
vercel domains add paket-uzb.com
```

**🎉 Congratulations! Your Paket UZB application is now live!**

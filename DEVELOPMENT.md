# 🛠️ PAKET UZB - DEVELOPMENT GUIDE

## Loyihani Ishga Tushirish

### 1. TEZKOR ISHGA TUSHIRISH

#### Windows uchun:
```batch
# Faqat start.bat faylini ishga tushiring
start.bat
```

#### yoki qo'lda:
```bash
# Root directoryda
npm install
npm start
```

### 2. QADAMLAR

#### Birinchi marta o'rnatish:
1. Repository'ni clone qiling
2. `npm install` (root directory'da)
3. Backend va frontend .env fayllarini sozlang
4. `npm start` yoki `start.bat`

## 🔧 Development Workflow

### Backend Development
```bash
cd backend
npm run dev      # Nodemon bilan hot reload
```

### Frontend Development  
```bash
cd frontend
npm start        # React development server
```

### Ikkalasini bir vaqtda ishga tushirish
```bash
# Root directory'da
npm run dev      # Concurrently ishlatadi
```

## 📝 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=3004
MONGODB_URI=your-mongodb-connection
JWT_SECRET=your-secret-key
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHAT_ID=your-chat-id
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:3004/api
REACT_APP_APP_NAME=Paket UZB
```

## 🚀 Available Scripts

### Root Directory
- `npm start` - Ikkalasini ham ishga tushiradi
- `npm run dev` - Development mode (concurrently)
- `npm run build` - Frontend'ni build qiladi
- `npm run test` - Testlarni ishga tushiradi
- `npm run install:all` - Barcha dependencies o'rnatadi

### Backend Scripts
- `npm start` - Production server
- `npm run dev` - Development server (nodemon)
- `npm test` - Backend testlar
- `npm run seed` - Sample data yuklash

### Frontend Scripts
- `npm start` - Development server
- `npm run build` - Production build
- `npm test` - Frontend testlar
- `npm run eject` - CRA eject (ehtiyotkorlik bilan!)

## 🌐 Ports

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3004
- **API Docs**: http://localhost:3004/api-docs

## 🔍 Debugging

### Backend Debugging
1. VS Code'da F5 bosing
2. yoki `node --inspect server.js`
3. Chrome DevTools'da debugging

### Frontend Debugging
1. Browser DevTools ishlatiladi
2. React DevTools extension o'rnating
3. Redux DevTools (agar kerak bo'lsa)

### API Testing
```bash
# Products API
curl http://localhost:3004/api/products

# Health check
curl http://localhost:3004/api/health
```

## 📦 Dependencies

### Backend
- Express.js - Web framework
- MongoDB/Mongoose - Database
- JWT - Authentication
- Helmet - Security
- CORS - Cross-origin requests
- Nodemon - Development tool

### Frontend
- React 18 - UI library
- React Router - Routing
- Tailwind CSS - Styling
- Axios - HTTP client
- Framer Motion - Animations

## 🐛 Common Issues

### Port Conflicts
```bash
# Port 3000 band bo'lsa
npx kill-port 3000
# yoki
lsof -ti:3000 | xargs kill -9
```

### MongoDB Connection
- Atlas connection string to'g'ri ekanligini tekshiring
- IP whitelist'da sizning IP'ngiz borligini tekshiring
- Username/password to'g'ri ekanligini tekshiring

### CORS Issues
- Backend .env da FRONTEND_URL to'g'ri sozlangan
- Cors options'da origin to'g'ri ko'rsatilgan

### Build Issues
```bash
# Cache tozalash
npm run clean
npm install

# Node modules qayta o'rnatish
rm -rf node_modules package-lock.json
npm install
```

## 📊 Monitoring

### Development Tools
- **Backend**: Morgan logging
- **Frontend**: React DevTools
- **API**: Postman/Insomnia collection

### Performance
- **Bundle Analyzer**: `npm run analyze`
- **Lighthouse**: Chrome DevTools
- **React Profiler**: React DevTools

## 🔐 Security

### Development
- .env fayllarni git'ga qo'shmang
- API keys'ni secure saqlang
- HTTPS'da test qiling

### Production
- Environment variables serverda sozlang
- Database connection secure bo'lsin
- CORS production URL'larga restrict qiling

## 📈 Testing

### Unit Tests
```bash
# Backend
cd backend && npm test

# Frontend  
cd frontend && npm test
```

### Integration Tests
```bash
# API tests
npm run test:api

# E2E tests
npm run test:e2e
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Frontend
cd frontend && vercel

# Backend
cd backend && vercel
```

### Manual Deployment
```bash
# Build frontend
cd frontend && npm run build

# Deploy to static hosting (Netlify, Surge, etc.)
```

---

**Eslatma**: Development paytida har doim `.env` fayllaringizni tekshiring va portlar bo'sh ekanligiga ishonch hosil qiling.

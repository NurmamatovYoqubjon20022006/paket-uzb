# 📦 Paket UZB - E-commerce Platform

O'zbekiston uchun zamonaviy paket va qadoqlash materiallari savdo platformasi. Bu loyiha React.js frontend va Node.js/Express backend asosida qurilgan.

## 🌟 Xususiyatlar

- **Modern UI/UX**: Tailwind CSS bilan qurilgan zamonaviy interfeys
- **Responsive Design**: Barcha qurilmalarda mukammal ishlaydi (mobil, planshet, desktop)
- **Real-time Notifications**: Telegram bot orqali yangi buyurtmalar haqida xabar
- **Google Sheets Integration**: Ma'lumotlarni Google Sheets bilan sinxronizatsiya
- **Secure API**: Express.js asosida himoyalangan API
- **Shopping Cart**: To'liq ishlaydigan savatcha funksiyasi
- **Order Management**: Buyurtmalarni boshqarish tizimi
- **Payment Integration**: Click.uz va Payme to'lov tizimlari
- **SEO Optimized**: Qidiruv tizimlari uchun optimallashtirilgan

## 🚀 Texnologiyalar

### Frontend
- **React 18** - Modern JavaScript kutubxonasi
- **React Router 6** - Sahifalar orasida navigatsiya
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animatsiyalar uchun
- **Axios** - HTTP so'rovlar uchun
- **React Toastify** - Xabarlar ko'rsatish

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL ma'lumotlar bazasi
- **Mongoose** - MongoDB ODM
- **JWT** - Autentifikatsiya
- **Telegram Bot API** - Bildirishnomalar
- **Google Sheets API** - Ma'lumotlar sinxronizatsiyasi
- **Multer** - Fayl yuklash
- **Sharp** - Rasm optimizatsiyasi

## 📋 Talablar

- **Node.js** v16 yoki yuqori
- **MongoDB** ma'lumotlar bazasi
- **Git** versiya nazorati

## 🛠️ O'rnatish va Ishga Tushirish

### 1. Loyihani Klonlash
```bash
git clone https://github.com/NurmamatovYoqubjon20022006/paket-uzb.git
cd paket-uzb
```

### 2. Backend Sozlash

#### Dependencies o'rnatish:
```bash
cd backend
npm install
```

#### Environment Variables sozlash:
`backend/.env` faylini tahrirlang:
```env
NODE_ENV=development
PORT=3004
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret-key
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
TELEGRAM_CHAT_ID=your-telegram-chat-id
```

#### Backendni ishga tushirish:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### 3. Frontend Sozlash

#### Dependencies o'rnatish:
```bash
cd frontend
npm install
```

#### Environment Variables sozlash:
`frontend/.env` faylini tahrirlang:
```env
REACT_APP_API_URL=http://localhost:3004/api
REACT_APP_APP_NAME=Paket UZB
```

#### Frontendni ishga tushirish:
```bash
npm start
```

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/NurmamatovYoqubjon20022006/paket-uzb.git
cd paket-uzb

# Install dependencies
npm install

# Start development servers
npm run dev
```

## 🌐 URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3004/api
- **GitHub**: https://github.com/NurmamatovYoqubjon20022006/paket-uzb

## � Documentation

- [Contributing Guide](CONTRIBUTING.md) - How to contribute to the project
- [Security Policy](SECURITY.md) - Security guidelines and reporting
- [Changelog](CHANGELOG.md) - Version history and changes
- [License](LICENSE) - MIT License details

## �️ Development

### Environment Setup
Copy example environment files and configure:
```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

### Available Scripts
- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build frontend for production
- `npm test` - Run all tests
- `npm run clean` - Clean node_modules

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## � License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- Create an [Issue](https://github.com/NurmamatovYoqubjon20022006/paket-uzb/issues)
- Email: info@paket-uzb.com

---

Made with ❤️ by the Paket UZB Team

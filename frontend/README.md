# 🛍️ Paket UZB - Professional Online Shop

> Do'konlar, aptekalar va bizneslar uchun yuqori sifatli selofan va rulon paketlar online do'koni

## 🚀 Xususiyatlar

### Frontend
- ⚡ **React 18** - Zamonaviy UI kutubxonasi
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🌊 **Framer Motion** - Silliq animatsiyalar
- 📱 **Responsive Design** - Barcha qurilmalarda mukammal
- 🛒 **Shopping Cart** - Mahsulotlar savati
- 💳 **Payment Integration** - Payme, Click to'lov tizimlari
- 🔍 **Product Search** - Qidiruv va filtrlash
- 📊 **Real-time Updates** - Jonli yangilanishlar

### Backend
- 🔥 **Node.js + Express** - Tez va ishonchli server
- 🗄️ **MongoDB + Mongoose** - NoSQL ma'lumotlar bazasi
- 🤖 **Telegram Bot** - Buyurtmalar haqida xabarlar
- 📊 **Google Sheets** - Buyurtmalarni avtomatik saqlash
- 💰 **Payment APIs** - Payme va Click integratsiyasi
- 🔐 **Security** - Xavfsizlik va himoya
- 📧 **Email Notifications** - Email xabarlari
- 🚚 **Order Management** - Buyurtmalarni boshqarish

## 📁 Loyiha Tuzilmasi

```
paket-uzb/
├── backend/                     # Backend server
│   ├── models/                  # Ma'lumotlar modellari
│   │   ├── Order.js            # Buyurtma modeli
│   │   ├── Product.js          # Mahsulot modeli
│   │   └── Contact.js          # Aloqa modeli
│   ├── routes/                  # API yo'nalishlari
│   ├── utils/                   # Yordamchi funksiyalar
│   │   ├── telegramBot.js      # Telegram bot
│   │   └── googleSheets.js     # Google Sheets
│   ├── server.js               # Asosiy server fayli
│   ├── package.json            # Dependencies
│   └── .env.example            # Environment variables namunasi
├── frontend/                    # Frontend ilovasi
│   ├── public/                  # Statik fayllar
│   ├── src/                     # React kodlari
│   │   ├── components/          # React komponentlari
│   │   │   ├── Layout/         # Layout komponentlari
│   │   │   ├── Product/        # Mahsulot komponentlari
│   │   │   ├── Cart/           # Savat komponentlari
│   │   │   └── UI/             # UI komponentlari
│   │   ├── pages/              # Sahifalar
│   │   ├── services/           # API servislar
│   │   └── App.jsx             # Asosiy App komponenti
│   ├── package.json            # Dependencies
│   └── .env.example            # Environment variables namunasi
└── README.md                    # Bu fayl
```

## 🔧 O'rnatish

### 1. Repository ni klonlash

```bash
git clone https://github.com/paketuzb/paket-uzb.git
cd paket-uzb
```

### 2. Backend o'rnatish

```bash
cd backend

# Dependencies o'rnatish
npm install

# Environment variables sozlash
cp .env.example .env
# .env faylini tahrirlash va o'z qiymatlaringizni kiriting

# MongoDB ishga tushirish (local)
# Windows uchun:
net start MongoDB
# MacOS/Linux uchun:
sudo systemctl start mongod

# Serverni ishga tushirish
npm run dev
```

### 3. Frontend o'rnatish

```bash
cd ../frontend

# Dependencies o'rnatish
npm install

# Environment variables sozlash
cp .env.example .env
# .env faylini tahrirlash

# Ilovani ishga tushirish
npm start
```

## 🔐 Environment Variables Sozlash

### Backend (.env)

```bash
# Asosiy sozlamalar
NODE_ENV=development
PORT=3004
MONGODB_URI=mongodb://localhost:27017/paket-uzb

# Telegram Bot (majburiy)
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here

# Google Sheets (majburiy)
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_ID=your_google_sheets_id

# To'lov tizimlari (ixtiyoriy)
PAYME_MERCHANT_ID=your_payme_merchant_id
CLICK_SERVICE_ID=your_click_service_id
```

### Frontend (.env)

```bash
REACT_APP_API_URL=http://localhost:3004/api
REACT_APP_APP_NAME=Paket UZB
REACT_APP_PHONE=+998901234567
REACT_APP_EMAIL=info@paketuzb.uz
```

## 🤖 Telegram Bot Sozlash

### 1. Bot yaratish

1. Telegram'da @BotFather ga murojaat qiling
2. `/newbot` komandasi yuboring
3. Bot nomini kiriting (masalan: Paket UZB Bot)
4. Username kiriting (masalan: @paket_uzb_bot)
5. Token olasiz

### 2. Chat ID olish

1. Bot bilan chat boshlang
2. Biror xabar yuboring
3. Ushbu URL'ga kiring: `https://api.telegram.org/bot{BOT_TOKEN}/getUpdates`
4. `chat.id` ni topib oling

## 📊 Google Sheets Sozlash

### 1. Google Cloud Console

1. [Google Cloud Console](https://console.cloud.google.com) ga kiring
2. Yangi loyiha yarating
3. Google Sheets API ni yoqing

### 2. Service Account yaratish

1. "Credentials" bo'limiga kiring
2. "Create Credentials" > "Service Account"
3. Service account yarating
4. JSON kalit faylini yuklab oling

### 3. Google Sheets

1. Yangi Google Sheets yarating
2. Service account email'ini ulashing (Editor huquqi bilan)
3. Sheets ID'sini oling (URL'dan)

## 🎯 Ishlash Tartibi

### Backend

1. **Server ishga tushirish:**
   ```bash
   cd backend
   npm run dev
   ```

2. **API testlash:**
   ```bash
   curl http://localhost:3004/api/health
   ```

### Frontend

1. **Ilovani ishga tushirish:**
   ```bash
   cd frontend
   npm start
   ```

2. **Browser'da ochish:**
   ```
   http://localhost:3000
   ```

## 📱 Xususiyatlar

### Mijozlar uchun

- 🛍️ **Mahsulotlar katalogi** - Kategoriyalar bo'yicha mahsulotlar
- 🔍 **Qidiruv va filtrlash** - Narx, kategoriya bo'yicha
- 🛒 **Savatcha** - Mahsulotlarni qo'shish/o'chirish
- 💳 **Online to'lov** - Payme, Click orqali to'lov
- 📱 **Responsive dizayn** - Mobil va desktop
- 📞 **Aloqa formi** - Savollar uchun

### Admin uchun

- 📊 **Telegram orqali xabarlar** - Yangi buyurtmalar haqida
- 📈 **Google Sheets** - Buyurtmalar jadvali
- 📧 **Email xabarlari** - Mijozlarga xabarlar
- 📦 **Buyurtma boshqaruvi** - Status yangilash

## 🔧 Xatoliklarni Hal Qilish

### Backend xatoliklari

```bash
# MongoDB aloqa xatosi
Error: connect ECONNREFUSED 127.0.0.1:27017
# Yechim: MongoDB xizmatini ishga tushiring

# Port band xatosi
Error: listen EADDRINUSE :::3004
# Yechim: Portni o'zgartiring yoki jarayonni to'xtating

# Environment variable xatosi
Error: TELEGRAM_BOT_TOKEN is not defined
# Yechim: .env faylida TELEGRAM_BOT_TOKEN ni sozlang
```

### Frontend xatoliklari

```bash
# API aloqa xatosi
Network Error
# Yechim: Backend ishlaganini tekshiring

# Build xatosi
Module not found
# Yechim: npm install ishga tushiring
```

## 🚀 Production'ga Deploy Qilish

### Backend (VPS/Cloud)

```bash
# Dependencies o'rnatish
npm install --production

# PM2 bilan ishga tushirish
npm install -g pm2
pm2 start server.js --name "paket-uzb-backend"

# Nginx sozlash
# /etc/nginx/sites-available/paket-uzb
server {
    listen 80;
    server_name api.paketuzb.uz;
    
    location / {
        proxy_pass http://localhost:3004;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Frontend (Netlify/Vercel)

```bash
# Build qilish
npm run build

# Build papkasini deploy qilish
# Netlify: build papkasini upload qiling
# Vercel: vercel --prod
```

## 📞 Qo'llab-quvvatlash

- 📧 **Email:** info@paketuzb.uz
- 📱 **Telefon:** +998 90 123 45 67
- 💬 **Telegram:** @paketuzb_support

## 📝 Litsenziya

MIT License - batafsil ma'lumot uchun LICENSE faylini ko'ring.

## 🤝 Hissa Qo'shish

1. Repository'ni fork qiling
2. Feature branch yarating (`git checkout -b feature/AmazingFeature`)
3. O'zgarishlaringizni commit qiling (`git commit -m 'Add some AmazingFeature'`)
4. Branch'ni push qiling (`git push origin feature/AmazingFeature`)
5. Pull Request yarating

## 📚 Dokumentatsiya

Batafsil API dokumentatsiya uchun `/docs` endpointiga murojaat qiling:
```
http://localhost:3004/docs
```

## 🔄 Yangilanishlar

Loyiha yangilanishlari uchun CHANGELOG.md faylini kuzatib turing.

---

**Paket UZB** - O'zbekistondagi eng yaxshi paket yetkazib berish xizmati! 🇺🇿
#!/bin/bash

echo "🚀 Paket UZB - Professional E-commerce Platform"
echo "=============================================="

# Backend ishga tushirish
echo "📦 Starting Backend Server..."
cd "c:/Users/Yoqubjon/Desktop/paket-uzb/backend"
npm start &
BACKEND_PID=$!
echo "✅ Backend started (PID: $BACKEND_PID)"

# Frontend ishga tushirish
echo "💻 Starting Frontend Server..."
cd "c:/Users/Yoqubjon/Desktop/paket-uzb/frontend"
npm start &
FRONTEND_PID=$!
echo "✅ Frontend started (PID: $FRONTEND_PID)"

echo ""
echo "🌐 Servers are running:"
echo "   Backend:  http://localhost:3004"
echo "   Frontend: http://localhost:3000"
echo ""
echo "📊 Features:"
echo "   ✅ Multi-language support (UZ/RU/EN)"
echo "   ✅ Real-time order notifications"
echo "   ✅ Telegram bot integration"
echo "   ✅ Google Sheets integration"
echo "   ✅ Full e-commerce functionality"
echo ""
echo "🛑 To stop servers: Ctrl+C"

# Serverlarni kutish
wait

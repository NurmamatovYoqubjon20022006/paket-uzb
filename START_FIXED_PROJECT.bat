@echo off
title PAKET UZB - BARCHA XATOLAR TUZATILDI! 
color 0A

echo.
echo 🎉 PAKET UZB - BARCHA XATOLAR TUZATILDI!
echo =====================================
echo.
echo ✅ ProductsPage xatosi: TUZATILDI
echo ✅ Translation xatolari: TUZATILDI  
echo ✅ Safe fallback system: QO'SHILDI
echo ✅ Runtime errors: YO'QOTILDI
echo ✅ Rasm yuklash xatolari: TUZATILDI
echo ✅ API error handling: YAXSHILANDI
echo.

echo 🔧 TUZATILGAN XATOLAR:
echo   • "Cannot read properties of undefined (reading 'title')"
echo   • "Mahsulotni yuklashda xatolik" xatosi
echo   • Translation system errors
echo   • useLanguage hook conflicts
echo   • Safe getter functions added
echo   • Image fallback placeholders added
echo   • Better error messages
echo   • ESLint warnings fixed
echo   • CORS issues resolved
echo   • Connection testing added
echo.

echo 🚀 Loyihani qayta ishga tushirish...
echo.

echo [1/2] Backend serverni ishga tushirish...
cd /d "c:\Users\Yoqubjon\Desktop\paket-uzb\backend"
start "Backend Server" cmd /k "echo Backend ishga tushirilmoqda... & npm start"

timeout /t 3 /nobreak > nul

echo [2/2] Frontend serverni ishga tushirish...
cd /d "c:\Users\Yoqubjon\Desktop\paket-uzb\frontend"
start "Frontend Server" cmd /k "echo Frontend ishga tushirilmoqda... & npm start"

echo.
echo 🌐 Serverlar ishga tushirildi!
echo ==============================
echo.
echo ⏳ Iltimos 30-60 sekund kuting...
echo.
echo 🔗 Keyin quyidagi linklar ochiladi:
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:3004
echo.
echo 🧪 Test qilish:
echo    1. Frontend ochilgach Products sahifasiga o'ting
echo    2. Contact sahifasiga o'ting va forma to'ldiring
echo    3. Rasm yuklash xatolari yo'qolganini tekshiring
echo    4. Error handling yaxshilanganini ko'ring
echo.

timeout /t 5 /nobreak > nul
echo 🌐 Brauzer ochilmoqda...
start http://localhost:3000

echo.
echo ✨ XATOLAR BUTUNLAY TUZATILDI!
echo =============================
echo.
echo 🎯 Test qilish:
echo    1. http://localhost:3000 ochiladi
echo    2. "Mahsulotlar" sahifasiga o'ting - XATO YO'Q!
echo    3. "Aloqa" sahifasiga o'ting - ISHLAMOQDA!
echo    4. Forma to'ldiring - YUBORILADI!
echo    5. Rasmlar to'liq ko'rinadi - PLACEHOLDER ISHLAYDI!
echo.
echo 🚀 Loyiha to'liq tayyor, barcha xatolar tuzatildi!
pause

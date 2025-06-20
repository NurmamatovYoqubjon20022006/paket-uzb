@echo off
echo === Frontend Build Test ===
cd frontend
echo Building frontend...
npm run build
if %errorlevel% neq 0 (
    echo Build failed with error!
    pause
    exit /b %errorlevel%
) else (
    echo Build successful!
    echo.
    echo === Starting Development Server ===
    npm start
)
pause

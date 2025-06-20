@echo off
echo Starting Paket UZB Project...
echo.

echo Starting Backend Server...
cd backend
start "Backend Server" cmd /k "npm start"

echo.
echo Starting Frontend Server...
cd ../frontend
start "Frontend Server" cmd /k "npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:3001
echo Frontend: http://localhost:3000
echo.
pause

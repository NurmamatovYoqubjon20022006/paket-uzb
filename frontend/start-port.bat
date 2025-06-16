@echo off
for /f "tokens=5" %%p in ('netstat -aon ^| findstr :3000') do taskkill /F /PID %%p >nul 2>&1
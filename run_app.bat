@echo off
title Launching RequireX-AI...
echo =========================================
echo   Starting RequireX-AI Web Application
echo =========================================
echo.
echo Opening browser...
start http://localhost:5173
echo.
echo Starting Vite Dev Server...
npm run dev
pause

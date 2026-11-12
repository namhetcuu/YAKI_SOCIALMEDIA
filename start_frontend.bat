@echo off
title YAKI Social - Frontend Server (Port 5173)
echo ===================================================
echo   YAKI Social Media - Vite React Frontend Server
echo ===================================================
echo Starting dev server on http://localhost:5173 ...
cd /d "%~dp0yaki_social_media(frontend)"
npm run dev
pause


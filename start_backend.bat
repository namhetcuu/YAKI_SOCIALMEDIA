@echo off
title YAKI Social - Backend Server (Port 8080)
echo ===================================================
echo   YAKI Social Media - Spring Boot Backend Server
echo ===================================================
echo Starting server on http://localhost:8080/yaki ...
cd /d "%~dp0yaki_social_media(backend)"
java -jar target\zosh_social_youtube-0.0.1-SNAPSHOT.jar
pause


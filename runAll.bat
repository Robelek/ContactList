@echo off
setlocal

start "" /D ".\ContactListAPI\bin\Release\net7.0" ContactListAPI.exe

start "" cmd /k "cd /d .\ContactListFrontend\contact-list-frontend\ && npm start"

endlocal

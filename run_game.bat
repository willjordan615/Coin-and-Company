@echo off
REM Run the game locally (Windows). The Node server builds bundle.js, serves fresh files, and opens the browser.
SETLOCAL EnableDelayedExpansion
REM Change to this script's folder so paths with spaces work.
cd /d "%~dp0"
IF %ERRORLEVEL% NEQ 0 (
  echo Warning: failed to change to project directory. Continuing in current directory.
)

REM Node is required so the server can build the browser bundle before serving.
where node >nul 2>&1
IF %ERRORLEVEL%==0 (
  FOR /F %%P IN ('powershell -NoProfile -Command "$p=8000; while($true){$l=[Net.Sockets.TcpListener]::new([Net.IPAddress]::Loopback,$p); try{$l.Start(); $l.Stop(); $p; break}catch{$p++}}"') DO SET GAME_PORT=%%P
  echo Starting local Node server on port !GAME_PORT!. It will build bundle.js before serving.
  start "Game Server" cmd /k "node scripts\serve-game.js !GAME_PORT!"
  powershell -NoProfile -Command "$u='http://localhost:!GAME_PORT!/__build-info'; for($i=0;$i -lt 60;$i++){try{Invoke-WebRequest -UseBasicParsing $u | Out-Null; exit 0}catch{Start-Sleep -Milliseconds 250}}; exit 1"
  IF !ERRORLEVEL! NEQ 0 (
    echo Server did not become ready. Check the Game Server window for build errors.
    exit /b 1
  )
  start "" "http://localhost:!GAME_PORT!"
  exit /b 0
) ELSE (
  echo Node not found. Please install Node.js so the game can build and serve the browser bundle.
)

exit /b 1

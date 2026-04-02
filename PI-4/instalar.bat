@echo off
echo ========================================
echo   Instalando Dependencias do Projeto
echo ========================================
echo.

echo [1/2] Instalando dependencias...
call npm install

echo.
echo [2/2] Verificando instalacao...
if errorlevel 1 (
    echo.
    echo [ERRO] Falha na instalacao das dependencias!
    echo Tente executar manualmente: npm install
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Instalacao Concluida com Sucesso!
echo ========================================
echo.
echo Para iniciar o projeto, execute:
echo   npm start
echo.
echo ou use o arquivo: iniciar.bat
echo.
pause

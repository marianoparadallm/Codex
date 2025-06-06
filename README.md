# Codex

Este repositorio incluye scripts en Python para obtener las cotizaciones del Dólar Blue desde [dolarhoy.com](https://dolarhoy.com) y generar una página web que muestre el valor de forma vistosa.

## Uso

1. Instala las dependencias necesarias:
   ```bash
   pip install requests beautifulsoup4
   ```
2. Para imprimir los valores en consola ejecuta:
   ```bash
   python3 fetch_dolar.py
   ```
3. Para generar `index.html` con un video de fondo y el precio en pantalla completa ejecuta:
   ```bash
   python3 build_site.py
   ```
   Luego abre `index.html` en tu navegador.

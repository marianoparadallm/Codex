import requests
from bs4 import BeautifulSoup
import re

URL = "https://dolarhoy.com/cotizacion-dolar-blue"
HEADERS = {"User-Agent": "Mozilla/5.0"}

resp = requests.get(URL, headers=HEADERS)
resp.raise_for_status()

soup = BeautifulSoup(resp.text, 'html.parser')
text = soup.get_text(" ", strip=True)
prices = re.findall(r"\$\d+[.,]?\d*", text)
if len(prices) >= 2:
    buy = prices[0]
    sell = prices[1]
    value = f"Compra: {buy} | Venta: {sell}"
else:
    value = "Valor no encontrado"

html = f"""
<!DOCTYPE html>
<html lang='es'>
<head>
<meta charset='UTF-8'>
<title>Dólar Blue</title>
<style>
body,html {{ margin:0; padding:0; height:100%; overflow:hidden; }}
#bgvideo {{ position:fixed; top:0; left:0; min-width:100%; min-height:100%; z-index:-1; object-fit:cover; }}
#price {{ position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); color:#fff; font-size:6vw; font-family:Arial,sans-serif; text-shadow:0 0 10px #000; }}
</style>
</head>
<body>
<video id='bgvideo' autoplay muted loop>
<source src='https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.mp4' type='video/mp4'>
</video>
<div id='price'>{value}</div>
</body>
</html>
"""

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
print("index.html generado")

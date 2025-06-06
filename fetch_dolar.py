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
    print("Compra:", prices[0])
    print("Venta:", prices[1])
else:
    print("No se encontraron precios en la página")

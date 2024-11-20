import requests
from xml.dom.minidom import parseString
import time
import datetime

# URL of Open Data
STOP = 'ran'
url = f'http://luasforecasts.rpa.ie/xml/get.ashx?action=forecast&stop={STOP}&encrypt=false'

# poll_interval = 10

# while True:
#     # Fetch the geoJSON data from the URL
#     response = requests.get(url)

#     # Check if the request was successful
#     if response.status_code == 200:
#         for item in response.json():
#             print(item['name'], ' ', item['available_bikes'], (int(item['last_update'])))

#     else:
#         print("Failed to retrieve data:", response.status_code)

#     time.sleep(poll_interval)

#while True:
# fetch the real-time Luas data from the URL
response = requests.get(url)

# check if the request was succesful
if response.status_code == 200:
    doc = parseString(response.content)
    # TODO: complete xml code
    print(doc.getElementsByTagName('')[0].firstChild.nodeValue)
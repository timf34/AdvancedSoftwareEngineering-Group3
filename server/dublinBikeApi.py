import requests
import json
import time

# URL of Open Data
APIKEY = '5912905b276c7c55a996aca98771769ee9c8d42b'
url = 'https://api.jcdecaux.com/vls/v1/stations?contract=dublin&apiKey=' + APIKEY

poll_interval = 10

while True:
    # Fetch the geoJSON data from the URL
    response = requests.get(url)

    # Check if the request was successful
    if response.status_code == 200:
        for item in response.json():
            print(item['name'], ' ', item['available_bikes'], item['last_update'])

    else:
        print("Failed to retrieve data:", response.status_code)

    time.sleep(poll_interval)

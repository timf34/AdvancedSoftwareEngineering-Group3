import requests
import time
import xml.etree.ElementTree as ET

long = '-6.266155'
lat = '53.350140'
url = 'http://openaccess.pf.api.met.ie/metno-wdb2ts/locationforecast?lat='+ lat + ';long='+ long



poll_interval = 10

while True:
    # Fetch the geoJSON data from the URL
    response = requests.get(url)
    # Parse the XML data
    if response.status_code == 200:
        root = ET.fromstring(response.content)

    # Now you can navigate through the XML elements
        for child in root:
            print("Tag:", child.tag)
            print("Attributes:", child.attrib)
            print("Text:", child.text)
    else:
        print("Failed to retrieve data:", response.status_code)

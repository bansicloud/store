import requests

# url = 'http://localhost:4000/file' #Local EndPoint
url = 'https://morejust.herokuapp.com/file'

# To load file from current folder
files = {'file': open('image.png', 'rb')}

# To load file amywhere from computer
# files = {'file': open('/Users/viktorkirillov/Documents/GitHub/store/image.png', 'rb')}

r = requests.post(url, files=files)
print(r.text)
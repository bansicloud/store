import requests

# url = 'http://localhost:4000/file'
url = 'https://morejust.herokuapp.com/file'

files = {'file': open('image.png', 'rb')}

r = requests.post(url, files=files)
print(r.text)
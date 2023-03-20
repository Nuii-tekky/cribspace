from django.contrib.auth import get_user_model

# import requests

# url = "http://127.0.0.1:8000/home/testing"

# response = requests.request("GET", url)

# data= response.json()

# print(data["detail"])


user = get_user_model()
print(user)
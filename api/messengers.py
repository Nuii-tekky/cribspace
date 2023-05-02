import requests
import json
from rest_framework.response import Response


def createdefaultprofile(id):
  pk= id
  if pk:
    endpoint= "http://127.0.0.1:8000/api/addprofile"
    form= json.dumps({"user":pk,"id_user":pk})
    headers = {
      'Content-Type': 'application/json',
      'Accept':"application/json"
    }
    response = requests.request("POST", endpoint, headers=headers, data=form)
    details= response.json()
    if details['details']== "profile saved":
      return Response({"details":"profile created"})
    else:
      return Response({"details":"profile not created"})  
  else:
    return Response({"details":"user id not provided"})


def is_requestkeys_valid(data):
  mutatedata= data
  allowed_keys= ["bio","telephone","location","profileimage","occupation","username","email"]
  is_among= []
  is_passed= False
  if type(mutatedata)== dict:
    requestskeys= list(mutatedata.keys())
    for key in requestskeys:
      is_among.append(allowed_keys.__contains__(key))
    for value in is_among:
      if value== True:
        is_passed=True
      else:
        is_passed=False
  else:
    is_passed=False   
  return_object= {"details":is_passed}
  return return_object   


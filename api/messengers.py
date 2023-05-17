from itertools import chain
import random
import aiohttp
import json
import requests
from rest_framework.response import Response


def createdefaultprofile(id):
  pk= id
  if pk:
    endpoint= "http://127.0.0.1:8000/api/addprofile"
    form= json.dumps({"user":pk,"id_user":pk})
    # async with aiohttp.ClientSession() as session:
    #   async with session.post(endpoint,form) as response:
    #     details=response.json()
    headers={
      "Content-Type":"application/json"
    }
    response= requests.post(endpoint,data=form,headers=headers)
    details= response.json()
    print(details)
    if details['details']== "profile saved":
      return Response({"details":"profile created"})
    else:
      return Response({"details":"profile not created"})  
  else:
    return Response({"details":"user id not provided"})


def is_requestkeys_valid(data,model= None):
  mutatedata= data
  allowed_keys_profile_model= ["bio","telephone","location","profileimage","occupation",'csrfmiddlewaretoken']
  allowed_keys_user_model= ["username","email","firstname","lastname"]
  is_among= []
  is_passed= False

  array_use_case= allowed_keys_profile_model
  if model == "usermodel":
    array_use_case=allowed_keys_user_model  
  
  if type(mutatedata)== dict:
    requestskeys= list(mutatedata.keys())
    for key in requestskeys:
      is_among.append(array_use_case.__contains__(key))
    for value in is_among:
      if value== True:
        is_passed=True
      else:
        is_passed=False
  else:
    is_passed=False   
  return_object= {"details":is_passed}
  return return_object   


def imagerequestkey(reqdata):
  data= reqdata
  listitems= list(data)
  reqdatakey= listitems[0]
  returnformat= {reqdatakey:True}
  return returnformat
  

def usernameobject(reqdata):
  mutatedata= reqdata
  init_obj={}
  for key in list(mutatedata.keys()):
    if key == "username":
      init_obj={key:mutatedata[key]}
  return init_obj     

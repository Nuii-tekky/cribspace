from itertools import chain
import random

from rest_framework.response import Response
from posts.models import Post

"""
these are my messengers,they are here cos they are second class functions,not worthy to be among the view functions,they are kind of the backend of my backend

"""
            

def is_requestkeys_valid(data,model= None)->dict:
  mutatedata= data
  allowed_keys_profile_model= ["bio","telephone","location","profileimage","occupation",'csrfmiddlewaretoken']
  allowed_keys_user_model= ["username","email","firstname","lastname"]
  allowed_keys_post_model=["id","no_of_comments","no_of_likes"]
  is_among= []
  is_passed= False

  array_use_case= allowed_keys_profile_model
  if model == "usermodel":
    array_use_case=allowed_keys_user_model  
  
  if model == "postmodel":
    array_use_case=allowed_keys_post_model

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


def imagerequestkey(reqdata)->dict:
  data= reqdata
  listitems= list(data)
  reqdatakey= listitems[0]
  returnformat= {reqdatakey:True}
  return returnformat
  

def usernameobject(reqdata)->dict:
  mutatedata= reqdata
  init_obj={}
  for key in list(mutatedata.keys()):
    if key == "username":
      init_obj={key:mutatedata[key]}
  return init_obj     


def postlike_count(id)->dict:
  returndata={}
  postobj= Post.objects.get(id=id)
  returndata={"no_of_likes":postobj.no_of_likes}
  return returndata


def commentcount(id,)->dict:
  returndata={}
  postobj= Post.objects.get(id=id)
  returndata={"no_of_comments":postobj.no_of_comments}
  return returndata
from fuzzywuzzy import process
import itertools
import random

from posts.models import Post

"""
these are my messengers,they are here cos they are second class functions,not worthy to be among the view functions,they are kind of the backend of my backend

"""

def closematches(_string,data):
  close_matches= process.extract(_string,data)
  matches_list=[]
  for _match,score in close_matches:
    if score >= 46:
      matches_list.append(_match)
  return matches_list

def combineposts(inp1,inp2,inp3)-> dict:
  returndata={}
  combineposts= list(itertools.chain(*inp1,*inp2,*inp3))
  posts_length= len(combineposts)
  returndata={"posts":combineposts,"length":posts_length}
  return returndata

def is_requestkeys_valid(data,model= None)->dict:
  mutatedata= data
  allowed_keys_profile_model= ["bio","telephone","location","profileimage","occupation",'csrfmiddlewaretoken',"occupation_category"]
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


def filterobjectfields(data,related_name=None)-> object:
  returndata={}
  returnlist=[]
  allowedkeysfollowers=["follower","created_at"]
  allowedkeysfollowing=["user_followed","created_at"]

  allowedarray_use_case=[]
  if related_name == "followers":
    allowedarray_use_case=allowedkeysfollowers
  else:
    allowedarray_use_case=allowedkeysfollowing  
  if len(data) > 1:
    for item in data:
      updated_obj={}
      for key,value in item.items():
        if key in allowedarray_use_case:
          if key == allowedarray_use_case[0]:
            updated_obj["user"]=value
          updated_obj[allowedarray_use_case[1]]=value
      returnlist.append(updated_obj)
    return returnlist
  else:
    obj= data[0]
    for key,value in obj.items():
      if key in allowedarray_use_case:
        if key == allowedarray_use_case[0]:
          returndata["user"]= value
        returndata[allowedarray_use_case[1]]=value
    return returndata 
  

def formatprofilelist(data) -> list:
  finallist=[]
  pseudolist=[]
  if len(data) >= 1:
    for value in data:
      if value not in pseudolist:
        pseudolist.append(value)
    for item in pseudolist:
      updated_obj={}    
      for key,value in item.items():
        if key == "user":
          updated_obj[key]=value
      finallist.append(updated_obj)    
  return finallist  


def imagerequestkey(reqdata)->dict:
  data= reqdata
  listitems= list(data)
  reqdatakey= listitems[0]
  returnformat= {reqdatakey:True}
  return returnformat


def usernameobject(reqdata)->dict:
  mutatedata= reqdata
  init_obj={}
  for key,value in mutatedata.items():
    if key == "username":
      init_obj[key]=value
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
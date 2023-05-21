from django.db.models import Q
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from asgiref.sync import async_to_sync

from .messengers import (createdefaultprofile,is_requestkeys_valid,imagerequestkey, updatecommentcount, updatepostlike_count,usernameobject)

from .serializers import (UserSerializer,ProfileSerializer,AboutModelSerialiser,PostModelSerialiser,LikePostModelSerializer,CommentPostSerializer)

from account.models import Profile
from home.models import aboutModel
from posts.models import (Post,LikePost,CommentPost)


# USER MODEL APIS

@api_view(['POST'])
def createnewuser(req,format=None)->Response:
  try:
    requsername= req.data["username"]
    reqemail= req.data["email"]
    try:
      db_obj= get_user_model().objects.get(username= requsername)
    except get_user_model().DoesNotExist:
      try:
        db_obj= get_user_model().objects.get(email= reqemail)
      except get_user_model().DoesNotExist:
        serializer= UserSerializer(data= req.data)
        if serializer.is_valid():
          serializer.save()
          profilestate= False
          user_id= serializer.data["id"]
          profilecreate_res= async_to_sync(createdefaultprofile)(user_id)
          details= profilecreate_res.data['details']
          if details== 'profile created':
            profilestate= True
          elif details == 'profile not created':
            profilestate= False
          else:
            profilestate = False   
          db_obj= get_user_model().objects.get(username= requsername)
          token,created= Token.objects.get_or_create(user= db_obj)
          return Response({"details": "user saved","with_profile":profilestate,"token":token.key,"userid":user_id})  
        return Response({"details":"not saved","reason":"invalid inputs"})
      return Response({"details":"email exists"})  
    return Response({"details":"username exists"})  
  except KeyError:
    return Response({"details":"key errror"})   


@api_view(['POST'])
def verifyuserexistence(req,format= None)->Response:
  returndata={}
  try:
    req_username_or_email= req.data.get("user")
    req_password= req.data.get("passwd")
    db_obj= get_user_model().objects.get(Q(username= req_username_or_email,password= req_password) | Q(email= req_username_or_email,password= req_password))
    if db_obj is not None and db_obj != {}:
      serialised= UserSerializer(db_obj,many=False)
      userid= serialised.data["id"]
      token,created = Token.objects.get_or_create(user= db_obj)
      returndata={"details":"user exists","token":token.key,"user_id":userid}
  except get_user_model().DoesNotExist:  
      returndata={"details":"no such user"}
  except KeyError:
    returndata={"details":"key errror"}
  return Response(returndata)  


@api_view(['PUT'])    
def updateuserinfo(req,req_id)->Response:
  returndata={}
  try:
    req_id
    db_obj= get_user_model().objects.get(id=req_id)
    if db_obj is not None:
      try:
        reqdata= req.data
        if is_requestkeys_valid(reqdata,model="usermodel")["details"]==True:
          try:
            isUsernameorEmail= req.headers['fieldname']
            fieldaffected=""
            if isUsernameorEmail== "username":
              try:
                db_obj= get_user_model().objects.get(username= req.data["username"])
                fieldaffected="username"
                returndata={"details":"object exists","affectedfield":fieldaffected}
              except get_user_model().DoesNotExist:
                serialised=UserSerializer(db_obj,data=req.data,partial=True)
                if serialised.is_valid():
                  serialised.save()
                  returndata={"details":"info updated","affectedfield":fieldaffected}
                else:
                  fieldaffected="username"
                  returndata={"details":"info not updated","affectedfield":fieldaffected}
            else:
              try:
                db_obj= get_user_model().objects.get(email= req.data["email"])
                fieldaffected="email"
                returndata={"details":"object exists","affectedfield":fieldaffected}
              except get_user_model().DoesNotExist:
                serialised=UserSerializer(db_obj,data=req.data,partial=True)
                if serialised.is_valid():
                  serialised.save()
                  returndata={"details":"info updated","affectedfield":fieldaffected}
                else:
                  fieldaffected="email"
                  returndata={"details":"info not updated","affectedfield":fieldaffected}
          except KeyError:
            returndata={"details":"incomplete headers"}
        else:
          returndata={"details":"invalid fields"}   
      except KeyError:
        returndata={"details":"no request data"} 
  except get_user_model().DoesNotExist:
    returndata={"details":"no such user"}
  except KeyError:
    returndata={"details":"key error"}
  return Response(returndata)  



@api_view(["GET"])
def getuserinfo(req)->Response:
  returndata={}
  try:
    token= req.headers["Authorization"]
    attempted_user= get_user_model().objects.get(auth_token= token)
    if attempted_user is not None and attempted_user != {}:
      serialised= UserSerializer(attempted_user,many=False)  
      init_return_data= serialised.data
      return_data_copy= init_return_data.copy()
      return_data_copy.pop("password")
      final_data= return_data_copy.copy()
      returndata={"details":final_data}
  except get_user_model().DoesNotExist:
      returndata={"details":"user not found"}
  except KeyError:
    returndata={"details":"key error"}  
  return Response(returndata)  


@api_view(["GET"])    
def getusername(req)->Response:
  returndata={}
  try:
    id= req.headers["userid"]
    attempted_user= get_user_model().objects.get(id= id)
    if attempted_user is not None and attempted_user != {}:
      serialised= UserSerializer(attempted_user,many=False)  
      init_return_data= usernameobject(serialised.data)
      final_data= init_return_data.copy()
      returndata={"details":final_data}
  except get_user_model().DoesNotExist:
      returndata={"details":"user not found"}
  except KeyError:
    returndata={"details":"key error"}
  return Response(returndata)

# PROFILE MODEL APIS

@api_view(['POST'])
def createnewprofile(req)->Response:
  returndata={}
  try:
    req.data
    db_obj= Profile.objects.get(user= req.data["user"])
    if db_obj is not None:
      returndata={"details":"profile exists"}
  except Profile.DoesNotExist:
    profile_siri= ProfileSerializer(data= req.data)
    if profile_siri.is_valid():
      profile_siri.save()
      returndata={"details":"profile saved"}
    else:
      returndata={"details":"profile not saved"}
  except KeyError:
    returndata={"details":"invalid request data"}
  return Response(returndata)    

    
@api_view(['PUT','POST'])
def updateuserprofiledata(req,userid)->Response:
  returndata={}
  try:
    db_obj= Profile.objects.get(id_user= userid)
    isImageField= req.headers['is-image']
    if isImageField == False:
      try:
        reqdata= req.data
        if is_requestkeys_valid(reqdata)["details"]== True:
          if db_obj is not None:
            serialised= ProfileSerializer(db_obj,data= req.data,partial=True)
            if serialised.is_valid():
              serialised.save()
              returndata={"details":"profile updated"}
            else:
              returndata={"details":"profile not updated"}
          else:
            returndata={"details":"invalid fields"}
      except ValueError:
        returndata={"details":"incorrect request data error"}
    else:      
      reqkey= imagerequestkey(req.data)
      if is_requestkeys_valid(reqkey)["details"]== True:
        if db_obj is not None:
          serialised=ProfileSerializer(db_obj,data=req.data,partial=True) 
          if serialised.is_valid():
            serialised.save()
            returndata={"details":"profile updated"}
          else:
            returndata={"details":"profile not updated"}
      else:
        returndata={"details":"invalid fields"}
  except KeyError:
      returndata={"details":"incomplete headers"}  
  except Profile.DoesNotExist:
    returndata={"details":"invalid user id"}
  return Response(returndata)  

@api_view(['GET']) 
def getuserprofiledata(req)->Response:
  returndata={}
  try:
    iduser= req.headers["iduser"]
    db_obj= Profile.objects.get(id_user= iduser)
    if db_obj is not None and db_obj is not {}:
      serialised_res= ProfileSerializer(db_obj,many=False)
      returndata={"details":serialised_res.data}
  except Profile.MultipleObjectsReturned:
    returndata={"details":"multiple values returned"}
  except Profile.DoesNotExist:
    returndata={"details":"invalid user id"}
  except KeyError:
    returndata={"details":"invalid inputs"}
  return Response(returndata)  


# ABOUT MODEL API

@api_view(["GET"])
def getaboutobjects(req)->Response:
  dbobj= aboutModel.objects.all()
  serialised= AboutModelSerialiser(dbobj,many=True)
  return Response({"details":serialised.data})


# POST MODEL APIS

@api_view(['POST']) 
def createpostobject(req)->Response:
  returndata={}
  try:
    username= req.data["user"]
    user_obj= get_user_model().objects.get(username=username)
    if user_obj is not None or user_obj is not {}:
      serialised= PostModelSerialiser(data= req.data)
      if serialised.is_valid():
        serialised.save()
        post_id= serialised.data["id"]
        returndata={"details":"post saved","post_id":post_id}
      else:
        returndata={"details":"post not saved"}
  except get_user_model().DoesNotExist:
    returndata={"details":"invalid user"}
  except KeyError:
    returndata={"details":"invalid request keys"}
  return Response(returndata)  


@api_view(['GET'])
def getpostbyid(req,post_id)->Response:
  returndata={}
  try:
    postid= post_id
    postobj= Post.objects.get(id=postid)
    if postobj is not None:
      serialised= PostModelSerialiser(postobj,many=False)
      returndata={"details":serialised.data}
  except Post.DoesNotExist:
    returndata={"details":"invalid post id"}  
  except KeyError:
    returndata={"details":"invalid request query"}
  return Response(returndata)

# LIKE MODEL APIS 

@api_view(['POST'])
def createordeletelike(req,postid,userid)->Response:
  returndata={}
  reqdata={"post_id":postid,"user":userid}
  try:
    user_obj= get_user_model().objects.get(id=userid)
    try:
      post_obj=Post.objects.get(id= postid)
      try:
        likeobject= LikePost.objects.get(user=userid,post_id=postid)
        if likeobject is not None:
          likeobject.delete()
          updatepostlike_count_res= updatepostlike_count(postid,increase=False)
          returndata={"details":"object deleted","like_count":updatepostlike_count_res["no_of_likes"]}
      except LikePost.DoesNotExist:
        likepostsiri= LikePostModelSerializer(data=reqdata)
        if likepostsiri.is_valid():
          likepostsiri.save()
          updatepostlike_count_res= updatepostlike_count(postid,increase=True)
          returndata={"details":"object created","like_count":updatepostlike_count_res["no_of_likes"]}
        else:
          returndata = {"details":"objcted not created"} 
    except Post.DoesNotExist:
      returndata={"details":"invalid post id"}  
  except get_user_model().DoesNotExist:
    returndata={"details":"invalid user id"}
  except ValidationError:
    returndata={"details":"invalid post id"}
  return Response(returndata)  

@api_view(["GET"])
def checkuserlikepoststatus(req,postid,userid):
  returndata={}
  try:
    userid=userid
    postid=postid
    userobj= get_user_model().objects.get(id=userid)
    if userobj is not None:
      try:
        likepostobj= LikePost.objects.get(user=userid,post_id=postid)
        returndata={"has_liked":True}  
      except LikePost.DoesNotExist:
        returndata={"has_liked":False}
  except get_user_model().DoesNotExist:
    returndata={"details":"invalid user id"}      
  return Response(returndata)  
    

# COMMENT MODEL APIS
 
@api_view(['POST'])
def createcomment(req,postid,userid)->Response:
  returndata={}
  commenttext=req.data["comment_text"]
  reqdata={"post_id":postid,"user":userid,"text":commenttext}
  try:
    user_obj= get_user_model().objects.get(id=userid)
    try:
      post_obj=Post.objects.get(id= postid)
      try:
        commentobject= CommentPost.objects.get(user=userid,post_id=postid)
        if commentobject is not None:
          commentsiri=CommentPostSerializer(commentobject,many=False)
          returndata={"details":"object exists","data":commentsiri.data}
      except CommentPost.DoesNotExist:
        commentsiri= CommentPostSerializer(data=reqdata)
        if commentsiri.is_valid():
          commentsiri.save()
          updatepostcomment_count_res= updatecommentcount(postid,increase=True)
          returndata={"details":"object created","comment_count":updatepostcomment_count_res["no_of_comments"]}
        else:
          returndata = {"details":"objcted not created"} 
    except Post.DoesNotExist:
      returndata={"details":"invalid post id"}  
  except get_user_model().DoesNotExist:
    returndata={"details":"invalid user id"}
  except ArithmeticError:
    returndata={"details":"invalid post id"}
  return Response(returndata)  


@api_view(["GET"])
def getallcomments(req,postid)-> Response:
  returndata={}
  try:
    postobj= Post.objects.get(id=postid)
    returndata={"details":postobj}
    if postobj is not None and postobj is not {}:
      try:
        commentobj=CommentPost.objects.get_queryset()
        lent=len(commentobj)
        if commentobj is not None and postobj is not {}:
          comments_siri= CommentPostSerializer(commentobj,many=True)
          returndata={"details":comments_siri.data}
      except CommentPost.DoesNotExist:
        returndata={"details":"no comments"}  
  except Post.DoesNotExist:
    returndata={"details":"invalid post id"}  
  return Response(returndata)


@api_view(["GET"])
def checkusercommentpoststatus(req,postid,userid) -> Response:
  returndata={}
  try:
    userobj= get_user_model().objects.get(id=userid)
    if userobj is not None:
      try:
        commentobj= CommentPost.objects.get(user=userid,post_id=postid)
        returndata={"has_commented":True}  
      except CommentPost.DoesNotExist:
        returndata={"has_commented":False}
  except get_user_model().DoesNotExist:
    returndata={"details":"invalid user id"}      
  return Response(returndata) 
  


from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer,ProfileSerializer
from django.contrib.auth import get_user_model

# Create your views here.


@api_view(['POST'])
def createnewuser(req,format=None):
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
          db_obj= get_user_model().objects.get(username= requsername)
          serialisedprofile= ProfileSerializer()
          token,created= Token.objects.get_or_create(user= db_obj)
          return Response({"details": "user saved","token":token.key})  
        return Response({"details":"not saved","reason":"invalid inputs"})
      return Response({"details":"email exists"})  
    return Response({"details":"username exists"})  
  except KeyError:
    return Response({"details":"key errror"})   


@api_view(['POST'])
def verifyuserexistence(req,format= None):
  try:
    req_username_or_email= req.data["user"]
    req_password= req.data["passwd"]
    try:
      db_obj= get_user_model().objects.get(username= req_username_or_email,password= req_password)
      if db_obj is not None and db_obj != {}:
        token,created = Token.objects.get_or_create(user= db_obj)
        return Response({"details":"user exists","token":token.key})
    except get_user_model().DoesNotExist:
      try:
        db_obj= get_user_model().objects.get(email= req_username_or_email,password= req_password)
        if db_obj is not None and db_obj != {}:
          token,created = Token.objects.get_or_create(user= db_obj)
          return Response({"details":"user exists","token":token.key})
      except get_user_model().DoesNotExist:  
        return Response({"details":"no such user"})  
  except KeyError:
    return Response({"details":"key errror"})  


@api_view(["GET"])
def getbasicuserinfo(req):
  try:
    token= req.headers["Authorization"]
    try:
      attempted_user= get_user_model().objects.get(auth_token= token)
      if attempted_user is not None and attempted_user != {}:
        serialised= UserSerializer(attempted_user,many=False)
        return Response({"details":serialised.data})
    except get_user_model().DoesNotExist:
      return Response({"details":"user not found"})
  except KeyError:
    return Response({"details":"key error"})   


from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from .serializers import UserSerializer,ProfileSerializeer
from django.contrib.auth import get_user_model
from rest_framework import status

# Create your views here.


@api_view(['POST'])
def createnewuser(req,format=None):
  # 
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
          return Response({"details": "user saved"})  
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
        return Response({"details":"user exists"})
    except get_user_model().DoesNotExist:
      try:
        db_obj= get_user_model().objects.get(email= req_username_or_email,password= req_password)
        if db_obj is not None and db_obj != {}:
          return Response({"details":"user exists"})
      except get_user_model().DoesNotExist:  
        return Response({"details":"no such user"})  
  except KeyError:
    return Response({"details":"key errror"})  





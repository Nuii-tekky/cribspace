from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from .serializers import UserSerializer,ProfileSerializeer
from django.contrib.auth import get_user_model
from rest_framework import status

# Create your views here.


@api_view(['POST'])
def createnewuser(req,format=None):
  print(req.data)
  serializer= UserSerializer(data= req.data)
  if serializer.is_valid():
    serializer.save()
    return Response({"details": "user saved"})  
  return Response({"details":"not saved"})


@api_view(['POST'])
def verifyuserexistence(req,format= None):
  try:
    pass
  except:
    pass







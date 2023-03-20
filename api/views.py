from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from .serializers import UserSerializer,ProfileSerializeer
from rest_framework import status

# Create your views here.


@api_view(['POST'])
def createnewuser(req,format=None):
  return Response({"details":"YESSS"})


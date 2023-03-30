from django.shortcuts import render,redirect
from rest_framework.decorators import api_view,permission_classes
import requests
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

def renderredirector(req):
  return render(req,"redirect.html")

def rendersignup(req):
  return render(req,"signup.html")

def renderlogin(req):
  return render(req,"login.html")

def renderlogout(req):
  return render(req,"logout.html")

def renderprompt(req):
  return render(req,"prompt.html")


@api_view(["GET"])
@permission_classes([IsAuthenticated,],)
def authuser(req):
  try:
    requestheaders= req.headers
    try:
      requestedredirect= requestheaders["Requestredirect"]
      return redirect(f"{requestedredirect}") 
    except KeyError:
      return Response({"details":"no specified redirect page"})  
  except KeyError:
    return Response({"details":"invalid headers"})
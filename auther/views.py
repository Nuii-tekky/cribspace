from django.shortcuts import render,redirect
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.urls.exceptions import NoReverseMatch
from django.urls import reverse
from django.shortcuts import redirect


def renderredirector(req):
  return render(req,"redirect.html")

def rendersignup(req):
  return render(req,"signup.html")

def renderlogin(req):
  return render(req,"login.html")

def renderprompt(req):
  return render(req,"prompt.html")


@api_view(["GET"])
@permission_classes([IsAuthenticated,],)
def authuser(req):
  try:
    requestheaders= req.headers
    requestedredirect= requestheaders["Requestredirect"]
    if requestedredirect == "postdetailpage":
      postid= req.headers["postid"]
      return redirect(reverse(f"{requestedredirect}",args=(postid,)))
    if requestedredirect == "userprofilepage":
      username= req.headers["username"]
      return redirect(reverse(f"{requestedredirect}",args=(username,)))
    return redirect(f"{requestedredirect}") 
  except NoReverseMatch:
    return Response({"details":"no such page"})
  except KeyError:
    return Response({"details":"no specified redirect page"})  
 



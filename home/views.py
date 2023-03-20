from django.shortcuts import render,redirect
import requests as reqq


def rendersignup(req):
  return render(req,"signup.html")

def renderlogin(req):
  return render(req,"login.html")

def renderlogout(req):
  return render(req,"logout.html")
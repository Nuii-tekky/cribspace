from django.shortcuts import render,redirect


def rendersignup(req):
  return render(req,"signu.html")
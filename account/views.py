from django.shortcuts import render

def renderaccountsettingpage(req):
  return render(req,"custom_settings.html")


def renderprofilepage(req):
  return render(req,"user-profile.html")
   

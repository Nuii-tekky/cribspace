from django.shortcuts import render

def renderaccountsettingpage(req):
  return render(req,"custom_settings.html")


def renderprofilepage(req,userid,username):
  obj={
    "f_userid":userid,
    "f_username":username
  }
  return render(req,"user-profile.html",obj)
   
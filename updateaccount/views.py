from django.shortcuts import render

def renderaccountsettingpage(req):
  return render(req,"custom_settings.html")
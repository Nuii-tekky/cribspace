from django.shortcuts import render

def renderaboutpage(req):
  return render(req,"about.html")


def renderfeedbackpage(req):
  return render(req,"feedback.html")


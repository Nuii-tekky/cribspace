from django.urls import path
from . import views


"""
patterns for my api endpoints with their respective views

"""

urlpatterns= [
  path('createnewuser',views.createnewuser,name="createnewuser"),
  path('verifyuser',views.verifyuserexistence,name="checkuserexists")
]

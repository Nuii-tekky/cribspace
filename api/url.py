from django.urls import path
from . import views
"""
patterns for my api endpoints with their respective views

"""

urlpatterns= [
  path('createnewuser',views.createnewuser,name="createnewuser"),
  path('verifyuser',views.verifyuserexistence,name="checkuserexists"),
  path('getbasicuserdata',views.getbasicuserinfo,name="basicdata"),
  path('addprofile',views.createnewprofile,name="createprofile"),
  path('getprofiledata',views.getuserprofiledata,name='getprofile'),
  path('updateuserdata/<int:req_id>',views.updateuserinfo,name="updateuserinfo"),
  path('updateprofile/<int:userid>',views.updateuserprofiledata,name="updateuserprofile")
]

from django.urls import path
from . import views

"""
patterns for my api endpoints with their respective views

"""

urlpatterns= [
  path('users/createnewuser',views.createnewuser,name="createnewuser"),
  path('users/verifyuser',views.verifyuserexistence,name="checkuserexists"),
  path('users/updateuserdata/<int:req_id>',views.updateuserinfo,name="updateuserinfo"),
  path('users/getbasicuserdata',views.getuserinfo,name="basicdata"),
  path('users/getusername',views.getusername,name="getusername"),

  path('profiles/addprofile',views.createnewprofile,name="createprofile"),
  path('profiles/getprofiledata',views.getuserprofiledata,name='getprofile'),
  path('profiles/updateprofile/<int:userid>',views.updateuserprofiledata,name="updateuserprofile"),

  path('home/getaboutobjects',views.getaboutobjects,name="aboutobjects"),

  path('posts/addpost',views.createpostobject,name="createpost"),
  path('posts/getpost/post-id=<str:post_id>',views.getpostbyid,name="getpostbyid"),

  path('posts/likepost/post-id=<str:postid>&user=<int:userid>',views.createordeletelike,name="likepost"),
  path('posts/has_liked/post-id=<str:postid>&user=<int:userid>',views.checkuserlikepoststatus,name="hasuserliked"),

  path('posts/commentpost/post-id=<str:postid>&user=<int:userid>',views.createcomment,name="createcomment"),
  path('posts/has_commented/post-id=<str:postid>&user=<int:userid>',views.checkusercommentpoststatus,name="hasusercommented"),
  path('posts/allcomments/post-id=<str:postid>',views.getallcomments,name="allcomments")
]

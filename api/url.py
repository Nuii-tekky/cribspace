from django.urls import path
from . import views


"""
patterns for my api endpoints with their respective views

"""

urlpatterns= [
  path('users/register',views.createnewuser,name="createnewuser"),
  path('users/updateuser/<int:req_id>',views.updateuserinfo,name="updateuserinfo"),
  path('users/verify',views.verifyuserexistence,name="checkuserexists"),
  path('users/userdata',views.getuserinfo,name="basicdata"),
  path('users/getusername',views.getusername,name="getusername"),
  path('users/search',views.searchhandler),

  path('followers/followuser/follower=<int:followerid>&userfollowed=<int:userfollowedid>',views.createordeletefollow,name="createordeletefollow"),
  path('followers/getfollowers/userid=<int:userid>',views.getallfollowers),
  path('followers/getfollowing/userid=<int:userid>',views.getallfollowing),

  path('followers/getfollowerstatus/user=<int:userid>&otheruser=<int:attempteduserid>',views.getuserfollowstatus),
  path('followers/recommendedfollowers/userid=<int:userid>',views.recommendedfollowers),

  path('profiles/updateprofile/<int:userid>',views.updateuserprofiledata,name="updateuserprofile"),
  path('profiles/getprofiledata',views.getuserprofiledata,name='getprofile'),

  path('posts/addpost',views.createpostobject,name="createpost"),
  path('posts/getpost/post-id=<str:post_id>',views.getpostbyid,name="getpostbyid"),
  path('posts/getposts/user=<int:userid>',views.getpostsbyuserid,name="getpostbyuserid"),
  path('posts/feed/userid=<int:userid>',views.generateposts),

  path('posts/likepost/post-id=<str:postid>&user=<int:userid>',views.createordeletelike,name="likepost"),
  path('posts/has_liked/post-id=<str:postid>&user=<int:userid>',views.checkuserlikepoststatus,name="hasuserliked"),

  path('posts/commentpost/post-id=<str:postid>&user=<int:userid>',views.createcomment,name="createcomment"),
  path('posts/has_commented/post-id=<str:postid>&user=<int:userid>',views.checkusercommentpoststatus,name="hasusercommented"),
  path('posts/allcomments/post-id=<str:postid>',views.getallcomments,name="allcomments"),

  path('notifications/user=<int:userid>',views.fetchallnotifications),
  path('notifications/delete/id=<int:notifid>',views.deletenotification),


]

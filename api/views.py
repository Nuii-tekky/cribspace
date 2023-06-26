import abc
from django.db.models import Q
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token

from .messengers import (is_requestkeys_valid,filterobjectfields,imagerequestkey,usernameobject,postlike_count,commentcount,combineposts,formatprofilelist)

from .serializers import (UserSerializer,ProfileSerializer,FollowUserSerializer,AboutModelSerialiser,PostModelSerialiser,LikePostModelSerializer,CommentPostSerializer,NotificationSerializer)

from notifications.models import Notifcations
from account.models import Profile,FollowerModel
from home.models import aboutModel
from posts.models import (Post,LikePost,CommentPost)


# USER MODEL APIS

@api_view(['POST'])
def createnewuser(req,format=None):
  returndata={}
  try:
    requsername= req.data["username"]
    reqemail= req.data["email"]
    try:
      db_obj= get_user_model().objects.get(username= requsername)
      if db_obj is not None and db_obj != {}:
        returndata= {"details":"username exists"}
    except get_user_model().DoesNotExist:
      try:
        db_obj= get_user_model().objects.get(email= reqemail)
        if db_obj is not None and db_obj != {}:
          returndata= {"details":"email exists"}
      except get_user_model().DoesNotExist:
        serializer= UserSerializer(data= req.data)
        if serializer.is_valid():
          serializer.save() 
          db_obj= get_user_model().objects.get(username= requsername)
          user_id=db_obj.id
          token,created= Token.objects.get_or_create(user= db_obj)
          returndata={"details": "user saved","with_profile":True,"token":token.key,"userid":user_id}
        else:
          returndata= {"details":"not saved","reason":"invalid inputs"}  
  except KeyError:
    returndata= {"details":"key errror"}
  return Response(returndata)
    

@api_view(['POST'])
def verifyuserexistence(req,format= None)->Response:
  returndata={}
  try:
    req_username_or_email= req.data.get("user")
    req_password= req.data.get("passwd")
    db_obj= get_user_model().objects.get(Q(username= req_username_or_email,password= req_password) | Q(email= req_username_or_email,password= req_password))
    if db_obj is not None and db_obj != {}:
      serialised= UserSerializer(db_obj,many=False)
      userid= serialised.data["id"]
      token,created = Token.objects.get_or_create(user= db_obj)
      returndata={"details":"user exists","token":token.key,"user_id":userid}
  except get_user_model().DoesNotExist:  
      returndata={"details":"no such user"}
  except KeyError:
    returndata={"details":"key errror"}
  return Response(returndata)  


@api_view(['PUT'])    
def updateuserinfo(req,req_id)->Response:
  returndata={}
  try:
    req_id
    db_obj= get_user_model().objects.get(id=req_id)
    if db_obj is not None:
      try:
        reqdata= req.data
        if is_requestkeys_valid(reqdata,model="usermodel")["details"]==True:
          try:
            isUsernameorEmail= req.headers['fieldname']
            fieldaffected=""
            if isUsernameorEmail== "username":
              try:
                db_obj= get_user_model().objects.get(username= req.data["username"])
                fieldaffected="username"
                returndata={"details":"object exists","affectedfield":fieldaffected}
              except get_user_model().DoesNotExist:
                serialised=UserSerializer(db_obj,data=req.data,partial=True)
                if serialised.is_valid():
                  serialised.save()
                  returndata={"details":"info updated"}
                else:
                  fieldaffected="username"
                  returndata={"details":"info not updated","affectedfield":fieldaffected}
            else:
              try:
                db_obj= get_user_model().objects.get(email= req.data["email"])
                fieldaffected="email"
                returndata={"details":"object exists","affectedfield":fieldaffected}
              except get_user_model().DoesNotExist:
                serialised=UserSerializer(db_obj,data=req.data,partial=True)
                if serialised.is_valid():
                  serialised.save()
                  returndata={"details":"info updated"}
                else:
                  fieldaffected="email"
                  returndata={"details":"info not updated","affectedfield":fieldaffected}
          except KeyError:
            returndata={"details":"incomplete headers"}
        else:
          returndata={"details":"invalid fields"}   
      except KeyError:
        returndata={"details":"no request data"} 
  except get_user_model().DoesNotExist:
    returndata={"details":"no such user"}
  except KeyError:
    returndata={"details":"key error"}
  return Response(returndata)  


@api_view(["GET"])
def getuserinfo(req)->Response:
  returndata={}
  try:
    token= req.headers["Authorization"]
    userid=req.headers["userid"]
    loggeduser= get_user_model().objects.get(auth_token= token)
    if loggeduser is not None and loggeduser != {}:
      try:
        userinstance=get_user_model().objects.get(id=userid)
        if userinstance is not None and userinstance != {}:
          serialised= UserSerializer(userinstance,many=False)  
          init_return_data= serialised.data
          return_data_copy= init_return_data.copy()
          return_data_copy.pop("password")
          final_data= return_data_copy.copy()
          returndata={"details":final_data}
      except get_user_model().DoesNotExist:
        returndata={"details":"user not found"}
  except get_user_model().DoesNotExist:
      returndata={"details":"invalid log token"}
  except KeyError:
    returndata={"details":"key error"}  
  return Response(returndata)  


@api_view(["GET"])    
def getusername(req)->Response:
  returndata={}
  try:
    id= req.headers["userid"]
    attempted_user= get_user_model().objects.get(id= id)
    if attempted_user is not None and attempted_user != {}:
      serialised= UserSerializer(attempted_user,many=False)  
      init_return_data= usernameobject(serialised.data)
      final_data= init_return_data.copy()
      returndata={"details":final_data}
  except get_user_model().DoesNotExist:
      returndata={"details":"user not found"}
  except KeyError:
    returndata={"details":"key error"}
  return Response(returndata)

# PROFILE MODEL APIS 
    
@api_view(['PUT','POST'])
def updateuserprofiledata(req,userid)->Response:
  returndata={}
  try:
    db_obj= Profile.objects.get(id_user= userid)
    isImageField= req.headers['is-image']
    if isImageField == False:
      try:
        reqdata= req.data
        if is_requestkeys_valid(reqdata)["details"]== True:
          if db_obj is not None:
            serialised= ProfileSerializer(db_obj,data= req.data,partial=True)
            if serialised.is_valid():
              serialised.save()
              returndata={"details":"profile updated"}
            else:
              returndata={"details":"profile not updated"}
          else:
            returndata={"details":"invalid fields"}
      except ValueError:
        returndata={"details":"incorrect request data"}
    else:      
      reqkey= imagerequestkey(req.data)
      if is_requestkeys_valid(reqkey)["details"]== True:
        if db_obj is not None:
          serialised=ProfileSerializer(db_obj,data=req.data,partial=True) 
          if serialised.is_valid():
            serialised.save()
            returndata={"details":"profile updated"}
          else:
            returndata={"details":"profile not updated"}
      else:
        returndata={"details":"invalid fields"}
  except KeyError:
      returndata={"details":"incomplete headers"}  
  except Profile.DoesNotExist:
    returndata={"details":"invalid user id"}
  return Response(returndata)  


@api_view(['GET']) 
def getuserprofiledata(req)->Response:
  returndata={}
  try:
    iduser= req.headers["iduser"]
    db_obj= Profile.objects.get(id_user= iduser)
    if db_obj is not None and db_obj is not {}:
      serialised_res= ProfileSerializer(db_obj,many=False)
      returndata={"details":serialised_res.data}
  except Profile.MultipleObjectsReturned:
    returndata={"details":"multiple values returned"}
  except Profile.DoesNotExist:
    returndata={"details":"invalid user id"}
  except KeyError:
    returndata={"details":"invalid inputs"}
  return Response(returndata)  


# ABOUT MODEL API

@api_view(["GET"])
def getaboutobjects(req)->Response:
  dbobj= aboutModel.objects.all()
  serialised= AboutModelSerialiser(dbobj,many=True)
  return Response({"details":serialised.data})


# POST MODEL APIS

@api_view(['POST']) 
def createpostobject(req)->Response:
  returndata={}
  try:
    serialised= PostModelSerialiser(data= req.data)
    if serialised.is_valid():
      serialised.save()
      post_id= serialised.data["id"]
      returndata={"details":"post saved","post_id":post_id}
    else:
      returndata={"details":"post not saved"}
  except KeyError:
    returndata={"details":"invalid request keys"}
  return Response(returndata)  


@api_view(['GET'])
def getpostbyid(req,post_id)->Response:
  returndata={}
  try:
    postid= post_id
    postobj= Post.objects.get(id=postid)
    if postobj is not None:
      serialised= PostModelSerialiser(postobj,many=False)
      returndata={"details":serialised.data}
  except Post.DoesNotExist:
    returndata={"details":"invalid post id"}  
  except KeyError:
    returndata={"details":"invalid request query"}
  return Response(returndata)


@api_view(["GET"])
def getpostsbyuserid(req,userid):
  returndata={}
  try:
    userid= userid
    postobject= Post.objects.filter(user=userid).order_by("-created_at")
    if postobject is not None and len(postobject) != 0:
      serialised= PostModelSerialiser(postobject,many=True)
      returndata= {"details":serialised.data}
    else:
      returndata={"details":"no posts"}
  except KeyError:
    returndata={"details":"invalid request query"}
  return Response(returndata)


@api_view(["GET"])
def generateposts(req,userid):
  returndata={}
  load_more = req.query_params.get('load_more')
  page_size = int(req.query_params.get('page_size'))

  # Retrieve posts by the user and the followers
  
  followers= FollowerModel.objects.filter(user_followed=userid)
  users_following= FollowerModel.objects.filter(follower= userid)
  
  followers_id= [ follower.id for follower in followers ]
  following_ids= [ following.id for following in users_following ]

  userposts = [Post.objects.filter(user=userid)]
  posts_by_followers = [Post.objects.filter(user=follower_id) for follower_id in followers_id if Post.objects.filter(user=follower_id).exists()]

  posts_by_following=[Post.objects.filter(user=following_id) for following_id in following_ids if Post.objects.filter(user=following_id).exists()]
  
  # Combine the posts
  randompostsdata= combineposts(userposts,posts_by_followers,posts_by_following)
  finalposts= randompostsdata["posts"]
  total_posts= randompostsdata["length"]

  paginated_posts=[]
  if load_more:
    start_index = int(req.query_params.get('start_index'))
    end_index = start_index + page_size
    paginated_posts = finalposts[start_index:end_index]
  else:
    paginated_posts = finalposts[:page_size]

  serialized = PostModelSerialiser(paginated_posts, many=True)
  
  returndata = {
    'total_posts': total_posts,
    'posts': serialized.data
  }

  if load_more and end_index >= total_posts:
    returndata['load_more'] = False
  elif not load_more and total_posts > page_size:
    returndata['load_more'] = True
    returndata['start_index'] = page_size

  return Response(returndata)

# LIKE MODEL APIS 

@api_view(['POST'])
def createordeletelike(req,postid,userid)->Response:
  returndata={}
  reqdata={"post_id":postid,"user":userid}
  try:
    likeobject= LikePost.objects.get(user=userid,post_id=postid)
    if likeobject is not None:
      likeobject.delete()
      updatepostlike_count_res= postlike_count(postid)
      returndata={"details":"object deleted","like_count":updatepostlike_count_res["no_of_likes"]}
  except LikePost.DoesNotExist:
    likepostsiri= LikePostModelSerializer(data=reqdata)
    if likepostsiri.is_valid():
      likepostsiri.save()
      postlike_count_res= postlike_count(postid)
      returndata={"details":"object created","like_count":postlike_count_res["no_of_likes"]}
    else:
      returndata = {"details":"objcted not created"} 
  except ValidationError:
    returndata={"details":"invalid post id"}
  return Response(returndata)  

@api_view(["GET"])
def checkuserlikepoststatus(req,postid,userid):
  returndata={}
  try:
    userid=userid
    postid=postid
    likepostobj= LikePost.objects.get(user=userid,post_id=postid)
    returndata={"has_liked":True}  
  except LikePost.DoesNotExist:
    returndata={"has_liked":False}     
  return Response(returndata)  
    
# COMMENT MODEL APIS
 
@api_view(['POST'])
def createcomment(req,postid,userid)->Response:
  returndata={}
  commenttext=req.data["comment_text"]
  reqdata={"post_id":postid,"user":userid,"text":commenttext}
  try:
    commentobject= CommentPost.objects.get(user=userid,post_id=postid)
    if commentobject is not None:
      commentsiri=CommentPostSerializer(commentobject,many=False)
      returndata={"details":"object exists","data":commentsiri.data}
  except CommentPost.DoesNotExist:
    commentsiri= CommentPostSerializer(data=reqdata)
    if commentsiri.is_valid():
      commentsiri.save()
      comment_count_res= commentcount(postid)
      returndata={"details":"object created","comment_count":comment_count_res["no_of_comments"]}
    else:
      returndata = {"details":"objcted not created"} 
  except KeyError:
    returndata={"details":"invalid query params"}
  return Response(returndata)  


@api_view(["GET"])
def getallcomments(req,postid)-> Response:
  returndata={}
  try:
    commentobj=CommentPost.objects.filter(post_id=postid).order_by('-created_at')
    if commentobj is not None and len(commentobj) != 0:
      comments_siri= CommentPostSerializer(commentobj,many=True)
      returndata={"details":comments_siri.data}
    else:
      returndata={"details":"no comments"}
  except ValidationError:
    returndata={"details":"invalid post id"}  
  return Response(returndata)


@api_view(["GET"])
def checkusercommentpoststatus(req,postid,userid) -> Response:
  returndata={}
  try:
    commentobj= CommentPost.objects.get(user=userid,post_id=postid)
    returndata={"has_commented":True}  
  except CommentPost.DoesNotExist:
    returndata={"has_commented":False}    
  return Response(returndata) 
  

# follower model

@api_view(["POST"])
def createordeletefollow(req,followerid,userfollowedid):
  returndata={}
  try:
    followerobj= FollowerModel.objects.get(follower=followerid,user_followed=userfollowedid)
    if followerobj is not None:
      followerobj.delete()
      returndata={"details":"object deleted"}
  except FollowerModel.DoesNotExist:
    req_data={"follower":followerid,"user_followed":userfollowedid}
    followerobjsiri= FollowUserSerializer(data=req_data) 
    if followerobjsiri.is_valid():
      followerobjsiri.save()
      returndata={"details":"object created"}
    else:
      returndata={"details":"object not created","err":followerobjsiri.errors}  
  except KeyError:
    returndata={"details":"invalid query params"}    
  return Response(returndata)  

@api_view(["GET"])
def getallfollowers(req,userid):
  returndata={}
  try:
    followerobj= FollowerModel.objects.filter(user_followed=userid).order_by("-created_at")
    if followerobj is not None and len(followerobj) != 0:
      serialised= FollowUserSerializer(followerobj,many=True)
      initreturndata=serialised.data
      finaldata=filterobjectfields(initreturndata,related_name="followers")
      returndata= {"details":finaldata}
    else:
      returndata={"details":"no followers"}
  except KeyError:
    returndata={"details":"invalid request query"}
  return Response(returndata)      

@api_view(["GET"])
def getallfollowing(req,userid):
  returndata={}
  try:
    followerobj= FollowerModel.objects.filter(follower=userid).order_by("-created_at")
    if followerobj is not None and len(followerobj) != 0:
      serialised= FollowUserSerializer(followerobj,many=True)
      init_returndata=serialised.data
      final_data=filterobjectfields(init_returndata,related_name="following")
      returndata= {"details":final_data}
    else:
      returndata={"details":"no follows"}
  except KeyError:
    returndata={"details":"invalid request query"}
  return Response(returndata)

@api_view(["GET"])  
def getuserfollowstatus(req,userid,attempteduserid):
  returndata={}
  try:
    followerobj= FollowerModel.objects.filter(follower=userid,user_followed=attempteduserid)[:1]
    if followerobj is not None and len(followerobj) != 0:
      returndata={"details":{"following":True}}
  except FollowerModel.DoesNotExist:
    returndata= {"details":{"following":False}}
  except KeyError:
    returndata={"details":"invalid request query"}
  return Response(returndata)  
    
@api_view(["GET"])
def recommendedfollowers(req,userid):
  returndata={}
  recommended_followers_list=[]
  try:
    req_user_profile= Profile.objects.filter(user=userid)[:1][0] 

    followers_by_occupation_category= Profile.objects.filter(occupation_category= req_user_profile.occupation_category).exclude(user=userid)
    recommended_followers_list.extend(followers_by_occupation_category)

    users_followed_by_user= req_user_profile.user.following.all()
    user_objects=[objectt.user_followed for objectt in users_followed_by_user]

    # get the profiles of the followers of the users followed by the req user

    profiles_of_users_following_followers= Profile.objects.filter(user__following__user_followed__in=user_objects).exclude(user=userid)
    recommended_followers_list.extend(profiles_of_users_following_followers)
    
    # get the profiles of the users followed by the users followed by the req user
    for user in user_objects:
      user_following= user.following.all()
      for item in user_following:
        user_following_profile= Profile.objects.filter(user=item.user_followed).exclude(user=userid)[:1][0]
        recommended_followers_list.append(user_following_profile)
    
    # excude users that have been followed
    _sorted_list= [_object for _object in recommended_followers_list if _object.user not in user_objects]

    profile_siri= ProfileSerializer(_sorted_list,many=True)
    init_data= profile_siri.data
    final_list= formatprofilelist(init_data)
    length_of_final_list= len(final_list)
    returndata={"details":final_list}
  except IndexError:
    returndata={"details":"invalid userid"}
  return Response(returndata)
  
# notifications

@api_view(["GET"])
def fetchallnotifications(req,userid):
  returndata={}
  try:
    notif_length=req.headers["Notif-length"]
    if notif_length == "minimum":
      notif_obj= Notifcations.objects.filter(user=userid).order_by("-created_at")[:3]
      notif_siri= NotificationSerializer(notif_obj,many=True)
      if len(notif_siri.data) == 0:
        returndata={"details":"no notifications"}
      else:  
        returndata={"details":notif_siri.data}
    else:
      notif_obj= Notifcations.objects.filter(user=userid).order_by("-created_at")
      notif_siri= NotificationSerializer(notif_obj,many=True)
      if len(notif_siri.data) == 0:
        returndata={"details":"no notifications"}
      else:  
        returndata={"details":notif_siri.data}
  except KeyError:
    returndata={"details":"incomplete request headers"}
  return Response(returndata)  
        

@api_view(["DELETE"])
def deletenotification(req,notifid):
  returndata={}
  try:
    notification_obj= Notifcations.objects.filter(id=notifid)
    if len(notification_obj) >= 1:
      notification_instance= notification_obj[:1][0]
      notification_instance.delete()
      returndata={"details":"object deleted"}
    else:
      returndata={"details":"invalid notification id"}     
  except KeyError:
    returndata={"details":"keyerror"}  
  return Response(returndata)  





from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.db.models import Q
from django.contrib.auth import get_user_model
from .serializers import UserSerializer,ProfileSerializer,AboutModelSerialiser
from auther.models import Profile
from home.models import aboutModel
from .messengers import createdefaultprofile,is_requestkeys_valid,imagerequestkey


@api_view(['POST'])
def createnewuser(req,format=None):
  try:
    requsername= req.data["username"]
    reqemail= req.data["email"]
    try:
      db_obj= get_user_model().objects.get(username= requsername)
    except get_user_model().DoesNotExist:
      try:
        db_obj= get_user_model().objects.get(email= reqemail)
      except get_user_model().DoesNotExist:
        serializer= UserSerializer(data= req.data)
        if serializer.is_valid():
          serializer.save()
          profilestate= False
          user_id= serializer.data["id"]
          profilecreate_res= createdefaultprofile(user_id)
          details= profilecreate_res.data['details']
          if details== 'profile created':
            profilestate= True
          elif details == 'profile not created':
            profilestate= False
          else:
            profilestate = False   
          db_obj= get_user_model().objects.get(username= requsername)
          token,created= Token.objects.get_or_create(user= db_obj)
          return Response({"details": "user saved","with_profile":profilestate,"token":token.key,"userid":user_id})  
        return Response({"details":"not saved","reason":"invalid inputs"})
      return Response({"details":"email exists"})  
    return Response({"details":"username exists"})  
  except KeyError:
    return Response({"details":"key errror"})   


@api_view(['POST'])
def verifyuserexistence(req,format= None):
  try:
    req_username_or_email= req.data.get("user")
    req_password= req.data.get("passwd")
    try:
      db_obj= get_user_model().objects.get(Q(username= req_username_or_email,password= req_password) | Q(email= req_username_or_email,password= req_password))
      if db_obj is not None and db_obj != {}:
        serialised= UserSerializer(db_obj,many=False)
        userid= serialised.data["id"]
        token,created = Token.objects.get_or_create(user= db_obj)
        return Response({"details":"user exists","token":token.key,"user_id":userid})
    except get_user_model().DoesNotExist:  
      return Response({"details":"no such user"})  
  except KeyError:
    return Response({"details":"key errror"})  


@api_view(["GET"])
def getbasicuserinfo(req):
  try:
    token= req.headers["Authorization"]
    try:
      attempted_user= get_user_model().objects.get(auth_token= token)
      if attempted_user is not None and attempted_user != {}:
        serialised= UserSerializer(attempted_user,many=False)  
        init_return_data= serialised.data
        return_data_copy= init_return_data.copy()
        return_data_copy.pop("password")
        final_data= return_data_copy.copy()
        return Response({"details":final_data})
    except get_user_model().DoesNotExist:
      return Response({"details":"user not found"})
  except KeyError:
    return Response({"details":"key error"})   

@api_view(['PUT'])    
def updateuserinfo(req,req_id):
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
                return Response({"details":"object exists","affectedfield":fieldaffected}) 
              except get_user_model().DoesNotExist:
                serialised=UserSerializer(db_obj,data=req.data,partial=True)
                if serialised.is_valid():
                  serialised.save()
                  return Response({"details":"info updated","affectedfield":fieldaffected})
                else:
                  fieldaffected="username"
                  return Response({"details":"info not updated","affectedfield":fieldaffected})  
            else:
              try:
                db_obj= get_user_model().objects.get(email= req.data["email"])
                fieldaffected="email"
                return Response({"details":"object exists","affectedfield":fieldaffected}) 
              except get_user_model().DoesNotExist:
                serialised=UserSerializer(db_obj,data=req.data,partial=True)
                if serialised.is_valid():
                  serialised.save()
                  return Response({"details":"info updated","affectedfield":fieldaffected})
                else:
                  fieldaffected="email"
                  return Response({"details":"info not updated","affectedfield":fieldaffected})  
          except KeyError:
            return Response({"details":"incomplete headers"})  
        else:
          return Response({"details":"invalid fields"})    
      except KeyError:
        return Response({"details":"no request data"})  
  except get_user_model().DoesNotExist:
    return Response({"details":"no such user"})  
  except KeyError:
    return Response({"details":"key error"})  



@api_view(['POST'])
def createnewprofile(req):
  try:
    req.data
    try:
      db_obj= Profile.objects.get(user= req.data["user"])
      if db_obj is not None:
        return Response({"details":"profile exists"})
    except Profile.DoesNotExist:
      profile_siri= ProfileSerializer(data= req.data)
      if profile_siri.is_valid():
        profile_siri.save()
        return Response({"details":"profile saved"})
      else:
        return Response({"details":"profile not saved"})  
  except KeyError:
    return Response({"details":"invalid request data"})
    

@api_view(['GET']) 
def getuserprofiledata(req):
  try:
    iduser= req.headers["iduser"]
    try:
      db_obj= Profile.objects.get(id_user= iduser)
      if db_obj is not None and db_obj is not {}:
        serialised_res= ProfileSerializer(db_obj,many=False)
        return Response({"details":serialised_res.data})
    except Profile.MultipleObjectsReturned:
      return Response({"details":"multiple values returned"})    
    except Profile.DoesNotExist:
      return Response({"details":"invalid user id"})    
  except KeyError:
    return Response({"details":"invalid inputs"})  

    
@api_view(['PUT','POST'])
def updateuserprofiledata(req,userid):
  try:
    db_obj= Profile.objects.get(id_user= userid)
    try:
      isImageField= req.headers['is-image']
      if isImageField == False:
        try:
          reqdata= req.data
          if is_requestkeys_valid(reqdata)["details"]== True:
            if db_obj is not None:
              serialised= ProfileSerializer(db_obj,data= req.data,partial=True)
              if serialised.is_valid():
                serialised.save()
                return Response({"details":"profile updated"})
              else:
                return Response({"details":"profile not updated"})
          else:
            return Response({"details":"invalid fields"})
        except ValueError:
          return Response({"details":"incorrect request data error"})  
      else:      
        reqkey= imagerequestkey(req.data)
        if is_requestkeys_valid(reqkey)["details"]== True:
          if db_obj is not None:
            serialised=ProfileSerializer(db_obj,data=req.data,partial=True) 
            if serialised.is_valid():
              serialised.save()
              return Response({"details":"profile updated"})
            else:
              return Response({"details":"profile not updated"})  
        else:
          return Response({"details":"invalid fields"})      
    except KeyError:
      return Response({"details":"incomplete headers"})  
  except Profile.DoesNotExist:
    return Response({"details":"invalid user id"})  

@api_view(["GET"])
def getaboutobjects(req):
  dbobj= aboutModel.objects.all()
  serialised= AboutModelSerialiser(dbobj,many=True)
  return Response({"details":serialised.data})

@api_view(["POST"])
def putdata(req):
  data= req.data
  siri= AboutModelSerialiser(data=data)
  if siri.is_valid():
    siri.save()
    return Response({"details":siri.data})
  else:
    return Response({"details":siri.errors})  
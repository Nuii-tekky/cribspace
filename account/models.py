from django.db import models
from django.contrib.auth import get_user_model


user= get_user_model()

class Profile(models.Model):
  user= models.ForeignKey(user,on_delete=models.CASCADE)
  id_user= models.IntegerField()
  bio= models.TextField(default="i am a cribspace user",null=True)
  location= models.CharField(default="somewhere,earth",null= True, max_length= 50)
  occupation= models.CharField(default="cribspace user",null= True, max_length= 50)
  telephone= models.BigIntegerField(default=10101010101,null=True)
  profileimage= models.ImageField(upload_to= "profile_images",default= "defaullt.jpg") 
   
  def __str__(self):
    return self.user.get_username()
    


class FollowerUser(models.Model):
  follower= models.IntegerField(null=False,blank=False)
  user_followed=models.CharField(null=False,blank=False,max_length=100)    
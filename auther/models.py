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
  profileimage= models.ImageField(upload_to= "profile_images",default= "default.jpg") 
   
  def __str__(self):
    return self.user.get_username()
    
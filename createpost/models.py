from django.db import models
from django.contrib.auth import get_user_model
import uuid
import datetime


class Post(models.Model):
  id=models.UUIDField(primary_key=True,default=uuid.uuid4)
  user= models.CharField(default=True,null=True,max_length=50)
  bio= models.TextField(default="i am a cribspace user",null=True)
  image= models.ImageField(upload_to='post-images',default="default-post.jpg")
  occupation= models.CharField(default="cribspace user",null= True, max_length= 50)
  caption= models.TextField(null=True,default=True,max_length=900)
  no_of_likes= models.BigIntegerField(default=0) 
  no_of_comments=models.BigIntegerField(default=0)
  created_at=models.DateTimeField(auto_now_add=True)


  def __str__(self):
    return self.user.get_username()
    
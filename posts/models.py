from django.db import models
from django.contrib.auth import get_user_model
import uuid


class Post(models.Model):
  id=models.UUIDField(primary_key=True,default=uuid.uuid4)
  user= models.IntegerField(null=False,blank=False)
  image= models.ImageField(upload_to='post-images',blank=True,null=True)
  caption= models.TextField(null=True,blank=True,max_length=3000)
  no_of_likes= models.BigIntegerField(default=0) 
  no_of_comments=models.BigIntegerField(default=0)
  created_at=models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return f"{self.caption} with {self.no_of_likes} likes"
    
  








  
from django.db import models
from django.contrib.auth.models import User
from PIL import Image
import uuid


class Post(models.Model):
  id=models.UUIDField(primary_key=True,default=uuid.uuid4)
  user= models.ForeignKey(User,on_delete=models.CASCADE)
  image= models.ImageField(upload_to='post-images',blank=True,null=True)
  imagesize=models.CharField(null=True,blank=True)
  caption= models.TextField(null=True,blank=True,max_length=3000)
  no_of_likes= models.BigIntegerField(default=0) 
  no_of_comments=models.BigIntegerField(default=0)
  created_at=models.DateTimeField(auto_now_add=True)

  def save(self,*args,**kwargs):
    if self.image:
      im= Image.open(self.image)
      im_width=im.width
      im_height=im.height
      self.imagesize=[im_width,im_height]
    super().save()

  def __str__(self):
    return f"{self.caption} with {self.no_of_likes} likes"  


  
class LikePost(models.Model):
  post_id=models.ForeignKey(Post,on_delete=models.CASCADE)
  user= models.ForeignKey(User,on_delete=models.CASCADE)
  created_at=models.DateTimeField(auto_now_add=True)

  def __str__(self) -> str:
    return f"like object created by {self.user} for {self.post_id}"


class CommentPost(models.Model):
  post_id=models.ForeignKey(Post,on_delete=models.CASCADE)
  user= models.ForeignKey(User,on_delete=models.CASCADE)
  text= models.TextField(null=True,blank=True)
  created_at=models.DateTimeField(auto_now_add=True)


  def __str__(self) -> str:
    return f"comment object created by {self.user} for {self.post_id}"




from django.db import models
import uuid


# i am using integer field for the userid so i can query for the post owners username and his profile image from the respective apis


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
    
  
class LikePost(models.Model):
  post_id=models.CharField(null=False,blank=False,max_length= 90)
  user= models.IntegerField(null=False,blank=False)

  def __str__(self) -> str:
    return f"like object created by {self.user} for {self.post_id}"


class CommentPost(models.Model):
  post_id=models.CharField(null=False,blank=False,max_length= 90)
  user= models.IntegerField(null=False,blank=False)
  text= models.TextField(null=True,blank=True)

  def __str__(self) -> str:
    return f"comment object created by {self.user} for {self.post_id}"


  
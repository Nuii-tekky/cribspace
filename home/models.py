from django.db import models
from django.contrib.auth import get_user_model
from PIL import Image


user= get_user_model()

class Profile(models.Model):
  user= models.ForeignKey(user,on_delete=models.CASCADE)
  id_user= models.IntegerField()
  bio= models.TextField(default="this is an empty bio",null=True)
  location= models.CharField(default="somewhere,earth",null= True, max_length= 50)
  occupation= models.CharField(default="cribspace user",null= True, max_length= 50)
  profileimage= models.ImageField(upload_to= "profile_images",default= "default.jpg") 
   
  def __str__(self):
    return self.user.get_username()
    
  def save(self, *args, **kwargs):
    super().save(*args, **kwargs)
    img = Image.open(self.profileimage.path)
    if img.height > 300 or img.width > 300:
      output_size = (300, 300)
      img.thumbnail(output_size)
      img.save(self.image.path)
    


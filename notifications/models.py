from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Notifcations(models.Model):
  user=models.ForeignKey(User,on_delete=models.CASCADE)
  text=models.TextField(max_length=900,null=True)
  notif_type=models.TextField(max_length=100,null=True)
  other_user=models.IntegerField(default=0)
  created_at=models.DateTimeField(auto_now_add=True)

  
from django.db import models


class aboutModel(models.Model):
  title= models.CharField(null=True,blank=True,max_length=26)
  content= models.TextField(null=True,blank=True,max_length=800)
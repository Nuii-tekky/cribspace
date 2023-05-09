
from rest_framework import serializers
from django.contrib.auth import get_user_model

from userprofile.models import Profile
from home.models import aboutModel
from createpost.models import Post

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model= get_user_model()
    fields= '__all__'


class ProfileSerializer(serializers.ModelSerializer):
  user = serializers.PrimaryKeyRelatedField(queryset= get_user_model().objects.all())
  class Meta:
    model= Profile
    fields='__all__'
 

class AboutModelSerialiser(serializers.ModelSerializer):
  class Meta:
    model=aboutModel
    fields='__all__'


class PostModelSerialiser(serializers.ModelSerializer):
  class Meta:
    model=Post
    fields='__all__'
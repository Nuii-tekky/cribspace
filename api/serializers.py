from rest_framework import serializers
from django.contrib.auth import get_user_model

from account.models import Profile
from home.models import aboutModel
from posts.models import (Post,LikePost,CommentPost)

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
  user= serializers.PrimaryKeyRelatedField(queryset= get_user_model().objects.all())
  class Meta:
    model=Post
    fields='__all__'


class LikePostModelSerializer(serializers.ModelSerializer):
  user= serializers.PrimaryKeyRelatedField(queryset= get_user_model().objects.all())
  post_id=serializers.PrimaryKeyRelatedField(queryset=Post.objects.all())
  class Meta:
    model=LikePost
    fields='__all__'


class CommentPostSerializer(serializers.ModelSerializer):
  user= serializers.PrimaryKeyRelatedField(queryset= get_user_model().objects.all())
  post_id=serializers.PrimaryKeyRelatedField(queryset=Post.objects.all())
  class Meta:
    model= CommentPost
    fields='__all__'

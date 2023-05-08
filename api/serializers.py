
from rest_framework import serializers
from auther.models import Profile
from home.models import aboutModel
from django.contrib.auth import get_user_model

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


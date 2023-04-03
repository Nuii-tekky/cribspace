
from rest_framework import serializers
from auth.models import Profile
from django.contrib.auth import get_user_model

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model= get_user_model()
    fields= '__all__'


class ProfileSerializer(serializers.ModelSerializer):
  user = UserSerializer   
  class Meta:
    model= Profile
    fields='__all__'


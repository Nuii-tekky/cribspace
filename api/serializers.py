
from rest_framework import serializers
from home.models import Profile
from django.contrib.auth import get_user_model

class UserSerializer(serializers.ModelSerializer):
  class meta:
    model= get_user_model()
    fields= '__all__'


class ProfileSerializeer(serializers.ModelSerializer):
  user = UserSerializer   
  class meta:
    model= Profile
    fields='__all__'


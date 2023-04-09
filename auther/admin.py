
from django.contrib import admin
from .models import Profile
from django.contrib.auth.models import User

# Register your models here.


class ShowId(admin.ModelAdmin):
  readonly_fields= (["id","id_user"])

admin.site.register(Profile,ShowId)  

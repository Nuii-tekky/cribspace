
from django.contrib import admin
from .models import Profile,FollowerModel

# Register your models here.


class ReadOnlyField(admin.ModelAdmin):
  readonly_fields= (["id"])

class inheritditto(ReadOnlyField):
  readonly_fields= (["id","id_user"])

admin.site.register(Profile,inheritditto)  
admin.site.register(FollowerModel,ReadOnlyField)  

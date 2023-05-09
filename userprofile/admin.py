
from django.contrib import admin
from .models import Profile

# Register your models here.


class ShowId(admin.ModelAdmin):
  readonly_fields= (["id","id_user"])

admin.site.register(Profile,ShowId)  

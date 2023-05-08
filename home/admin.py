
from django.contrib import admin
from .models import aboutModel

# Register your models here.


class ShowId(admin.ModelAdmin):
  readonly_fields= (["id"])

admin.site.register(aboutModel,ShowId)  

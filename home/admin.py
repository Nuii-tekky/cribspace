from django.contrib import admin
from .models import Profile

# Register your models here.


class ShowId(admin.ModelAdmin):
  readonly_fields= (["id"])

admin.site.register(Profile)  
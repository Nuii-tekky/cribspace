from django.contrib import admin
from .models import Notifcations


# Register your models here.
class ShowId(admin.ModelAdmin):
  readonly_fields= (["id","notif_type","other_user"])

admin.site.register(Notifcations,ShowId)

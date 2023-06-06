from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Profile
from notifications.models import Notifcations


@receiver(post_save,sender=User)
def createdefaultprofile(sender, instance, created, **kwargs):
  if created:
    userid=instance.id
    Profile.objects.create(user=instance,id_user=userid)
    message=f"Hi {instance.username},thank you for choosing cribspace"
    Notifcations.objects.create(user=instance,text=message,notif_type="account_default_message")


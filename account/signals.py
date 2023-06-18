from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Profile,FollowerModel
from notifications.models import Notifcations


@receiver(post_save,sender=User)
def usercreatehandler(sender, instance, created, **kwargs):
  if created:
    userid=instance.id
    Profile.objects.create(user=instance,id_user=userid)
    message=f"Hi {instance.username},thank you for choosing cribspace"
    Notifcations.objects.create(user=instance,text=message,notif_type="account_default_message")
  else:
    mess=f"Your profile changes has been saved successfully"  
    Notifcations.objects.create(user=instance,text=mess,notif_type="profile_update")


@receiver(post_save,sender=Profile)
def profileupdatehandler(sender, instance, created, **kwargs):
  if created == False:
    mess=f"Your profile changes has been saved successfully"  
    Notifcations.objects.create(user=instance.user,text=mess,notif_type="profile_update")

@receiver(post_save,sender=FollowerModel)
def incrementprofilefollowercount(sender, instance, created, **kwargs):
  if created:
    follower= instance.follower
    userfollowed= instance.user_followed
    followerprofile= Profile.objects.filter(user=follower)[:1][0]
    followerprofile.no_of_following += 1
    followerprofile.save()

    userfollowedprofile= Profile.objects.filter(user=userfollowed)[:1][0]
    userfollowedprofile.no_of_followers += 1
    userfollowedprofile.save()

    userfollowed_message= f"you have been followed by {follower.username}"
    Notifcations.objects.create(user=userfollowed,text=userfollowed_message,notif_type="follower_notif",other_user=follower.id)


@receiver(post_delete,sender=FollowerModel)
def decreaseprofilefollowercount(sender, instance, **kwargs):
  follower= instance.follower
  userfollowed= instance.user_followed
  followerprofile= Profile.objects.filter(user=follower)[:1][0]
  followerprofile.no_of_following -= 1
  followerprofile.save()

  userfollowedprofile= Profile.objects.filter(user=userfollowed)[:1][0]
  userfollowedprofile.no_of_followers -= 1
  userfollowedprofile.save()

  userunfollowed_message= f"you have been unfollowed by {follower.username}"
  Notifcations.objects.create(user=userfollowed,text=userunfollowed_message,notif_type="follower_notif",other_user=follower.id)
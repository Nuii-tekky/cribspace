from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Post
from .models import LikePost,CommentPost
from notifications.models import Notifcations

"""

these signals are here for updating fields in the parent app's models 
and creating notifications for same

"""

@receiver(post_save,sender=LikePost)
def addlikecount(sender, instance, created, **kwargs):
  if created:
    postid=instance.post_id
    postinstance= Post.objects.filter(id=postid)[:1][0]
    postinstance.no_of_likes += 1
    postinstance.save()
    if postinstance.user != instance.user:
      message=f"{instance.user.username} liked your post"
      Notifcations.objects.create(user=instance,text=message,notif_type="react_notif",other_user=instance.user.id)

@receiver(post_delete,sender=LikePost)
def subtractlikecount(sender, instance,**kwargs):
  postid=instance.post_id
  postinstance= Post.objects.filter(id=postid)[:1][0]
  postinstance.no_of_likes -= 1
  postinstance.save()
  if postinstance.user != instance.user:
    message=f"{instance.user.username} unliked your post"
    Notifcations.objects.create(user=instance,text=message,notif_type="react_notif",other_user=instance.user.id)



@receiver(post_save,sender=LikePost)
def updatelikecount(sender, instance, created, **kwargs):
  if created:
    postid=instance.post_id
    postinstance= Post.objects.filter(id=postid)[:1][0]
    postinstance.no_of_likes += 1
    postinstance.save()
    if postinstance.user != instance.user:
      message=f"{instance.user.username} liked your post"
      Notifcations.objects.create(user=instance,text=message,notif_type="react_notif",other_user=instance.user.id)

@receiver(post_delete,sender=LikePost)
def updatelikecount(sender, instance,**kwargs):
  postid=instance.post_id
  postinstance= Post.objects.filter(id=postid)[:1][0]
  postinstance.no_of_likes -= 1
  postinstance.save()
  if postinstance.user != instance.user:
    message=f"{instance.user.username} unliked your post"
    Notifcations.objects.create(user=instance,text=message,notif_type="react_notif",other_user=instance.user.id)    
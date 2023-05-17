
from django.contrib import admin
from .models import Post,LikePost,CommentPost,FollowerUser

# Register your models here.


class ShowId(admin.ModelAdmin):
  readonly_fields= (["id"])

admin.site.register(Post,ShowId)  
admin.site.register(LikePost,ShowId)  
admin.site.register(CommentPost,ShowId)  
admin.site.register(FollowerUser,ShowId)  

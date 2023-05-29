
from django.contrib import admin
from .models import Post,LikePost,CommentPost
# Register your models here.


class ShowId(admin.ModelAdmin):
  readonly_fields= (["id"])

class showwidModified(ShowId):
  readonly_fields=(["id","imagesize"])


admin.site.register(Post,showwidModified
)  
admin.site.register(LikePost,ShowId)  
admin.site.register(CommentPost,ShowId)  

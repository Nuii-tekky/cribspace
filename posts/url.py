from django.urls import path
from . import views

urlpatterns=[
  path('createpost',views.rendercreatepostpage,name="createpostpage"),
  path('viewpost/postid=<str:id>',views.renderpostdetail,name="postdetailpage"),
]
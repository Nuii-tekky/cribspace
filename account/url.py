from django.urls import path
from . import views

urlpatterns=[
  path('settings',views.renderaccountsettingpage,name="accountsettingpage"),
  path('viewprofile/<int:userid>/username=<str:username>',views.renderprofilepage,name="profilepage")
]
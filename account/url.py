from django.urls import path
from . import views

urlpatterns=[
  path('settings',views.renderaccountsettingpage,name="accountsettingpage"),
  path('viewprofile',views.renderprofilepage,name="profilepage")
]
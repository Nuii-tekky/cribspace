from django.urls import path,include
from . import views


urlpatterns = [  
    path('signup',views.rendersignup,name='signupform'),
    path('signup',views.renderlogin,name= "loginform")
]
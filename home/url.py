from django.urls import path,include
from . import views


urlpatterns = [  
    path('signup',views.rendersignup,name='signupform'),
    path('login',views.renderlogin,name= "loginform"),
    path('logout',views.renderlogout,name="logout")
]
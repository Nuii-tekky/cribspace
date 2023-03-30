from django.urls import path,include
from . import views


urlpatterns = [  
    path('auth/signup',views.rendersignup,name='signuppage'),
    path('auth/login',views.renderlogin,name= "loginpage"),
    path('auth/logout',views.renderlogout,name="logoutpage"),
    path('auth/authuser',views.authuser,name="authuser"),
    path('auth/redirector',views.renderredirector,name="redirectpage"),
    path('auth/userprompt',views.renderprompt,name="userpromptpage")
]
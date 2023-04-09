from django.urls import path,include
from . import views


urlpatterns = [  
    path('signup',views.rendersignup,name='signuppage'),
    path('login',views.renderlogin,name= "loginpage"),
    path('authuser',views.authuser,name="authuser"),
    path('redirector',views.renderredirector,name="redirectpage"),
    path('userprompt',views.renderprompt,name="userpromptpage")
]
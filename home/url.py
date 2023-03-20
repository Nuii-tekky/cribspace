from django.urls import path,include
from . import views


urlpatterns = [  
    path('testing',views.test,name="null")
]
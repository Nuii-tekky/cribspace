from django.urls import path
from . import views

urlpatterns=[
  path('aboutcribspace',views.renderaboutpage,name="aboutpage"),
  path('help&support',views.renderfeedbackpage,name="feedbackpage")
]
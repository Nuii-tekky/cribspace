from django.urls import path
from . import views

urlpatterns=[
  path('createpost',views.renderaboutpage,name="aboutpage"),
  path('viewpost/?id=<int:id>',views.renderfeedbackpage,name="feedbackpage")
]
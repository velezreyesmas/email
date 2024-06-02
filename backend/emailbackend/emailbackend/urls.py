"""
URL configuration for emailbackend project.
"""
#Django 
from django.contrib import admin
from django.urls import path

#Local
from email_userstories.views import SendEmailView, RecievedEmailView, RegisterUserView, LoginUserView, LogoutView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register/',RegisterUserView.as_view(),name='register'),
    path('api/login/',LoginUserView.as_view(), name='login'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/send-email/', SendEmailView.as_view(),name='send_email'),
    path('api/recieve-email/<str:email>/',RecievedEmailView.as_view(), name='received_email'),
]

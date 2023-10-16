from django.contrib import admin
from django.urls import path , include
from tweet_app import views

urlpatterns = [
    path('home/', views.home , name="home_page"),
    path("test/" , views.test , name="test_page"),
    path("login_page/" , views.login_view , name="login_page"),
    path('buttons_clicked/<int:pk>/', views.buttons_clicked, name='buttons_clicked')
]


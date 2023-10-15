from django.contrib import admin
from django.urls import path , include
from tweet_app import views

urlpatterns = [
    path('home/', views.home , name="home_page"),
    path("test/" , views.test , name="test_page"),
    # path("test2/" , views.test2 , name="test2")
]


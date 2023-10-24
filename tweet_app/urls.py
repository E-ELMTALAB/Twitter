from django.contrib import admin
from django.urls import path , include
from tweet_app import views
from django.http import HttpResponseRedirect

urlpatterns = [
    # path("" , lambda request: HttpResponseRedirect('login_page/') , name="first_page"),
    path('home/', views.home , name="home_page"),
    path("login_page/" , views.login_view , name="login_page"),
    path('like_post/', views.like_post, name='like_post'),
    path("profile_page/" , views.profile_view , name="profile_page"),
    path("send_comment/" , views.send_comment , name="send_comment"),
    path('send_tweet/', views.send_tweet, name='send_tweet'),
    path('send_follow_request/', views.send_follow_request, name='send_follow_request'),
    path('delete_tweet/', views.delete_tweet, name='delete_tweet')
]


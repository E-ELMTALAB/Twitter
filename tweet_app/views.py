from django.shortcuts import render
from .models import Tweet

# Create your views here.
def home(request):
    tweets = Tweet.objects.select_related("user").all()
    for tweet in tweets:
        print("\n")
        print(tweet.user.profile_picture_path.url)
        print("\n")
    # object = Tweet.objects.get(user_id=1)
    # print(tweets)
    context = {
        "tweets" : tweets
    }
    return render(request , "tweet_app/home.html" , context=context)

def test(request):
    return render(request , "tweet_app/test.html")

# def test2(request):
#     return render(request , "tweet_app/social_network_wall.html")
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

def login_view(request):
    # Process the form and authentication logic
    if request.method == 'POST':
        # ...
        if user_is_authenticated:  # Replace with your authentication logic
            return HttpResponseRedirect(reverse('profile'))  # Redirect to the 'profile' URL
        else:
            # Handle authentication failure
    else:
        form = LoginForm()

    context = {
        'form': form,
    }
    
    return render(request, 'login.html', context)

# def test2(request):
#     return render(request , "tweet_app/social_network_wall.html")
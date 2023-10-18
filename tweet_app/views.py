from django.shortcuts import render , redirect
from .models import Tweet
from .forms import LoginForm
from django.contrib.auth import login, authenticate
from .models import User , Followers , Tweet
from django.views.decorators.http import require_POST

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
    return render(request , r"tweet_app\test.html")

# def login_view(request):
#     # Process the form and authentication logic
#     if request.method == 'POST':
#         # ...
#         if user_is_authenticated:  # Replace with your authentication logic
#             return HttpResponseRedirect(reverse('profile'))  # Redirect to the 'profile' URL
#         else:
#             # Handle authentication failure
#             pass
#     else:
#         form = LoginForm()

#     context = {
#         'form': form,
#     }
    
#     return render(request, 'login.html', context)

def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            # user = form.save()
            email = form.cleaned_data.get("email")
            password = form.cleaned_data.get('password')
            print("\n")
            print("the password is :", password)
            print("the email is : ",email)
            # user = authenticate(request, email=email, password=password)
            user = User.objects.get(email=email)
            real_password= user.password
            print("the user is :", user)
            if real_password==password:
                print("this user is authenticated")
            # if user is not None:
                login(request, user)
                # return render(request , 'tweet_app/login_confirm.html' , {'request' : request})
                return redirect("home_page")
            else:
                print("user is not authenticated")
    else:
        form = LoginForm()
    return render(request, 'tweet_app/login_page.html', {'form': form})

@require_POST
def buttons_clicked(request , pk):
    print(" a button is clicked")
    if request.method == 'POST':
        for key, value in request.POST.items():
            print(f'Key: {key}, Value: {value}')

    tweets = Tweet.objects.select_related("user").all()
    context = {
        "tweets" : tweets
    }
    return render(request , "tweet_app/home.html" , context=context)
    
def profile_view(request):
    date_joined = request.user.date_joined.strftime("%Y %B")
    followers_count = Followers.objects.filter(follower=request.user.id).count()
    following_count = Followers.objects.filter(following=request.user.id).count()
    tweets = Tweet.objects.filter(user_id=request.user.id)

    context = {"request" : request ,
                "date_joined" : date_joined ,
                "followers_count" : followers_count,
                "following_count" : following_count ,
                "tweets" : tweets }

    return render(request , "tweet_app/profile_page.html" , context)

from django.shortcuts import render , redirect
from .models import Tweet
from .forms import LoginForm
from django.contrib.auth import login, authenticate
from .models import User , Followers , Tweet , Comment , Like , PersonRecommendation
from django.views.decorators.http import require_POST
from django.http import JsonResponse , HttpResponse
from .forms import TweetForm
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
@csrf_exempt
def home(request):

    user_agent = request.META.get('HTTP_USER_AGENT', '').lower()
    is_mobile = 'mobile' in user_agent or 'android' in user_agent
    if is_mobile:
        print("the user is sending request with a mobile phone")
    else:
        print("the user is sending requeset with a computer ")

    tweets = Tweet.objects.select_related("user").all()
    comments = Comment.objects.select_related("user").all()
    recommendations = PersonRecommendation.objects.filter(to_user_id = request.user.id).select_related("from_user").all()
    recommendations = [user.from_user_id for user in recommendations]
    recoms = []
    for recom in recommendations:
        user = User.objects.get(id = recom)
        recoms.append(user)

    liked_tweets = Like.objects.filter(user_id=request.user.id)
    liked_tweets = [tweets.tweet_id for tweets in liked_tweets]

    followed = Followers.objects.filter(follower_id=request.user.id)
    followings = [follow.following_id for follow in followed]

    print("the liked numbers :" , str(liked_tweets))
    print("the recommendations : " , str(recoms))
    # print("the username is :", recoms[0])

    context = {
        "tweets" : tweets ,
        "comments" : comments , 
        "liked_tweets" : liked_tweets , 
        "recoms" : recoms ,
        "followings" : followings
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
@csrf_exempt
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

def profile_view(request):
    date_joined = request.user.date_joined.strftime("%Y %B")
    followers_count = Followers.objects.filter(follower=request.user.id).count()
    following_count = Followers.objects.filter(following=request.user.id).count()
    tweets = Tweet.objects.filter(user_id=request.user.id)
    liked_tweets = Like.objects.filter(user_id=request.user.id)
    liked_tweets = [tweets.tweet_id for tweets in liked_tweets]
    recommendations = PersonRecommendation.objects.filter(to_user_id = request.user.id).select_related("from_user").all()
    recommendations = [user.from_user_id for user in recommendations]
    recoms = []
    for recom in recommendations:
        user = User.objects.get(id = recom)
        recoms.append(user)

    context = {"request" : request ,
                "date_joined" : date_joined ,
                "followers_count" : followers_count,
                "following_count" : following_count ,
                "tweets" : tweets,
                "recoms" : recoms ,
                "liked_tweets" : liked_tweets  
                }

    return render(request , "tweet_app/profile_page.html" , context)

@require_POST
def like_post(request):
    print(" like button is clicked")
    if request.method == 'POST':
        user_id = request.POST.get("user_id")
        tweet_id = request.POST.get("tweet_id")
        print("the user id is :" , user_id)
        print("the tweet id is :" , tweet_id)

        likes = Like.objects.filter(user_id=user_id , tweet_id=tweet_id)
        if likes.exists() :
            print("about to delete the like")
            print(likes)
            likes.delete()
        else:
            print("going to make the like")
            like = Like(user_id=user_id , tweet_id=tweet_id)
            like.save()

    return HttpResponse(status=204)
    
@require_POST
def send_comment(request):
    print(" a comment is sent")
    if request.method == 'POST':
        comment = request.POST.get('comment')
        tweet_id = request.POST.get('tweet_id')
        user_id = request.POST.get('user_id')
        print("the comment is :" , comment)
        print("the id of the tweet is :",tweet_id)
        print("the user id of the tweet is :" , user_id)
        comment = Comment(user_id=user_id , tweet_id=tweet_id , content=comment)
        comment.save()

    # tweets = Tweet.objects.select_related("user").all()
    # context = {
    #     "tweets" : tweets
    # }
    return JsonResponse({"message":"the comment was received successfully"})

@require_POST
def send_tweet(request):
    if request.method == 'POST':
        print("a tweet has been sent")
        user_id = request.POST.get("user")
        file = request.POST.get("image")
        text = request.POST.get("text")
        print(request.FILES)
        print("the user id is :", user_id)
        print("the file uploaded is :",file)
        print("the text of the tweet is :",text)
        form = TweetForm(request.POST, request.FILES)
        if form.is_valid():
            # file is saved
            print("the forms is valid ")
            form.save()
            # return HttpResponse("the tweet information receieved successfuly")
            return redirect("home_page")
        
@require_POST
def send_follow_request(request):
    if request.method == 'POST':
        print("a tweet has been sent")
        user_id = request.POST.get("user_id")

        followers = Followers.objects.filter(follower_id=request.user.id , following_id=user_id)
        if followers.exists() :
            print("about to delete the follow")
            print(followers)
            followers.delete()
        else:
            print("going to follow a user")
            follow = Followers(follower_id=request.user.id , following_id=user_id)
            follow.save()



        print("the user id is :", user_id)
    
    return HttpResponse(status=204)

@require_POST
def delete_tweet(request):
    if request.method == 'POST':
        print("a tweet is going to be deleted")
        tweet_id = request.POST.get("tweet_id")
        print("the tweet id is :", tweet_id)
        tweet = Tweet.objects.get(tweet_id=tweet_id)
        tweet.delete()
    
        return redirect("profile_page")

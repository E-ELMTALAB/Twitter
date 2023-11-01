from django.shortcuts import render , redirect
from .models import Tweet
from .forms import LoginForm
from django.contrib.auth import login, authenticate
from .models import User , Followers , Tweet , Comment , Like , PersonRecommendation 
from django.views.decorators.http import require_POST
from django.http import JsonResponse , HttpResponse
from .forms import TweetForm , UserRegistrationForm , ProfileForm
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator

# Create your views here.
@csrf_exempt
def home(request):

    print(request.path)

    user_agent = request.META.get('HTTP_USER_AGENT', '').lower()
    is_mobile = 'mobile' in user_agent or 'android' in user_agent
    if is_mobile:
        print("the user is sending request with a mobile phone")
    else:
        print("the user is sending requeset with a computer ")

    # tweets = Tweet.objects.select_related("user").all()
    # paginator = Paginator(tweets, 5)  # Number of tweets per page
    tweets = Tweet.objects.select_related("user").order_by('timestamp').all()
    # Reverse the order of the tweets on this page
    tweets = list(reversed(list(tweets)))
    paginator = Paginator(tweets, 3)  # Number of tweets per page
    page = request.GET.get('page')
    tweets = paginator.get_page(page)

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


def load_tweets(request , num_tweets):

    num_tweets_to_load = 5
    upper = num_tweets
    lower = upper - num_tweets_to_load
    tweets = Tweet.objects.all()[lower:upper]
    tweets = [tweet.to_dict() for tweet in tweets]
    
    return JsonResponse({"data" : tweets})










@csrf_exempt
def signup_view(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            # user = form.save()
            email = form.cleaned_data.get("email")
            password = form.cleaned_data.get('password')
            print("\n")
            print("the password is :", password)
            print("the email is : ",email)
            # user = authenticate(request, email=email, password=password)
            form.save()

            return redirect("home_page")
        else:
            print("the form is not valid")
            for field, errors in form.errors.items():
                print(f"Field: {field}")
                for error in errors:
                    print(f"Error: {error}")
    else:
        form = UserRegistrationForm()
    return render(request, 'tweet_app/signup_page.html')


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
    return render(request, 'tweet_app/login_page.html')

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

def recom_people(request):

    recommendations = PersonRecommendation.objects.filter(to_user_id = request.user.id).select_related("from_user").all()
    recommendations = [user.from_user_id for user in recommendations]
    recoms = []
    for recom in recommendations:
        user = User.objects.get(id = recom)
        recoms.append(user)
    followed = Followers.objects.filter(follower_id=request.user.id)
    followings = [follow.following_id for follow in followed]

    context = {
        "recoms" : recoms ,
        "followings" : followings
    }

    return render(request , "tweet_app/recom_people.html" , context=context)

@require_POST
@csrf_exempt
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
@csrf_exempt
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
@csrf_exempt
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
    return redirect("home_page")
        
        
@require_POST
@csrf_exempt
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
    
# @require_POST
# def edit_profile(request):

#     if request.method == 'POST':
#         print("the user profile is going to be edited")
#         user_id = request.POST.get("user")
#         new_username = request.POST.get("username")
#         new_name = request.POST.get("name")
#         new_profile_picture = request.FILES
#         print("the user id is :", user_id)
#         print("the new username is :", new_username)
#         print("the new name is :", new_name)
#         print("the new profile picture is :", new_profile_picture)

#         user = User.objects.get(id=user_id )
#         user.username = new_username
#         user.name = new_name
#         user.profile_picture_path = new_profile_picture
#         user.save()

#         return redirect("profile_page")
    

@require_POST
@csrf_exempt
def edit_profile(request):
    if request.method == 'POST':
        user_id = request.POST.get("id")
        user = User.objects.get(id=user_id)
        form = ProfileForm(request.POST, request.FILES , instance=user)
        print("the profile is about to change ")
        if form.is_valid():
            print("i confirm the form validatoin")
            user_id = form.cleaned_data.get("id")
            new_username = form.cleaned_data.get("username")
            new_name = form.cleaned_data.get("name")
            new_profile_picture = form.cleaned_data.get("profile_picture")

            # user = User.objects.get(id=user_id)
            user.username = new_username
            user.name = new_name

            if new_profile_picture:
                user.profile_picture_path = new_profile_picture.name


            user.save()
            return redirect("profile_page")
        else:
            # Form is not valid, access and handle errors
            errors = form.errors  # This is a dictionary of errors

            # For example, you can log the errors
            for field, error_list in errors.items():
                for error in error_list:
                    # Log or handle the error as needed
                    print(f"Error in {field}: {error}")

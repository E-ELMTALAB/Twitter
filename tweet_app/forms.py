from django import forms
from tweet_app.models import User , Tweet
from .models import MediaFile

class LoginForm(forms.Form):
    # username = forms.CharField(max_length=50 , required=True , help_text="provide your username")
    email = forms.EmailField(max_length=254, required=True, help_text='Enter your email address')
    password = forms.CharField(help_text='provide Password', required=True, widget=forms.PasswordInput)

    class Meta():
        model = User
        fields = ("email" , "password")


class MediaFileForm(forms.ModelForm):
    class Meta:
        model = MediaFile
        fields = ['file']

class TweetForm(forms.ModelForm):
    # tweet_text = forms.CharField(max_length=5000 , required=True , help_text="write a text for the tweet")
    # image = forms.ImageField(required=False)
    # video = forms.FileField(required=False)
    # user_id = forms.CharField(max_length=5 , required=True)
    class Meta():
        model = Tweet
        fields = ['user', 'text', 'image' ]
        exclude = ['tweet_id', 'text_label', 'image_label', 'video_label', 'timestamp', 'likes_count', 'retweets_count', 'comments_count', 'is_retweet' , 'video']
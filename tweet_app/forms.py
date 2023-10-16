from django import forms
from tweet_app.models import User

class LoginForm(forms.Form):
    # username = forms.CharField(max_length=50 , required=True , help_text="provide your username")
    email = forms.EmailField(max_length=254, required=True, help_text='Enter your email address')
    password = forms.CharField(help_text='provide Password', required=True, widget=forms.PasswordInput)

    class Meta():
        model = User
        fields = ("email" , "password")
from django import forms
from tweet_app.models import User

class LoginForm(forms.Form):
    email = forms.EmailField(max_length=254, required=True, help_text='Enter your email address')
    password = forms.CharField(widget=forms.PasswordInput, required=True, help_text='Enter your password')

    class Meta():
        model = User
        fields = ("username" , "email" , "password")
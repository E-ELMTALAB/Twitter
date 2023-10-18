from django.contrib import admin
from tweet_app.models import Followers , Comment

# Register your models here.

admin.site.register(Followers)
admin.site.register(Comment)
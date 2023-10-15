from django.db import models
from django.contrib import admin
# from .models import MyModel

# Create your models here.

class User(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    date_of_birth = models.DateField(null=True, blank=True)
    profile_picture_path = models.ImageField(upload_to='profile_pictures_path/', null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    followers_count = models.PositiveIntegerField(default=0)
    following_count = models.PositiveIntegerField(default=0)
    location = models.CharField(max_length=100, null=True, blank=True)
    tweet_count = models.PositiveIntegerField(default=0)
    social_label = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return self.username
    
class Tweet(models.Model):
    tweet_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Assuming you have a User model
    text = models.TextField()
    text_label = models.CharField(max_length=255, null=True, blank=True)
    image = models.ImageField(upload_to='tweet_images/', null=True, blank=True)
    image_label = models.CharField(max_length=255, null=True, blank=True)
    video = models.FileField(upload_to='tweet_videos/', null=True, blank=True)
    video_label = models.CharField(max_length=255, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    likes_count = models.PositiveIntegerField(default=0)
    retweets_count = models.PositiveIntegerField(default=0)
    comments_count = models.PositiveIntegerField(default=0)
    is_retweet = models.BooleanField(default=False)

    def __str__(self):
        return f"Tweet by {self.user.username} at {self.timestamp}"
    
class Followers(models.Model):
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='following_set')
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followers_set')

    class Meta:
        unique_together = ['follower', 'following']

    def __str__(self):
        return f'{self.follower.username} follows {self.following.username}'
    

class Retweet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tweet = models.ForeignKey('Tweet', on_delete=models.CASCADE)  # Assuming 'Tweet' is the name of your Tweet model
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'tweet']

    def __str__(self):
        return f'{self.user.username} retweeted {self.tweet}'

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tweet = models.ForeignKey('Tweet', on_delete=models.CASCADE)  # Assuming 'Tweet' is the name of your Tweet model
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'tweet']

    def __str__(self):
        return f'{self.user.username} liked {self.tweet}'

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tweet = models.ForeignKey('Tweet', on_delete=models.CASCADE)  # Assuming 'Tweet' is the name of your Tweet model
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} commented on {self.tweet}'
    
class PersonRecommendation(models.Model):
    from_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_recommendations')
    to_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_recommendations')

    # You can include additional fields such as a message, timestamp, or recommendation type.

    def __str__(self):
        return f'{self.from_user.username} recommends {self.to_user.username}'

class ContentRecommendation(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE)  # Assuming 'User' is the name of your User model
    tweet = models.ForeignKey('Tweet', on_delete=models.CASCADE)  # Assuming 'Tweet' is the name of your Tweet model

    # You can include additional fields such as a message, timestamp, or recommendation type.

    def __str__(self):
        return f'{self.user.username} recommends a tweet'
    
class Trend(models.Model):
    name = models.CharField(max_length=255, unique=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    # You can include additional fields such as a description or trend type.

    def __str__(self):
        return self.name
    

admin.site.register(User)
admin.site.register(Tweet)

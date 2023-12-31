# Generated by Django 4.2.5 on 2023-10-14 10:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Trend',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=50, unique=True)),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('date_of_birth', models.DateField(blank=True, null=True)),
                ('profile_picture', models.ImageField(blank=True, null=True, upload_to='profile_pictures/')),
                ('bio', models.TextField(blank=True, null=True)),
                ('followers_count', models.PositiveIntegerField(default=0)),
                ('following_count', models.PositiveIntegerField(default=0)),
                ('location', models.CharField(blank=True, max_length=100, null=True)),
                ('tweet_count', models.PositiveIntegerField(default=0)),
                ('social_label', models.CharField(blank=True, max_length=50, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Tweet',
            fields=[
                ('tweet_id', models.AutoField(primary_key=True, serialize=False)),
                ('text', models.TextField()),
                ('text_label', models.CharField(blank=True, max_length=255, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='tweet_images/')),
                ('image_label', models.CharField(blank=True, max_length=255, null=True)),
                ('video', models.FileField(blank=True, null=True, upload_to='tweet_videos/')),
                ('video_label', models.CharField(blank=True, max_length=255, null=True)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('likes_count', models.PositiveIntegerField(default=0)),
                ('retweets_count', models.PositiveIntegerField(default=0)),
                ('comments_count', models.PositiveIntegerField(default=0)),
                ('is_retweet', models.BooleanField(default=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tweet_app.user')),
            ],
        ),
        migrations.CreateModel(
            name='PersonRecommendation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('from_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_recommendations', to='tweet_app.user')),
                ('to_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='received_recommendations', to='tweet_app.user')),
            ],
        ),
        migrations.CreateModel(
            name='ContentRecommendation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tweet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tweet_app.tweet')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tweet_app.user')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('tweet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tweet_app.tweet')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tweet_app.user')),
            ],
        ),
        migrations.CreateModel(
            name='Retweet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('tweet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tweet_app.tweet')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tweet_app.user')),
            ],
            options={
                'unique_together': {('user', 'tweet')},
            },
        ),
        migrations.CreateModel(
            name='Like',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('tweet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tweet_app.tweet')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tweet_app.user')),
            ],
            options={
                'unique_together': {('user', 'tweet')},
            },
        ),
        migrations.CreateModel(
            name='Followers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('follower', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='following_set', to='tweet_app.user')),
                ('following', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='followers_set', to='tweet_app.user')),
            ],
            options={
                'unique_together': {('follower', 'following')},
            },
        ),
    ]

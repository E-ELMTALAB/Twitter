# Generated by Django 4.2.5 on 2023-10-16 08:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tweet_app', '0009_alter_user_password'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='password',
            field=models.CharField(max_length=15, unique=True),
        ),
    ]

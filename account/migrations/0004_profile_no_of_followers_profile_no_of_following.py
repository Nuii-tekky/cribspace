# Generated by Django 4.2 on 2023-05-29 06:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0003_alter_followeruser_follower'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='no_of_followers',
            field=models.BigIntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='no_of_following',
            field=models.BigIntegerField(blank=True, null=True),
        ),
    ]

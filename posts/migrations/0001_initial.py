# Generated by Django 4.2 on 2023-05-11 04:31

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('user', models.IntegerField()),
                ('image', models.ImageField(blank=True, null=True, upload_to='post-images')),
                ('caption', models.TextField(blank=True, max_length=3000, null=True)),
                ('no_of_likes', models.BigIntegerField(default=0)),
                ('no_of_comments', models.BigIntegerField(default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]

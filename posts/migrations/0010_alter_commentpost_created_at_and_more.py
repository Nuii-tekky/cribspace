# Generated by Django 4.2 on 2023-05-23 05:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0009_commentpost_created_at_likepost_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='commentpost',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='likepost',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
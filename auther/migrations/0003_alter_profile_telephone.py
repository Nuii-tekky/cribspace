# Generated by Django 4.1.7 on 2023-04-07 20:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auther', '0002_profile_telephone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='telephone',
            field=models.BigIntegerField(default='01010101010010101', null=True),
        ),
    ]

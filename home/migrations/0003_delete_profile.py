# Generated by Django 4.1.7 on 2023-04-03 18:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0002_alter_profile_bio_alter_profile_location_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Profile',
        ),
    ]
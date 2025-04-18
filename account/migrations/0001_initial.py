# Generated by Django 4.2 on 2023-05-11 04:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_user', models.IntegerField()),
                ('bio', models.TextField(default='i am a cribspace user', null=True)),
                ('location', models.CharField(default='somewhere,earth', max_length=50, null=True)),
                ('occupation', models.CharField(default='cribspace user', max_length=50, null=True)),
                ('telephone', models.BigIntegerField(default=10101010101, null=True)),
                ('profileimage', models.ImageField(default='defaullt.jpg', upload_to='profile_images')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

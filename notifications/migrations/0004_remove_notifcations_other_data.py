# Generated by Django 4.2 on 2023-06-06 21:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0003_notifcations_other_data'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='notifcations',
            name='other_data',
        ),
    ]

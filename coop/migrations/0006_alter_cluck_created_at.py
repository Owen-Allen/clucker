# Generated by Django 3.2.20 on 2023-09-28 23:37

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('coop', '0005_alter_user_email'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cluck',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2023, 9, 28, 19, 37, 38, 697065)),
        ),
    ]
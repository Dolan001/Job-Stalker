# Generated by Django 4.1.4 on 2023-01-16 09:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('job', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='jobmodel',
            name='point',
        ),
        migrations.AddField(
            model_name='jobmodel',
            name='map',
            field=models.CharField(max_length=355, null=True),
        ),
    ]
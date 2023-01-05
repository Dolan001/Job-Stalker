# Generated by Django 4.1.4 on 2023-01-05 07:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_remove_userprofilemodel_image_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofilemodel',
            name='image',
            field=models.ImageField(null=True, upload_to='image'),
        ),
        migrations.AlterField(
            model_name='userprofilemodel',
            name='resume',
            field=models.FileField(null=True, upload_to='resume'),
        ),
    ]
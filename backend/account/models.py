from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import pre_save, post_save


class UserProfileModel(models.Model):
    user = models.OneToOneField(User, related_name='userprofile', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='image', null=True)
    resume = models.FileField(upload_to='resume', null=True)


@receiver(post_save, sender=User)
def save_profile(sender, instance, created, **kwargs):

    user = instance
    if created:
        profile = UserProfileModel(user=user)
        profile.save()

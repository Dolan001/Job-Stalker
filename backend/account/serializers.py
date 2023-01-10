from django.contrib.auth.models import User

from rest_framework import serializers

from .models import *


class SignUpSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'first_name',
            'last_name',
            'email',
            'password'
        )
        extra_kwargs = {
            'first_name': {
                'required': True, 'allow_blank': False
            },
            'last_name': {
                'required': True, 'allow_blank': False
            },
            'email': {
                'required': True, 'allow_blank': False
            },
            'password': {
                'required': True, 'allow_blank': False,'min_length': 6
            }
        }


class UserSerializer(serializers.ModelSerializer):

    resume = serializers.CharField(source='userprofile.resume', read_only=True)
    image = serializers.CharField(source='userprofile.image', read_only=True)

    class Meta:
        model = User
        fields = (
            'first_name',
            'last_name',
            'email',
            'username',
            'image',
            'resume',
        )


class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfileModel
        fields = '__all__'

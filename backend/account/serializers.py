from django.contrib.auth.models import User

from rest_framework import serializers

from .models import *


class SignUpSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'email',
            'password'
        )
        extra_kwargs = {
            'username': {
                'required': True, 'allow_blank': False
            },
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

    profile_id = serializers.IntegerField(source='userprofile.id', read_only=True)
    resume = serializers.CharField(source='userprofile.resume', read_only=True)
    image = serializers.CharField(source='userprofile.image', read_only=True)

    class Meta:
        model = User
        fields = (
            'id',
            'profile_id',
            'first_name',
            'last_name',
            'email',
            'username',
            'image',
            'resume',
        )


class UserProfileSerializer(serializers.ModelSerializer):

    # user = serializers.SerializerMethodField()


    class Meta:
        model = UserProfileModel
        fields = '__all__'

    # def get_user(self, obj):
    #     request = self.context.get('request', None)
    #     print(request.user.username )
    #     if request:
    #         return request.user.id   

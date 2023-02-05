from django.shortcuts import render
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User

from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework import status, permissions, authentication
from rest_framework_simplejwt import authentication

from .serializers import *
from .models import *


class RegisterViewSet(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        data = request.data
        username = request.data.get('username')
        if User.objects.filter(username=username).exists():
            return Response({'error': 'User Already Exists'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = SignUpSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        User.objects.create(
            username=data['username'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            password=make_password(data['password'])
        )
        return Response({'detail': 'User Registered'}, status=status.HTTP_201_CREATED)

        # if not User.objects.filter(username=data['username']).exists():
        #     user = User.objects.create(
        #         username=data['username'],
        #         first_name=data['first_name'],
        #         last_name=data['last_name'],
        #         email=data['email'],
        #         password=make_password(data['password'])
        #     )
        #     serializer = UserSerializer(user)
        #     return Response({'details': 'User Registered'}, status=status.HTTP_201_CREATED)
        # else:
        #     return Response({'error': 'User Already Exists'}, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes=[authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def my_profile(self, request):
        serializer = UserSerializer(request.user)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        instance = User.objects.get(username=request.user.username)
        serializer = UserSerializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)



class UserProfileViewSet(ModelViewSet):
    queryset = UserProfileModel.objects.all()
    serializer_class = UserProfileSerializer
    authentication_classes = [authentication.JWTAuthentication,]
    permission_classes = [permissions.IsAuthenticated]
    

    def update(self, request, *args, **kwargs):
        username = User.objects.get(username=request.user.username)
        serializer = UserProfileSerializer(username, data=request.data, partial=True)
        if serializer.is_valid():
            print(serializer)
            serializer.save()
            return Response({"success": 'Resume uploaded'}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Something went wrong when saving resume"})


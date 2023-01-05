from django.shortcuts import render
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User

from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework import status, permissions

from .serializers import *


class RegisterViewSet(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        data = request.data
        serializer = SignUpSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        if not User.objects.filter(username=data['email']).exists():
            user = User.objects.create(
                first_name=data['first_name'],
                last_name=data['last_name'],
                username=data['username'],
                email=data['email'],
                password=make_password(data['password'])
            )
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({'details': 'User Already Exists'}, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def current_user(self, request):
        serializer = UserSerializer(request.user)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def upload_resume(self, request):
        user = request.user
        resume = request.FILES['resume']
        if resume == '':
            return Response({"error": "Please upload your resume"})

        user.userprofile.resume = resume
        user.userprofile.save()

        serializer = UserSerializer(user, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

from rest_framework import permissions


class IsAuthorOrIsAuthenticated(permissions.BasePermission):

    def has_permission(self, request, view):
        return bool(request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return bool(request.user)
        return obj.user == request.user

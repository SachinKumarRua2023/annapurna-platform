"""accounts/views.py"""

from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from django.db import transaction

from .models import Address
from .serializers import (
    UserSerializer, RegisterSerializer, LoginSerializer,
    SupabaseAuthSerializer, AddressSerializer,
    ChangePasswordSerializer, CustomTokenObtainPairSerializer
)

User = get_user_model()


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    refresh['email'] = user.email
    refresh['role']  = user.role
    refresh['name']  = user.full_name
    return {
        'refresh': str(refresh),
        'access':  str(refresh.access_token),
    }


class RegisterView(generics.CreateAPIView):
    """POST /api/auth/register/"""
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        tokens = get_tokens_for_user(user)
        return Response({
            'user': UserSerializer(user).data,
            **tokens,
        }, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    """POST /api/auth/login/"""
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        tokens = get_tokens_for_user(user)
        return Response({
            'user': UserSerializer(user).data,
            **tokens,
        })


class SupabaseAuthView(APIView):
    """
    POST /api/auth/supabase/
    Called after Google OAuth via Supabase — creates or retrieves Django user.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = SupabaseAuthSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        user, created = User.objects.get_or_create(
            supabase_uid=data['supabase_uid'],
            defaults={
                'email':     data['email'],
                'full_name': data.get('full_name', ''),
                'is_verified': True,
            }
        )

        # Update email if changed
        if not created and user.email != data['email']:
            user.email = data['email']
            user.save(update_fields=['email'])

        tokens = get_tokens_for_user(user)
        return Response({
            'user': UserSerializer(user).data,
            'created': created,
            **tokens,
        }, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)


class LogoutView(APIView):
    """POST /api/auth/logout/"""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data['refresh']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({'message': 'Logged out successfully.'})
        except Exception:
            return Response({'error': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)


class ProfileView(generics.RetrieveUpdateAPIView):
    """GET/PATCH /api/auth/profile/"""
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class ChangePasswordView(APIView):
    """POST /api/auth/change-password/"""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        request.user.set_password(serializer.validated_data['new_password'])
        request.user.save()
        return Response({'message': 'Password changed successfully.'})


class GoogleAuthView(APIView):
    """POST /api/auth/google/ - Handle Google OAuth user data"""
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        try:
            # Get Google user data from frontend
            user_data = request.data
            
            # Get or create user
            with transaction.atomic():
                user, created = User.objects.get_or_create(
                    email=user_data['email'],
                    defaults={
                        'full_name': user_data['full_name'],
                        'avatar': user_data.get('picture', ''),
                        'is_verified': user_data.get('verified', False),
                        'supabase_uid': user_data.get('id'),
                        'is_active': True,
                    }
                )
                
                # If user exists, update their info
                if not created:
                    user.full_name = user_data['full_name']
                    user.avatar = user_data.get('picture', '')
                    user.is_verified = user_data.get('verified', False)
                    user.supabase_uid = user_data.get('id')
                    user.save()
            
            # Generate JWT tokens
            tokens = get_tokens_for_user(user)
            
            return Response({
                'user': UserSerializer(user).data,
                'access': tokens['access'],
                'refresh': tokens['refresh'],
                'created': created
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({
                'error': f'Google authentication failed: {str(e)}'
            }, status=status.HTTP_400_BAD_REQUEST)


# ─── Address CRUD ─────────────────────────────────────────────────────────────

class AddressListCreateView(generics.ListCreateAPIView):
    """GET/POST /api/auth/addresses/"""
    serializer_class = AddressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AddressDetailView(generics.RetrieveUpdateDestroyAPIView):
    """GET/PATCH/DELETE /api/auth/addresses/<id>/"""
    serializer_class = AddressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)

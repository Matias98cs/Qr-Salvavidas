from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import CustomUser, Phone, Role
from django.utils.timezone import now

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        default_role = Role.objects.get(name="user")
        
        custom_user, created = CustomUser.objects.get_or_create(user=user, email=user.email ,defaults={"role": default_role})

        token['email'] = custom_user.email if custom_user.email else None
        token['role'] = custom_user.role.name if custom_user.role else None
        token['dni'] = custom_user.dni if custom_user.dni else None

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        user = self.user
        user.last_login = now()
        user.save(update_fields=['last_login'])
        default_role = Role.objects.get(name="user")
        custom_user, created = CustomUser.objects.get_or_create(user=user, email=user.email ,defaults={"role": default_role})

        data['user'] = {
            'id': user.id,
            'username': user.username,
            'email': custom_user.email if custom_user.email else "",
            'dni': custom_user.dni if custom_user.dni else "",
            'role': custom_user.role.name if custom_user.role else None,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'country': str(custom_user.country) if custom_user.country else None,
            'province': custom_user.province if custom_user.province else None,
            'nationality': str(custom_user.nationality) if custom_user.nationality else None,
        }

        return data


class PhoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phone
        fields = ["id", "country_code", "area_code", "phone_number", "type"]


class UserProfileSerializer(serializers.ModelSerializer):
    phones = PhoneSerializer(many=True, read_only=True)
    role = serializers.CharField(source='role.name')
    first_name = serializers.CharField(source="user.first_name", read_only=True)
    last_name = serializers.CharField(source="user.last_name", read_only=True)
    country = serializers.SerializerMethodField()
    nationality = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'dni', 'birth_date', 'read_qr', 'role', 'first_name', 'last_name', 'phones', 'country', 'province', 'nationality']

    def get_country(self, obj):
        return obj.country.code if obj.country else None

    def get_nationality(self, obj):
        return obj.nationality.code if obj.nationality else None  
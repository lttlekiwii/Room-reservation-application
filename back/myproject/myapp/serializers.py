from rest_framework import serializers
from .models import Room, Reservation
from django.contrib.auth import get_user_model

# Serializer for the Room model
class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room  # Specify the model to be serialized
        fields = ['id', 'name', 'capacity', 'available']  # Define fields to include in the serialization

# Serializer for the Reservation model
class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation  # Specify the model to be serialized
        fields = ['id', 'user', 'room', 'time', 'endTime', 'subject']  # Define fields to include in the serialization

# Serializer for the User model
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()  # Specify the model to be serialized (custom User model)
        fields = ['id', 'username', 'email', 'password']  # Define fields to include in the serialization
        extra_kwargs = {'password': {'write_only': True}}  # Specify extra keyword arguments for specific fields

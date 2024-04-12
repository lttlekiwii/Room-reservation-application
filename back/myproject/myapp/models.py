from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.utils import timezone

class Room(models.Model):
    name = models.CharField(max_length=100)  # Name of the room
    capacity = models.IntegerField()  # Capacity of the room
    available = models.BooleanField(default=True)  # Availability of the room

    def __str__(self):
        return self.name  # String representation of the room object

class Reservation(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='user_reservations')  # User making the reservation
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='room_reservations')  # Room being reserved
    time = models.DateTimeField(default=timezone.now)  # Start time of the reservation
    endTime = models.DateTimeField(default=timezone.now)  # End time of the reservation
    subject = models.CharField(max_length=255)  # Subject or purpose of the reservation

    def __str__(self):
        return f"{self.user.email} - {self.room.name} - {self.time}"  # String representation of the reservation object

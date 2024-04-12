from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate, login
from rest_framework.decorators import api_view

User = get_user_model()

from .models import Room, Reservation
from .serializers import RoomSerializer, ReservationSerializer, UserSerializer

# API view for listing and creating reservations
class ReservationListCreate(generics.ListCreateAPIView):
    queryset = Reservation.objects.all()  # Retrieve all reservations
    serializer_class = ReservationSerializer  # Serialize reservation data

# API view for retrieving, updating, and deleting a reservation
class ReservationRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Reservation.objects.all()  # Retrieve all reservations
    serializer_class = ReservationSerializer  # Serialize reservation data

# API view for listing and creating rooms
class RoomListCreate(generics.ListCreateAPIView):
    queryset = Room.objects.all()  # Retrieve all rooms
    serializer_class = RoomSerializer  # Serialize room data

# API view for retrieving, updating, and deleting a room
class RoomRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Room.objects.all()  # Retrieve all rooms
    serializer_class = RoomSerializer  # Serialize room data

# API view for user signup
class Signup(generics.CreateAPIView):
    queryset = User.objects.all()  # Retrieve all users
    serializer_class = UserSerializer  # Serialize user data
    
    # Custom create method to handle user signup
    def create(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        if not (username and password and email):
            return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, email=email, password=password)
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

# API view for user login
class Login(generics.CreateAPIView):
    queryset = User.objects.all()  # Retrieve all users
    serializer_class = UserSerializer  # Serialize user data
    
    # Custom create method to handle user login
    def create(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request, username=email, password=password)

        if user is not None:
            login(request, user)
            return Response({'message': 'User logged in successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# API view for creating a reservation
@api_view(['POST'])
def create_reservation(request):
    serializer = ReservationSerializer(data=request.data)  # Serialize reservation data
    if serializer.is_valid():
        serializer.save()  # Save the reservation
        return Response(serializer.data, status=status.HTTP_201_CREATED)  # Return success response
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Return error response if data is invalid

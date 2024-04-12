from django.urls import path
from myapp.views import RoomListCreate, RoomRetrieveUpdateDestroy
from myapp.views import ReservationListCreate, ReservationRetrieveUpdateDestroy, Signup
from myapp import views
from django.contrib import admin

# Define URL patterns for different views
urlpatterns = [
    path('admin/', admin.site.urls),  # Admin panel URL
    path('signup/', Signup.as_view(), name='signup'),  # User signup URL
    path('login/', views.Login.as_view(), name='login'),  # User login URL
    path('rooms/', RoomListCreate.as_view(), name='room-list'),  # URL for listing and creating rooms
    path('rooms/<int:pk>/', RoomRetrieveUpdateDestroy.as_view(), name='room-detail'),  # URL for retrieving, updating, and deleting a room
    path('reservations/', ReservationListCreate.as_view(), name='reservation-list'),  # URL for listing and creating reservations
    path('reservations/<int:pk>/', ReservationRetrieveUpdateDestroy.as_view(), name='reservation-detail'),  # URL for retrieving, updating, and deleting a reservation
    path('create_reservation/', views.create_reservation, name='create-reservation'),  # URL for creating a reservation
]

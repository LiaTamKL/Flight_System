from django.contrib import admin
from .models import *

# Register your models here.

@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ['Country_name', 'Flag']

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['Username', 'email', 'user_role']

@admin.register(Airline)
class AirlineAdmin(admin.ModelAdmin):
    list_display = ['Name', 'User_id', 'Country_id']

@admin.register(Flight)
class FlightAdmin(admin.ModelAdmin):
    list_display = ['Airline_id', 'Origin_country_id', 'Destination_country_id', 'Departure_time', 'Landing_time', 'Remaining_tickets']

@admin.register(User_Role)
class UserRoleAdmin(admin.ModelAdmin):
    list_display =['Role_name']



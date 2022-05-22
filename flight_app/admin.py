from django.contrib import admin
from .models import *

# Register your models here.

@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ['country_name', 'flag', 'link']
    list_display_links = ('link',)
    list_editable = ['flag']

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'user_role']

@admin.register(Airline)
class AirlineAdmin(admin.ModelAdmin):
    list_display = ['name', 'user', 'country']

@admin.register(Flight)
class FlightAdmin(admin.ModelAdmin):
    list_display = ['airline', 'origin_country', 'destination_country', 'departure_time', 'landing_time', 'remaining_tickets']

@admin.register(User_Role)
class UserRoleAdmin(admin.ModelAdmin):
    list_display =['role_name']

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display =['last_name', 'user', 'first_name']





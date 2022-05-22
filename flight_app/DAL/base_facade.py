from ..models import *
from ..forms import *
from django.http import Http404

class BaseFuncade():
 
    def get_all_flights():
        flight_list = list(models.Flight.objects.all())
        return flight_list


    def get_flight_by_id(id):
        flight_by_id = list(models.Flight.objects.filter(pk=id))
        return flight_by_id 
        

    def get_flights_by_parameters(origin_country_id, destination_country_id, date): # fix it later
        flight_by_params = list(models.Flight.objects
        .filter(origin_country_id = origin_country_id)
        .filter(destination_country_id = destination_country_id)
        .filter(depirture_time = date))    
        return flight_by_params

    def get_all_airlines():
            airline_list = list(models.Airline.objects.all())
            return airline_list

    def get_airline_by_id(id):
            airline_by_id = list(models.Airline.objects.filter(pk=id))
            return airline_by_id 

    def get_airline_by_parameters(airline_name, country_id , user_id): 
        airline_by_params = list(models.Airline.objects
        .filter(name = airline_name)
        .filter(country_id = int(country_id))
        .filter(user_id = int(user_id)))    
        return airline_by_params

    def get_all_countries():
            country_list = list(models.Country.objects.all())
            return country_list

    def get_country_by_id(id):
            country_by_id = list(models.Country.objects.filter(pk=id))
            return country_by_id

    # new user creation , user will be in list format to extract usernmae and password
    # create login screen form with Create new user button which moves to user details page
    # on commit login details will be sent here for user creation.
    # also will generate token for the user?
    def create_new_user(user):
        pass



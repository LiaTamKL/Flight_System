from django.shortcuts import render
from . import models


def show_flight_info (request):
    all_flights = get_all_flights()
    flight_by_id = get_flight_by_id(2)
    flights_by_param = get_flights_by_parameters(1,2 , 50)
    context = {
        'all_flights' : all_flights,
        'flight_by_id' :flight_by_id,
        'flights_by_param' : flights_by_param,
    }
    return render(request, "flight_info.html", context)


def show_airline_info(request):
    all_airlines = get_all_airlines()
    airline_by_id = get_airline_by_id(1)
    airline_by_params = get_airline_by_parameters('CrashAir', 1 , 2)

    context = {
        'all_airlines' : all_airlines,
        'airline_by_id' :airline_by_id,
        'airline_by_params' : airline_by_params,
    }
    return render(request, "airline_info.html", context)


def show_countries_info(request):
    all_countries = get_all_countries()
    country_by_id = get_country_by_id(1)
    context = {
        'all_countries' : all_countries,
        'country_by_id' :country_by_id,
    }
    return render(request, "countries_info.html", context)



def testview(request):
    return render(request, "test_temp.html")


def get_all_flights():
    flight_list = list(models.Flight.objects.all())
    return flight_list



def get_flight_by_id(id):
    flight_by_id = list(models.Flight.objects.filter(pk=id))
    return flight_by_id 
    

def get_flights_by_parameters(origin_country_id, destination_country_id, remaining_tickets):
    flight_by_params = list(models.Flight.objects
    .filter(Origin_country_id_id = origin_country_id)
    .filter(Destination_country_id_id = destination_country_id)
    .filter(Remaining_tickets = remaining_tickets))    
    return flight_by_params

def get_all_airlines():
        airline_list = list(models.Airline.objects.all())
        return airline_list

def get_airline_by_id(id):
        airline_by_id = list(models.Airline.objects.filter(pk=id))
        return airline_by_id 

def get_airline_by_parameters(airline_name, country_id , user_id): 
    airline_by_params = list(models.Airline.objects
    .filter(Name = airline_name)
    .filter(Country_id_id = int(country_id))
    .filter(User_id_id = int(user_id)))    
    return airline_by_params

def get_all_countries():
        country_list = list(models.Country.objects.all())
        return country_list

def get_country_by_id(id):
        country_by_id = list(models.Country.objects.filter(pk=id))
        return country_by_id


def create_new_user(user):
    pass
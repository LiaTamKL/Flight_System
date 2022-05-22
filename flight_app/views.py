from django.shortcuts import render
from . import models



def testview(request):
    return render(request, "test_temp.html")


def get_all_flights():
    flight_list = list(models.Flight.objects.all())
    return flight_list



def get_flight_by_id(id):
    flight_by_id = list(models.Flight.objects.filter(pk=id))
    return flight_by_id 
    

def get_flights_by_parameters(origin_country_id, destination_country_id, date):
    #flight_by_params = list(models.Flight.objects.filter(origin_country_id = origin_country_id))
    pass

def get_all_airlines():
    pass

def get_airline_by_id(id):
     pass

def get_airline_by_parameters(params): 
    pass

def get_all_countries():
    pass

def get_country_by_id(id):
    pass
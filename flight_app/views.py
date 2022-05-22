from django.shortcuts import render



def testview(request):
    return render(request, "test_temp.html")


def get_all_flights():
    pass

def get_flight_by_id(id):
    pass

def get_flights_by_parameters(origin_country_id, destination_country_id, date):
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
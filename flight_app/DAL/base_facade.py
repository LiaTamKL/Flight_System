from flight_app import models



def get_all_flights():
    flight_list = list(models.Flight.objects.all())
    return flight_list


def get_flight_by_id(id):
    flight_by_id = list(models.Flight.objects.filter(pk=id))
    return flight_by_id 
    

def get_flights_by_parameters(origin_country_id1, destination_country_id1, remaining_tickets1): # fix it later
    flight_by_params = list(models.Flight.objects
    .filter(origin_country_id = origin_country_id1)
    .filter(destination_country_id = destination_country_id1)
    .filter(remaining_tickets = remaining_tickets1))    
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


def create_new_user(user):
    pass



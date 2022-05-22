from django.shortcuts import render ,redirect
from . import models
from . import forms

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



def show_country_by_id(request, country_id):
    country_by_id = get_country_by_id(country_id)
    context = {
        'country_by_id' :country_by_id,
    }
    return render(request, "countries_info.html", context)


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
    

def get_flights_by_parameters(origin_country_id1, destination_country_id1, remaining_tickets1):
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


def show_contact_from(request):
  
    f = contact_from = forms.ContactForm(request.POST or None) # reteins data even if the submit was invalid. 
    # print(request.GET)
    if f.is_valid():
        #print(f.cleaned_data.get('coutry_id')) 
        # cleans everything but the raw data submitted, prints only selected by get 'subject in this case
        country_id = f.cleaned_data.get('coutry_id')
        
        address = f'/flight_app/countryinfo/{country_id}'

        return redirect(address)

    context = {
        'form' : contact_from,
    }
    return render(request,'contact_form.html' , context)


    

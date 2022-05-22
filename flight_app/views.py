from django.shortcuts import render ,redirect
from . import models
from . import forms
from .DAL import base_facade  

def testview(request):
    return render(request, "test_temp.html")

def show_flight_info (request):
    all_flights = base_facade.get_all_flights()
    flight_by_id = base_facade.get_flight_by_id(2)
    flights_by_param = base_facade.get_flights_by_parameters(1,2 , 50)
    context = {
        'all_flights' : all_flights,
        'flight_by_id' :flight_by_id,
        'flights_by_param' : flights_by_param,
    }
    return render(request, "flight_info.html", context)


def show_airline_info(request):
    all_airlines = base_facade.get_all_airlines()
    airline_by_id = base_facade.get_airline_by_id(1)
    airline_by_params = base_facade.get_airline_by_parameters('CrashAir', 1 , 2)

    context = {
        'all_airlines' : all_airlines,
        'airline_by_id' :airline_by_id,
        'airline_by_params' : airline_by_params,
    }
    return render(request, "airline_info.html", context)



def show_country_by_id(request, country_id):
    country_by_id = base_facade.get_country_by_id(country_id)
    context = {
        'country_by_id' :country_by_id,
    }
    return render(request, "countries_info.html", context)


def show_countries_info(request):

    all_countries = base_facade.get_all_countries()
    country_by_id = base_facade.get_country_by_id(1)
    context = {
        'all_countries' : all_countries,
        'country_by_id' :country_by_id,
    }
    return render(request, "countries_info.html", context)




def show_contact_from(request):
  
    f = contact_from = forms.ContactForm(request.POST or None) # reteins data even if the submit was invalid. 
    # print(request.GET)
    if f.is_valid():
        #print(f.cleaned_data.get('coutry_id')) 
        # cleans everything but the raw data submitted, prints only selected by get 'subject in this case
        country_id = f.cleaned_data.get('country_id')
        
        redirect_address = f'/flight_app/countryinfo/{country_id}'

        return redirect(redirect_address)

    context = {
        'form' : contact_from,
    }
    return render(request,'contact_form.html' , context)


    

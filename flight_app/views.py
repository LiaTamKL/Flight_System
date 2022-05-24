from django.shortcuts import render ,redirect
from . import models
from . import forms
from .DAL.base_facade import BaseFuncade
from .DAL.airline_facade import Airline_Facade
from .DAL.customer_facade import CustomerFancade
from .DAL.anony_facade import AnonymusFancade
from django.http import HttpResponse, Http404
from django.core.exceptions import PermissionDenied
# from django.contrib.auth.hashers import make_password
from django.db import transaction
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login 
from django.contrib.auth.decorators import login_required


def homeview(request):
    return render(request, 'home.html')

def show_flight_info (request):
    all_flights = BaseFuncade.get_all_flights()
    flight_by_id = BaseFuncade.get_flight_by_id(2)
    flights_by_param = BaseFuncade.get_flights_by_parameters(1,2 , 50)
    context = {
        'all_flights' : all_flights,
        'flight_by_id' :flight_by_id,
        'flights_by_param' : flights_by_param,
    }
    return render(request, "flight_info.html", context)


def show_airline_info(request):
    all_airlines = BaseFuncade.get_all_airlines()
    airline_by_id = BaseFuncade.get_airline_by_id(1)
    airline_by_params = BaseFuncade.get_airline_by_parameters('CrashAir', 1 , 2)

    context = {
        'all_airlines' : all_airlines,
        'airline_by_id' :airline_by_id,
        'airline_by_params' : airline_by_params,
    }
    return render(request, "airline_info.html", context)




def show_country_by_id(request, country_id):
    country_by_id = BaseFuncade.get_country_by_id(country_id)
    context = {
        'country_by_id' :country_by_id,
    }
    return render(request, "country_by_id.html", context)



#shows contries info , if no argument was sent it shows all 
def show_countries_info(request):

    all_countries = BaseFuncade.get_all_countries()
    context = {
        'all_countries' : all_countries,
    }
    return render(request, "all_countries.html", context)


def view_flights_by_airline(request, airline_id):
    flights = Airline_Facade.get_my_flights(airline_id)
    airline = (Airline_Facade.get_airline_by_id(airline_id))[0]
    context = { 
        'Flights': flights,
        'Airline': airline
    }
    return render(request, 'airline_get_flights.html', context)


def delete_flight_for_airline(request, flight_id):
    result = Airline_Facade.remove_flight(flight_id)
    #proper "delete" page should be added later instead of an httpresponse
    if result == 1:
        return HttpResponse(f'Flight #{flight_id} removed successfully')
    

def show_country_search_from(request):
  
    f = contact_from = forms.country_id_search_form(request.POST or None) # reteins data even if the submit was invalid. 
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
    return render(request,'search_country_page.html' , context)

#lets airline fill in form for new flight
def airline_add_flight(request):
    #for now this is hardcoded to medair flights only, we'll do it via a login token later
    airline_id = 1
    flightform = forms.NewFlightForm(request.POST or None)

    message = None
    if request.method =='POST':
        if flightform.is_valid():
            flight = models.Flight()
            Airline_Facade.add_flight(airline_id, flightform.cleaned_data, flight)
            message = 'Flight added successfully'
    context = {
        'form': flightform,
        'message': message
    }
    return render(request, 'add_flight.html', context)

def airline_update_flight(request, flight_id):
    airline_id = (BaseFuncade.get_airline_by_id(1))[0]
    try:
        instance = (BaseFuncade.get_flight_by_id(flight_id))[0]
    except:
        raise Http404('Flight does not exist')
    if airline_id != instance.airline:
        raise PermissionDenied()

    message = None
    flightform = forms.NewFlightForm(request.POST, instance=instance)
    if request.method =='POST':
        if flightform.is_valid():
            #Airline_Facade.add_flight(1, flightform.clean_data)
            message = 'Flight added successfully'
    context = {
        'form': flightform,
        'message': message
    }
    return render(request, 'add_flight.html', context)
    

def remove_ticket(request, ticket_id):
    result = CustomerFancade.remove_ticket(ticket_id)
    if result == 1:
        return HttpResponse(f'ticket #{ticket_id} removed successfully')


def add_ticket(request):
    message = None
    new_ticket_form = forms.NewTicketForm(request.POST or None)
    if request.method =='POST':
        if new_ticket_form.is_valid():
            
            CustomerFancade.add_ticket(new_ticket_form.cleaned_data)     
            message = 'Ticket added successfully'
    context = {
        'form': new_ticket_form,
        'message': message
        }
    return render(request, 'add_ticket.html', context)
 
def get_my_tickets(request, cust_id):
    all_my_tickets = CustomerFancade.get_my_tickets(cust_id)
    return render(request, "all_my_tickets.html", {'all_tickets': all_my_tickets})




def cust_login(request, user_id): 
    context = {'id': user_id}
    return render( request, 'customer_login_ok.html', context)

def airline_login(request, user_id): 
    context = {'id': user_id}
    return render( request, 'airline_login.ok', context)


def logged_in(request):
     return render( request,'logged_in.html')


def new_user(request):
    # new_user_form =  forms.SignUpForm(request.POST or None)
    new_user_form = forms.SignUpForm(request.POST)

    if request.method == 'POST':

        # raise Exception({new_user_form.errors})

        if new_user_form.is_valid(): 
            BaseFuncade.create_new_user(new_user_form.cleaned_data)
            return HttpResponse("UserCreated")
        else :
            dict = list(new_user_form.errors)
            return HttpResponse(dict)
    return render(request, 'register.html', {'form': new_user_form})

    


#cannot be named 'login' 
def user_login(request):
    logged = False
    new_login = forms.LoginForm(request.POST)
    if request.method == 'POST':
        if new_login.is_valid():
            logged = AnonymusFancade.login(request,new_login.cleaned_data)  
        
            if logged:
                redirect_address =f'/flight_app/loggedin'
                return redirect(redirect_address)
            else:
                raise PermissionDenied()
                
    return render(request, 'login_page.html', {'form': new_login})





    
#old login method
# def login_page(request):
#     new_login = forms.LoginForm(request.POST or None)
#     if request.method == 'POST':
#         if new_login.is_valid():
#             user_role , user_id = AnonymusFancade.login(new_login.cleaned_data)
#             if user_role == 2 :
#                 redirect_address =f'/flight_app/custloggedin/{user_id}'
#             if user_role == 1:
#                 redirect_address =f'/flight_app/airlineloggedin/{user_id}'
#                 return redirect(redirect_address)
              
#     return render(request, 'login_page.html', {'form': new_login})





################################################
                # Old Methods 
################################################


#old login method
# def login_page(request):
#     new_login = forms.LoginForm(request.POST or None)
#     if request.method == 'POST':
#         if new_login.is_valid():
#             user_role , user_id = AnonymusFancade.login(new_login.cleaned_data)
#             if user_role == 2 :
#                 redirect_address =f'/flight_app/custloggedin/{user_id}'
#             if user_role == 1:
#                 redirect_address =f'/flight_app/airlineloggedin/{user_id}'
#                 return redirect(redirect_address)
              
#     return render(request, 'login_page.html', {'form': new_login})




        

# def add_new_user(request):
#     #temp
#     user_id = 0
#     message = None
#     new_user_id = BaseFuncade.create_new_user()    

    # # new_user = forms.NewUserForm(request.POST  or None)
    # if request.method =='POST':
    #     if new_user.is_valid():
    #         # BaseFuncade.create_new_user(user_id , new_user.cleaned_data)
    #         new_user_id = BaseFuncade.create_new_user(user_id , new_user.cleaned_data)          
    #         message = 'New user added successfully'
    #         return new_user_id
    # context = {
    #     'form': new_user,
    #     'message': message
    #     }
    # return render(request, 'create_user_form.html', context)

#old user creation method
# def add_new_customer_anonymous(request):
#     new_user = forms.NewUserForm(request.POST  or None)
#     new_customer = forms.NewCustomerForm(request.POST or None)
#     if request.method =='POST':
#         if new_user.is_valid():
#             # 2 for customer role 
#             new_user_id = BaseFuncade.create_new_user(2 , new_user.cleaned_data)
#             if new_customer.is_valid():
#                 AnonymusFancade.add_customer(new_user_id, new_customer.cleaned_data)
#                 redirect_address =  f'/flight_app/loggedin/{new_user_id}'
#                 return redirect(redirect_address)
                
#     context = {
#         'userform': new_user,
#         'custform': new_customer,
#         }
#     return render(request, 'create_customer_form.html', context)


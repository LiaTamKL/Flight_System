from django.shortcuts import render ,redirect
from . import models
from . import forms
from .DAL.base_facade import BaseFuncade
from .DAL.airline_facade import Airline_Facade
from .DAL.customer_facade import CustomerFancade
from .DAL.anony_facade import AnonymusFancade
from .DAL.admin_facade import AdministratorFuncade
from django.http import HttpResponse, Http404
from django.core.exceptions import PermissionDenied
# from django.contrib.auth.hashers import make_password
from django.db import transaction
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.forms import formset_factory
from django.contrib import auth




def homeview(request):

    if request.user.is_authenticated:
        return redirect("members/homepage/")

    return render(request, 'home.html')



def members_homepage(request):
    if request.user.is_authenticated:
        account_id = request.user.id
        account_type = request.user.account_role
        # print(account_type)
        if request.user.is_superuser:
            context = {
            'account_type': 'superuser'
            }
            return render(request, 'members_home.html', context)
        

        elif account_type == models.Account_Role.objects.get(id = 2):
          account = models.Customer.objects.get(account_id = account_id).first_name

        elif account_type == models.Account_Role.objects.get(id = 1):
            account = models.Airline.objects.get(account_id = account_id).name


        
        
        context = {

            'account': account,
            'account_type': account_type
        }
        return render(request, 'members_home.html', context)

    return redirect('login')




def members_tickets(request):
    if request.user.is_authenticated:

        return render(request , 'add_ticket.html')

        


    
    
    return redirect('home.html')

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
def all_countries(request):

    all_countries = BaseFuncade.get_all_countries()
    context = {
        'all_countries' : all_countries,
    }
    return render(request, "all_countries.html", context)




#shows all flights for the airline that's logged in. shows nothing if not logged in as an airline
def view_flights_by_airline(request):
    #if not request.user.is_authenticated:
    #    redirect('login')
    airline = models.Airline.objects.filter(account=request.user.id)
    try:
        airline = airline[0]
        flights = Airline_Facade.get_my_flights(airline.id)
        context = {
            'Flights': flights,
            'Airline': airline,
            }
    except: 
        context = {'Flights': None, 
                    'Airline': 'You are not logged in as an airline. You may not view this',
                    }

    return render(request, 'airline_get_flights.html', context)




#takes a flight_id, deletes it if you're logged in as the airline that flight belongs to.
def delete_flight_for_airline(request, flight_id):
    airline = models.Airline.objects.filter(account=request.user.id)
    try:
        airline = airline[0]
    except:
        return HttpResponse('You are not logged in as an airline. Please login')
    
    result = Airline_Facade.remove_flight(flight_id, airline)
    if result == 1:
        return HttpResponse(f'Flight #{flight_id} removed successfully')

#shows all customers (or accounts if we mark in that line). if not admin, doesn't let access
def show_all_customers(request):
    admin = models.Administrator.objects.filter(account=request.user.id)
    try:
        admin = admin[0]
    except:
        return HttpResponse('You are not logged in as an Admin. Please login')
    customers = AdministratorFuncade.get_all_customers()
    #accounts = AdministratorFuncade.get_all_accounts()
    context = {'customers':customers}
    return context['customers']

def delete_customer(request, customer_id):
    admin = models.Administrator.objects.filter(account=request.user.id)
    try:
        admin = admin[0]
    except:
        return HttpResponse('You are not logged in as an Admin. Please login')
    AdministratorFuncade.remove_customer(customer_id)
    return HttpResponse(f'Customer #{customer_id} removed successfully')

def delete_airline(request, airline_id):
    admin = models.Administrator.objects.filter(account=request.user.id)
    try:
        admin = admin[0]
    except:
        return HttpResponse('You are not logged in as an Admin. Please login')
    AdministratorFuncade.remove_airline(airline_id)
    return HttpResponse(f'Airline #{airline_id} removed successfully')

def delete_admin(request, admin_id):
    admin = models.Administrator.objects.filter(account=request.user.id)
    try:
        admin = admin[0]
    except:
        return HttpResponse('You are not logged in as an Admin. Please login')
    AdministratorFuncade.remove_airline(admin_id)
    return HttpResponse(f'Admin #{admin_id} removed successfully')

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
    airline = models.Airline.objects.filter(account=request.user.id)
    try:
        airline = airline[0]
    except:
        return HttpResponse('You are not logged in as an airline. Please login')

    flightform = forms.NewFlightForm(request.POST or None)
    message = None
    if request.method =='POST':
        if flightform.is_valid():
            flight = models.Flight()
            Airline_Facade.add_flight(airline.id, flightform.cleaned_data, flight)
            message = 'Flight added successfully'
    context = {
        'form': flightform,
        'message': message
    }
    return render(request, 'add_flight.html', context)


#takes flight id as peremeter, let's user update said flight. denies them if flight does not exist or user is not the airline for this flight
def airline_update_flight(request, flight_id):
    airline = models.Airline.objects.filter(account=request.user.id)

    #if you're not logged in as an airline, tell you to go log in
    try:
        airline = airline[0]
    except:
        return HttpResponse('You are not logged in as an airline. Please login')

    #if flight does not exist, raises http404
    try:
        instance = (BaseFuncade.get_flight_by_id(flight_id))[0]
    except:
        raise Http404('Flight does not exist')

    #if you're not logged in as the airline for this flight, raises permission deny
    if airline != instance.airline:
        raise PermissionDenied("This is not your flight! You may not update it")

    message = None
    if request.method =='POST':
        flightform = forms.NewFlightForm(request.POST, instance=instance)
        if flightform.is_valid():
            
            flightform.save()
            #Airline_Facade.update_flight(airline.id, flightform.cleaned_data, instance)
            message = 'Flight updated successfully'
    else: flightform = forms.NewFlightForm(instance=instance)
    context = {
        'form': flightform,
        'message': message
    }
    return render(request, 'add_flight.html', context)


#these three will not work yet due to there not being a way to delete a customer but not a user. Leaving this as a template for later
def add_customer(request):
    admin = models.Administrator.objects.filter(account=request.user.id)
    try:
        admin = admin[0]
    except:
        return HttpResponse('You are not logged in as an Admin. Please login')

    #customerform = forms.CustomerAdminform(request.POST or None)
    message = None
    #if request.method =='POST':
    #    if customerform.is_valid():
    #        AdministratorFuncade.add_cus_as_admin(customerform.cleaned_data)
    #        message = 'Cus added successfully'
    #context = {
    #    'form': customerform,
    #    'message': message
    #}
    #return render(request, 'Add_customer.html', context)

def add_airline(request):
    admin = models.Administrator.objects.filter(account=request.user.id)
    try:
        admin = admin[0]
    except:
        return HttpResponse('You are not logged in as an Admin. Please login')

    #airlineform = forms.AirlineForm(request.POST or None)
    message = None
    #if request.method =='POST':
    #    if airlineform.is_valid():
    #        AdministratorFuncade.add_airline(airlineform.cleaned_data)
    #        message = 'Airline added successfully'
    #context = {
    #    'form': airlineform,
    #    'message': message
    #}
    #return render(request, 'Add_Airline.html', context)

def add_admin(request):
    admin = models.Administrator.objects.filter(account=request.user.id)
    try:
        admin = admin[0]
    except:
        return HttpResponse('You are not logged in as an Admin. Please login')

    #adminform = forms.AdminForm(request.POST or None)
    message = None
    #if request.method =='POST':
    #    if adminform.is_valid():
    #        AdministratorFuncade.add_admin(adminform.cleaned_data)
    #        message = 'Admin added successfully'
    #context = {
    #    'form': adminform,
    #    'message': message
    #}
    #return render(request, 'Add_Admin.html', context)




########################################################
#show remaning tickets , reduce tickets on addition
#flight_tickets.objects.filter(pk=flight_id).count()')

def add_ticket(request):
    if request.user.is_authenticated:

        customer = models.Customer.objects.get(account_id = request.user.id )
        message = None

        new_ticket_form = forms.NewTicketForm(request.POST)
        if request.method =='POST':
            if new_ticket_form.is_valid():
            # if models.Flight_Ticket.filter(account_id = customer.id):

                CustomerFancade.add_ticket(new_ticket_form.cleaned_data , customer.id)
                message = 'Ticket added successfully'
        context = {
            'form': new_ticket_form,
            'message': message
            }
        return render(request, 'add_ticket.html', context)
    
    else:
        return redirect('home')





def update_account(requset):
    form = {}     
            
    context = {
        'form':form,
        'designation': "Update User", 
        "button": "Update"
    }

    return render(requset, 'form_tamplate.html', context)






def get_my_tickets(request):
    if request.user.is_authenticated:
        customer = models.Customer.objects.get(account_id = request.user.id)
        all_my_tickets = CustomerFancade.get_my_tickets(customer.id)

        
        return render(request, "all_my_tickets.html", {'all_tickets': all_my_tickets})

    else:
        return redirect('home')



def remove_ticket(request):
    context= {}
    if request.user.is_authenticated:
        customer = models.Customer.objects.get(account_id = request.user.id)
        # raise Except|ion{{}}  
        form = forms.RemoveTicket(customer.id, request.POST )
        if request.method =='POST':
            if form.is_valid():
               
                lis = CustomerFancade.remove_ticket(form.cleaned_data)   
                # return HttpResponse(lis)
       
       
        context = {
            'form':form,
            'designation': "Remove Ticket", 
            "button": "remove"
        }

        return render(request, 'form_tamplate.html', context)
    else:
        return redirect('home')



#cannot be named 'login'
def user_login(request):
    context = {}
    logged = False
    #data = data=request.POST is the only way to get AuthenticationForm to pass
    new_login = forms.Login(data=request.POST)

    if request.method == 'POST':
        if new_login.is_valid():
            logged = AnonymusFancade.login(request, new_login.cleaned_data)
            if logged:
                return redirect('home')
            else:
           
                raise PermissionDenied()
        else:
            context['login_form'] = new_login 
            # return render(request, 'form_test.html', {'form':new_login})
    else:
        new_login = forms.Login()
        context['login_form'] = new_login 

    return render(request, 'login_page.html', context)


def logout(request):
    if request.user.is_authenticated:
        auth.logout(request)
        return render(request,'logged_out.html')
    else:
        return redirect('home')



def register_customer(request):
    
    return register(request , account_role=2)



def register_airline(request):
    register(request , account_role=1)



def register(request, account_role):
    context = {}
    account_role = models.Account_Role.objects.get(pk = account_role)
    # account_role = 2
    if request.POST:    
        user_form = forms.RegistrationForm(request.POST)
        customer_form = forms.NewCustomerForm(request.POST)

        if user_form.is_valid():
            created_account = BaseFuncade.create_new_user(user_form , account_role)
            if customer_form.is_valid():
                AnonymusFancade.add_customer(customer_form , created_account)
            
            else:
                return Http404
            return redirect('../login/')
        else:
            
            context['user_registration_form'] = user_form 
            context['customer_registration_form'] = customer_form 
    else:
        user_form = forms.RegistrationForm()
        customer_form = forms.NewCustomerForm()
        context['user_registration_form'] = user_form 
        context['customer_registration_form'] = customer_form 
        # context2['customer_registration_form'] = customer_form 
        
    return render(request, 'register.html', context )









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



# def new_user(request):
#     # new_user_form =  forms.SignUpForm(request.POST or None)
#     new_user_form = forms.SignUpForm(request.POST)

#     if request.method == 'POST':

#         # raise Exception({new_user_form.errors})

#         if new_user_form.is_valid():
#             BaseFuncade.create_new_user(new_user_form.cleaned_data)
#             return HttpResponse("UserCreated")
#         else :
#             dict = list(new_user_form.errors)
#             return HttpResponse(dict)
#     return render(request, 'register.html', {'form': new_user_form})



# def register(request):
#     context = {}
#     if request.POST:    
#         form = forms.RegistrationForm(request.POST)
        
#         if form.is_valid():
#             BaseFuncade.create_new_user(form)
#             # print(form.cleaned_data)

#             # email = form.cleaned_data['email']
#             # raw_password = form.cleaned_data['password1']


#             # account = authenticate(email = email, password = raw_password)
#             # login(request,account)
#             # id = models.Account.objects.get(email = email) 
#             # print(id.id)
#             # print(id)


#             # form2 = {'user_id': id, 
#             #         'first_name': form.cleaned_data['first_name'], 
#             #         'last_name': form.cleaned_data['last_name'],
#             #         'credit_card_no': form.cleaned_data['credit_card_no'],
#             #         'address': form.cleaned_data['address'],
#             #         'phone_number': form.cleaned_data['phone_number']}
#             # AdministratorFuncade.add_customer2(form2)


#             account_role = models.Account_Role.objects.get(pk = 1)
#             id.account_role = account_role
#             id.save()
#             return redirect('home')
#         else:
#             context['registration_form'] = form
#     else:
#         form = forms.RegistrationForm()
#         context['registration_form'] = form
#     return render(request, 'register.html', context)




# def logged_in(request):
#     return render(request, 'logged_in.html')


# def logged_in(request):
#     return render(request, 'logged_in.html')

# def cust_login(request, user_id):
#     context = {'id': user_id}
#     return render( request, 'customer_login_ok.html', context)

# def airline_login(request, user_id):
#     context = {'id': user_id}
#     return render( request, 'airline_login.ok', context)
from distutils.log import error
from urllib import response
from django.shortcuts import render ,redirect
from .models import *
from .forms import *
from .DAL.base_facade import BaseFuncade
from .DAL.airline_facade import Airline_Facade
from .DAL.customer_facade import CustomerFancade
from .DAL.anony_facade import AnonymusFancade
from .DAL.admin_facade import AdministratorFuncade
from django.http import HttpResponse, Http404
from django.core.exceptions import PermissionDenied
# from django.contrib.auth.hashers import make_password
from django.db import transaction
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.forms import formset_factory
from django.contrib import auth
from datetime import datetime
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.decorators import api_view
import pytz
from rest_framework import status
from .top_level_methods.user_api import *
from .top_level_methods.admin_api import *

utc=pytz.UTC

from .serializers import *

#######JWT CUSTOM CLAIM
########THIS IS WHERE WE SET WHAT INFO THE TOKENS WILL GRAB ON THE FRONT END
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        #sets up account_role type and main name for superusers
        #as superusers might lack both a role and an admin account
        if user.is_superuser == True:
            role_name = 'Admin'
            main_name = f'superuser {user.username}'
        #sets up account role and main name by the type of account a user is
        else:
            account_role = user.account_role
            role_name = account_role.role_name
            main_name=AdministratorFuncade.get_by_username(user.username)
            main_name = main_name['user']
            if role_name == 'Admin' or role_name == 'Customer':
                main_name = f'{main_name.first_name} {main_name.last_name}'
            else: main_name = main_name.name
        # Add custom claims
        token['username'] = user.username
        token['account_role'] = role_name
        token['email'] = user.email
        token['main_name'] = main_name
        token['is_superuser'] = user.is_superuser

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


##################################################
############### flight ##########################


@api_view(['GET'])
def allfli(requset):
    flights =  Flight.objects.all().order_by('departure_time')
    seralizer = FlightSerializer(flights, many = True)
    return Response(seralizer.data)

@api_view(['GET'])
def getfli(requset, id):
    flight = BaseFuncade.get_flight_by_id(id)
    seralizer = FlightSerializer(flight, many = False)
    return Response(seralizer.data)

@api_view(['PATCH'])
def updatefli(request, id):
    data = request.data
    flight = BaseFuncade.get_flight_by_id(id)
    seralizer = FlightSerializer(instance=flight, data=data)
    
    if seralizer.is_valid():
        seralizer.save()
    return Response(seralizer.data)



@api_view(['DELETE'])
def deletefli(request, id):
    flight = BaseFuncade.get_flight_by_id(id)
    flight.delete()
    return Response("Deleted")



@api_view(['POST'])
def createfli(request):
    data = request.data
    flight = Flight.objects.create(
        airline_id = data['airline'],
        origin_country_id = data['originCountry'],
        destination_country_id = data['destinationCountry'],
        departure_time = utc.localize(datetime.fromisoformat(data['departureTime'])),
        landing_time = utc.localize(datetime.fromisoformat(data['arrivalTime'])),
        remaining_tickets = data['tickets'],


    )
    seralizer = FlightSerializer(flight, many = False)
    return Response(seralizer.data)

####################################################
#airline


@api_view(['GET'])
def allair(requset):
    ailines =  Airline.objects.all()
    seralizer = AirlineSerializer(ailines, many = True)
    return Response(seralizer.data)

@api_view(['GET'])
def getair(requset, id):
    airline = BaseFuncade.get_airline_by_id(id)
    seralizer = AirlineSerializer(airline, many = False)
    return Response(seralizer.data)

@api_view(['GET', 'POST'])
def airline_api(request):
    if request.user.is_authenticated == False:
         return Response(data='You are not logged in!', status=status.HTTP_401_UNAUTHORIZED)
    if request.user.account_role != Account_Role.objects.get(role_name = 'Airline'):
         return Response(data='Must be an airline to use this!', status=status.HTTP_401_UNAUTHORIZED)

    if request.method == 'GET':
        airline = Airline.objects.get(account=request.user)
        flights =  Flight.objects.filter(airline=airline).order_by('departure_time')
        seralizer = FlightSerializer(flights, many = True)
        return Response(seralizer.data)
    
    if request.method == 'POST':
        serializer = FlightSerializer(data=request.data, many = False)
        if serializer.is_valid():
            print(serializer.data)
            return Response(seralizer.data)
            
            if request.data['origin_country']  == request.data['destination_country']:
                return Response(data='Destination and origin countries must not be the same!', status=status.HTTP_400_BAD_REQUEST)
            data= request.data
            departure_time = utc.localize(datetime.fromisoformat(request.data['departureTime'])),
            landing_time = utc.localize(datetime.fromisoformat(request.data['arrivalTime']))
            if departure_time < utc.localize(datetime.now()):
                return Response(data='You cannot choose a date in the past', status=status.HTTP_400_BAD_REQUEST)
            if landing_time <= departure_time:
                return Response(data='A landing must be after a departure', status=status.HTTP_400_BAD_REQUEST)
            data['departureTime'] = departure_time
            data['landing_time'] = landing_time
            flight=Flight()
            Airline_Facade.add_flight(airline=airline, form=data, flight=flight)

        else:
            return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH','DELETE'])
def airline_delete_update(request, id):  
    if request.user.is_authenticated == False:
         return Response(data='You are not logged in!', status=status.HTTP_401_UNAUTHORIZED)
    if request.user.account_role != Account_Role.objects.get(role_name = 'Airline'):
         return Response(data='Must be an airline to use this!', status=status.HTTP_401_UNAUTHORIZED) 
    
    try:
            flight = Flight.objects.get(pk = id)
            airline = Airline.objects.get(account=request.user)
    except Flight.DoesNotExist:
        return Response (data="Flight does not exist", status=status.HTTP_404_NOT_FOUND)
    if airline != flight.airline:
            return Response(data="This is not your flight!", status=status.HTTP_401_UNAUTHORIZED)
    
    if request.method == 'PATCH':
        return Response(request.data)

        if request.data['origin_country']  == request.data['destination_country']:
            return Response(data='Destination and origin countries must not be the same!', status=status.HTTP_400_BAD_REQUEST)
        data= request.data
        departure_time = utc.localize(datetime.fromisoformat(request.data['departureTime'])),
        landing_time = utc.localize(datetime.fromisoformat(request.data['arrivalTime']))
        if departure_time < utc.localize(datetime.now()):
            return Response(data='You cannot choose a date in the past', status=status.HTTP_400_BAD_REQUEST)
        if landing_time <= departure_time:
            return Response(data='A landing must be after a departure', status=status.HTTP_400_BAD_REQUEST)
        data['departureTime'] = departure_time
        data['landing_time'] = landing_time
        Airline_Facade.update_flight(airline=airline, form=data, flight=flight)
    
    if request.method=='DELETE':
        return Response(request.data)
        Airline_Facade.remove_flight(flight, airline)

####################################################
#Country

@api_view(['GET'])
def allcount(requset):
    ailines =  Country.objects.all()
    seralizer = CountrySerializer(ailines, many = True)
    return Response(seralizer.data)

@api_view(['GET'])
def getcount(requset, id):
    airline = BaseFuncade.get_country_by_id(id)
    seralizer = CountrySerializer(airline, many = False)
    return Response(seralizer.data)


@api_view(['PATCH'])
def updatecount(request, id):
    data = request.data
    country = BaseFuncade.get_country_by_id(id)
    seralizer = CountrySerializer(instance=country, data=data)
    
    if seralizer.is_valid():
        seralizer.save()
    return Response(seralizer.data)



@api_view(['DELETE'])
def deletecount(request, id):
    country = BaseFuncade.get_country_by_id(id)
    country.delete()
    return Response("Deleted")


@api_view(['POST'])
def createcount(request):
    data = request.data
    country = Country.objects.create(
        country_name = data["countryName"],
        flag = data["flag"]
    )
    seralizer = CountrySerializer(country, many = False)
    return Response(seralizer.data)






##################### ACCOUNT ACTIONS ############################

@api_view(['GET', 'POST', 'PATCH', 'DELETE'])
def user_api(request):

    #register the user, if good, returns details on user and status 200, returns 400 and errors otherwise
    if request.method == 'POST':   
        respon = register_user(request)
        return respon

    #check if user is logged in, return 401 if not
    if request.user.is_authenticated == False:
        return Response(data='You are not logged in!', status=status.HTTP_401_UNAUTHORIZED)

    else:

        #This gets the user account and linked data for updates
        if request.method=='GET':
            respon = get_user(request)
            return respon

        #This handles updates, please insert all values an account type is meant to have + email
        if request.method == 'PATCH':
            res = update_user(request)
            return res
            # try:
            #     account = Account.objects.exclude(pk=request.user).get(email=request.data['email'])
            #     return Response(data='This email is already in use!', status=status.HTTP_400_BAD_REQUEST)
            # except Account.DoesNotExist:
            #     form = {}
            #     emailform={}
            #     emailform['email'] = request.data['email']
            # if request.user.account_role == Account_Role.objects.get(role_name='Customer'):
            #     try: 
            #         phonetest = Customer.objects.exclude(account=request.user).get(phone_number=request.data['phone_number'])
            #         return Response(data='Phone number already in use!', status=status.HTTP_400_BAD_REQUEST)
            #     except Customer.DoesNotExist: 
            #         try:
            #             cardtest = Customer.objects.exclude(account=request.user).get(credit_card_no=request.data['credit_card_no'])
            #             return Response(data='Card number already in use!', status=status.HTTP_400_BAD_REQUEST)
            #         except Customer.DoesNotExist:
            #             form['credit_card_no'] = request.data['credit_card_no']
            #     form['first_name'] = request.data['first_name']
            #     form['last_name'] = request.data['last_name']
            #     form['address'] = request.data['address']
            #     form['phone_number'] = request.data['phone_number']
            #     AdministratorFuncade.update_customer(account=request.user, form=form, emailform=emailform)

            # elif request.user.account_role == Account_Role.objects.get(role_name='Airline'):
            #     country = Country.objects.get(country_name=request.data['country'])
            #     form['country'] =  country
            #     form['name'] = request.data['name']
            #     Airline_Facade.update_airline(account=request.user, form=form, emailform=emailform)
            # elif request.user.is_superuser == True:
            #     AdministratorFuncade.update_account(account=request.user, form=emailform)
            # elif request.user.is_admin == True:
            #     form['first_name'] = request.data['first_name']
            #     form['last_name'] = request.data['last_name']
            #     AdministratorFuncade.update_admin(account=request.user, form=form.cleaned_data, emailform=emailform.cleaned_data)
            # else: 
            #     return Response(data='This account seems to not be any user type. Please contact an admin.', status=status.HTTP_400_BAD_REQUEST)

            # return Response(f'Account for {request.user.account_role} {request.user.username} updated successfully')

        #This will be to delete current user. 
        if request.method == 'DELETE':  
            print(request.data)
            return Response('Extra feature! it may not be in use by the final product but if we want to, its here for us to implement.')

##################### ADMIN ACTIONS ############################

#For either viewing all accounts of a certain type (POST), searching a specific type (POST) or changing an account role (PATCH)
@api_view(['POST', 'PATCH'])
def admin_api(request):
    # if request.user.is_authenticated == False:
    #      return Response(data='You are not logged in!', status=status.HTTP_401_UNAUTHORIZED)
    # if request.user.is_admin == False:
    #      return Response(data='Must be admin to use!', status=status.HTTP_401_UNAUTHORIZED)
    
    #this expects you to enter a view value (Airlines, Admins, Customers, Specific, Accounts)
    #it will either return all accounts of that type
    #if you use specific, state a username and it will return it
    if request.method == 'POST':
        res = get_users_admin(request)
        return res

    #to use this, you must enter a make value (Customer, Airline, Admin) and give it the necessary fields
    #it will make an account into that type
    if request.method == 'PATCH':   
        print(request.data)
        res = change_account_role(request)
        return res


#deletes a given account by the username value
@api_view(['DELETE'])
def admin_delete(request, username):
    if request.user.is_authenticated == False:
         return Response(data='You are not logged in!', status=status.HTTP_401_UNAUTHORIZED)
    if request.user.is_admin == False:
         return Response(data='Must be admin to use!', status=status.HTTP_401_UNAUTHORIZED)

    if request.method == 'DELETE':
        res = delete_full_account(request, username)
        return res

##################################################
##################################################





def test(request):
    return render(request,'testblock.html')
#     #  return render(request,'flight_search.html')
#     # return render(request,'members_home.html')


def user_login(request):
    context = {}
    logged = False
    #data = data=request.POST is the only way to get AuthenticationForm to pass
    new_login = Login(data=request.POST)

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
        new_login = Login()
        context['login_form'] = new_login 

    return render(request, 'login_page.html', context)


def homeview(request):

    if request.user.is_authenticated:
        if request.user.is_superuser or request.user.is_admin:
                return redirect('admin home')
        return redirect('members home')

    return render(request, 'anony_home.html')





def on_login(request):
    if request.user.is_authenticated:
        # account_type_lst = ['Customer', 'Airline']
        account_id = request.user.id
        account_type = request.user.account_role

        if request.user.is_superuser or request.user.is_admin: 
            return view_all_customers(request)
            
        elif account_type == Account_Role.objects.get(role_name='Customer'):
          account = Customer.objects.get(account_id = account_id).first_name
          return get_my_tickets(request)

        elif account_type == Account_Role.objects.get(role_name = 'Airline'):
            account = Airline.objects.get(account_id = account_id).name
            return view_flights_by_airline(request)

    return redirect('login')






def context_ext(request):

    try:
        account_type = request.user.account_role
    except AttributeError:
        return 'anony_home.html'
    if request.user.is_superuser or request.user.is_admin:
        return 'admin_home.html'
    if account_type == Account_Role.objects.get(role_name='Customer'):
        return "cust_home.html"
    elif account_type == Account_Role.objects.get(role_name = 'Airline'):
        return 'airline_home.html'


def user_ui(request):
    request.account


def view_all_flights (request):
    all_flights = BaseFuncade.get_all_flights()
    context = {
        'flight_list' : all_flights, 
        'title':  'All Flights',
        'extension': context_ext(request)
    }
    return render(request, "flight_disp.html", context)



#shows contries info , if no argument was sent it shows all

def view_all_countries(request):
    all_countries = BaseFuncade.get_all_countries()
    context = {
        'country_list' : all_countries, 
        'title':  'All Countries',
        'extension': context_ext(request)
    }

    return render(request, "countries_disp.html", context)



def view_all_airlines(request):
    all_airlines = BaseFuncade.get_all_airlines()
    context = {
        'airline_list' : all_airlines, 
        'title': 'All Arilines',
        'extension': context_ext(request)
    }

    # return render(request, "airline_disp.html", {'airline_list' : all_airlines, 'title': 'All Arilines' })
    return render(request, "airline_disp.html",context)










def view_flights_by_params(request):
    airline_id_form = flights_by_params(request.POST)   
    if request.POST:
        if airline_id_form.is_valid():
            pass

        else:
            
            flights_by_params()
      
    context = {
        'form':airline_id_form,
        'title': "Search Airline by id", 
        "button": "Search",
        'extension': context_ext(request)
     }

    return render(request, 'form_template.html', context)






def view_departure_by_country(request, flag = False):
    form = departure_arrival_flights(request.POST)   
    if request.POST:
        if form.is_valid():
            country_id = form.cleaned_data['country_id']
            furure = datetime.datetime.now() + datetime.timedelta(hours = 12)

            if not flag:
                departure = Flight.objects\
                .filter(origin_country_id = country_id)\
                .filter(departure_time__lt = furure)
                context = {'flight_list': departure, 
                'title': 'Departure By ID',
                'extension': context_ext(request)
                 }


            else:                
                arrival = Flight.objects\
                .filter(destination_country_id = country_id)\
                .filter(landing_time__lt = furure)
                context = {'flight_list': arrival, 
                'title': 'Arrival By ID',
                'extension': context_ext(request)
                 }

            return render(request, "flight_disp.html", context)
        else:
            
            departure_arrival_flights()


    context = {'form':form,'extension': context_ext(request),"button": "Search" }
    if not flag:
        context.update({'title': "Departure Flights By Country" })
    else:
        context.update({'title': "Arrival Flights By Country" })

    return render(request, 'form_template.html', context)




def view_arrival_by_country(request):
   return  view_departure_by_country(request, True)



def context_builder(request,form, title, button):
    context = {
        'form':form,
        'title': title, 
        "button": button,
        'extension': context_ext(request)
              
        }



def view_flights_by_airline_cust(request):
    airline_id_form = airline_by_id(request.POST)   
    if request.POST:
        if airline_id_form.is_valid():

            flight_list = Flight.objects.filter(airline_id = airline_id_form.cleaned_data['airline_id'])

            context = {
                'flight_list': flight_list,
                'title': 'Flights By Airline',
                'extension': context_ext(request)
                 }


            return render(request, "flight_disp.html",  context)
        else:
             airline_by_id()
    
      
    context = {
        'form':airline_id_form,
        'title': "Search Flights by Airline", 
        "button": "Search",
        'extension': context_ext(request)
     }

    return render(request, 'form_template.html', context)




def view_airline_by_country(request):

    country_id_form = country_by_id(request.POST)   
    if request.POST:
        if country_id_form.is_valid():
            airline_list = Airline.objects.filter(country_id = country_id_form.cleaned_data['country_id'])
            context = {
                'airline_list': airline_list,
                'title': 'Airline by Country',
                'extension': context_ext(request)
                 }


            return render(request, "airline_disp.html", context)
        else:
             country_by_id()
    
      
    context = {
        'form':country_id_form,
        'title': "Airline by Country", 
        "button": "Search",
        'extension': context_ext(request)
     }

    return render(request, 'form_template.html', context)        

    



#shows all flights for the airline that's logged in. shows nothing if not logged in as an airline
@login_required()
def view_flights_by_airline(request):

    airline = Airline.objects.filter(account=request.user.id)
    try:
        airline = airline[0]
        flights = Airline_Facade.get_my_flights(airline.id)
        context = {
            'Flights': flights,
            'Airline': airline,
            'extension': context_ext(request)
            }
    except: 
        context = {'Flights': None, 
                    'Airline': 'You are not logged in as an airline. You may not view this',
                    'extension': context_ext(request)
                    }

    return render(request, 'airline_home.html', context)              
    # return render(request, 'airline_get_flights.html', context)






#takes a flight_id, deletes it if you're logged in as the airline that flight belongs to.
@login_required()
def delete_flight_for_airline(request, flight_id):
    if request.user.account_role != Account_Role.objects.get(role_name='Airline'):
        return HttpResponse('You are not logged in as an Airline. Please login')
    airline = Airline.objects.get(account=request.user)
    
    result = Airline_Facade.remove_flight(flight_id, airline)
    if result == 1:
        return redirect("airline view flights")

#shows all customers (or accounts if we mark in that line). if not admin, doesn't let access
@login_required()
def view_all_customers(request):
    # admin_role = Account_Role.objects.get(role_name='Admin')
    # if request.user.account_role != admin_role:

    if not (request.user.is_admin or request.user.is_superuser):
        return HttpResponse('You are not logged in as an Admin. Please login')
    customers = AdministratorFuncade.get_all_customers()
    #accounts = AdministratorFuncade.get_all_accounts()
    context = {'customers':customers, 'extension': context_ext(request)}
    return render(request, 'view_all_customers.html', context)

@login_required
def view_all_admins(request):
    if not (request.user.is_admin or request.user.is_superuser):
        return HttpResponse('You are not logged in as an Admin. Please login')
    admins = AdministratorFuncade.get_all_admins(request.user)
    context = {'users':admins, 'type':'Admins', 'extension': context_ext(request)}
    return render(request, 'view_all.html', context)

@login_required
def view_all_airlines_admin(request):
    if not (request.user.is_admin or request.user.is_superuser):
        return HttpResponse('You are not logged in as an Admin. Please login')
    airlines = AdministratorFuncade.get_all_airlines()
    context = {'users':airlines, 'type':'Airlines', 'extension': context_ext(request)}
    return render(request, 'view_all.html', context)

#takes user account, gets it by username, deletes account and associated details
@login_required()
def delete_user_admin(request, account):
    if not (request.user.is_admin or request.user.is_superuser):
        return HttpResponse('You are not logged in as an Admin. Please login')
    acc = AdministratorFuncade.get_by_username(account)
    print(acc)
    if acc['account_role'] == 'Customer':
        AdministratorFuncade.remove_customer(acc['user'])
    elif acc['account_role'] == 'Airline':
        AdministratorFuncade.remove_airline(acc['user'])
    elif acc['account_role'] == 'Admin':
        AdministratorFuncade.remove_admin(acc['user'])
    AdministratorFuncade.remove_account(acc['account'])
    return redirect('admin home')

#lets airline fill in form for new flight
@login_required()
def airline_add_flight(request):
    if request.user.account_role != Account_Role.objects.get(role_name='Airline'):
        return HttpResponse('You are not logged in as an Airline. Please login')
    airline = Airline.objects.get(account=request.user)

    flightform = NewFlightForm(request.POST or None)
    if request.method =='POST':
        if flightform.is_valid():
            flight = Flight()
            Airline_Facade.add_flight(airline.id, flightform.cleaned_data, flight)
            return redirect("airline view flights")
    context = {
        'form': flightform,
        'extension': context_ext(request)
    }
    return render(request, 'form_template.html', context)


#takes flight id as peremeter, let's user update said flight. denies them if flight does not exist or user is not the airline for this flight
@login_required()
def airline_update_flight(request, flight_id):
    if request.user.account_role != Account_Role.objects.get(role_name='Airline'):
        return HttpResponse('You are not logged in as an Airline. Please login')
    airline = Airline.objects.get(account=request.user)

    #if flight does not exist, raises http404
    try:
        instance = (BaseFuncade.get_flight_by_id(flight_id))[0]
    except:
        raise Http404('Flight does not exist')

    #if you're not logged in as the airline for this flight, raises permission deny
    if airline != instance.airline:
        raise PermissionDenied("This is not your flight! You may not update it")

    if request.method =='POST':
        flightform = NewFlightForm(request.POST, instance=instance)
        if flightform.is_valid():
            
            flightform.save()
            #Airline_Facade.update_flight(airline.id, flightform.cleaned_data, instance)
            return redirect("airline view flights")
    else: flightform = NewFlightForm(instance=instance)
    context = {
        'form': flightform,
        'extension': context_ext(request)
    }
    return render(request, 'form_template.html', context)


#takes user account, makes it a customer and deletes airline/admin account
@login_required()
def add_customer_admin(request, account):
    if not (request.user.is_admin or request.user.is_superuser):
        return HttpResponse('You are not logged in as an Admin. Please login')
    user = AdministratorFuncade.get_by_username(account)
    if user['account_role'] == 'Airline':
        form = NewCustomerForm(request.POST or None)
    elif user['account_role'] == 'Admin':
        form = NewCustomerfromAdminForm(request.POST or None)
    elif user['account_role'] == 'SuperUser':
        return HttpResponse('The Superuser may not be changed')
    else: return HttpResponse('This is already a customer!')

    if request.method =='POST':
        if form.is_valid():
            AdministratorFuncade.add_customer_admin_command(account=user['account'], form=form.cleaned_data)
            return redirect('home')
    context = {
        'form': form,
        'extension': context_ext(request)
    }
    return render(request, 'form_template.html', context)

#takes user account, makes it an airline and deletes customer/admin account
@login_required()
def add_airline(request, account):
    if not (request.user.is_admin or request.user.is_superuser):
        return HttpResponse('You are not logged in as an Admin. Please login')
    user = AdministratorFuncade.get_by_username(account)
    if user['account_role'] == 'Airline':
        return HttpResponse('User is already an airline!')
    elif user['account_role'] == 'SuperUser':
        return HttpResponse('The Superuser may not be changed')
    
    form = AirlineUpdateForm(request.POST or None)
    if request.method =='POST':
        if form.is_valid():
            AdministratorFuncade.add_airline(form=form.cleaned_data, account=user['account'])
            return redirect("view all airlines admin")
    context = {
        'form': form,
        'extension': context_ext(request)
    }
    return render(request, 'form_template.html', context)

#takes user account, makes it an admin and deletes customer/airline account
@login_required()
def add_admin(request, account):
    if not (request.user.is_admin or request.user.is_superuser):
        return HttpResponse('You are not logged in as an Admin. Please login')
    user = AdministratorFuncade.get_by_username(account)
    if user['account_role'] == 'Airline':
        form = AdminUpdateForm(request.POST or None)
        if request.method =='POST':
            if form.is_valid():
                AdministratorFuncade.add_admin(form=form.cleaned_data, account=user['account'])
                return redirect("view all admins")
        context = {
        'form': form,
        'extension': context_ext(request)
            }
        return render(request, 'form_template.html', context)
    elif user['account_role'] == 'Customer':
        AdministratorFuncade.add_admin(account=user['account'])
        return redirect('admin home')
    else: return HttpResponse('This is already an Admin!')

@login_required()
def search_user(request):
    if not (request.user.is_admin or request.user.is_superuser):
        return HttpResponse('You are not logged in as an Admin. Please login')
    pass

@login_required()
def add_country(request):
    if not (request.user.is_admin or request.user.is_superuser):
        return HttpResponse('You are not logged in as an Admin. Please login')
    pass

@login_required()
def update_account(request):
    if request.user.account_role != Account_Role.objects.get(role_name='Customer'):
        return HttpResponse('You are not logged in as a Customer. Please login')
    try: instance = Customer.objects.get(account=request.user)
    except: raise Http404('Customer account does not exist. Please contact an administrator.')

    if request.method =='POST':
        cusform = NewCustomerForm(request.POST, instance=instance)
        emailform = AccountUpdateForm(request.POST, instance=request.user)
        if cusform.is_valid() and emailform.is_valid():
            print(request.user, cusform.cleaned_data, emailform.cleaned_data)
            CustomerFancade.update_customer(account=request.user, form=cusform.cleaned_data, emailform=emailform.cleaned_data)
            return redirect("home")
    else: 
        cusform = NewCustomerForm(instance = instance)
        emailform = AccountUpdateForm(instance=request.user)
    context = {
        'customer_registration_form':cusform,
        'user_registration_form':emailform,
        'title': f"Update {request.user}", 
        "button": f"Update the account: {request.user}"
    }
    return render(request, 'register.html', context)

#all in one update function. will update an account no matter its type including superusers
@login_required()
def update_user(request):
    if request.user.account_role == Account_Role.objects.get(role_name='Customer'):
        instance = Customer.objects.get(account=request.user)
        update_check = "customer"
    elif request.user.account_role == Account_Role.objects.get(role_name='Airline'):
        instance = Airline.objects.get(account=request.user)
        update_check = "airline"
    elif request.user.is_superuser == True:
        instance = None
        update_check = "superuser"
    elif request.user.is_admin == True:
        instance = Administrator.objects.get(account=request.user)
        update_check = "admin"
    else: 
        raise Http404('Account is missing. Please contact staff.')

    if request.method =='POST':
        if update_check == "customer": form = NewCustomerForm(request.POST, instance=instance)
        elif update_check == 'airline': form = AirlineUpdateForm(request.POST, instance=instance)
        elif update_check == 'admin': form = AdminUpdateForm(request.POST, instance=instance)
        else: form = None

        emailform = AccountUpdateForm(request.POST, instance=request.user)
        if emailform.is_valid():
            if update_check == "superuser":
                AdministratorFuncade.update_account(account=request.user, form=emailform.cleaned_data)
                return redirect("home")
            elif form.is_valid():
                print(request.user, form.cleaned_data, emailform.cleaned_data)
                if update_check == "customer": CustomerFancade.update_customer(account=request.user, form=form.cleaned_data, emailform=emailform.cleaned_data)
                elif update_check == 'airline': Airline_Facade.update_airline(account=request.user, form=form.cleaned_data, emailform=emailform.cleaned_data)
                elif update_check == 'admin': AdministratorFuncade.update_admin(account=request.user, form=form.cleaned_data, emailform=emailform.cleaned_data)
                return redirect("home")

    else: 
        if update_check == "customer": form = NewCustomerForm(instance=instance)
        elif update_check == 'airline': form = AirlineUpdateForm(instance=instance)
        elif update_check == 'admin': form = AdminUpdateForm(instance=instance)
        else: form = None
        emailform = AccountUpdateForm(instance=request.user)
    context = {
        'customer_registration_form':form,
        'user_registration_form':emailform,
        'title': f"Update {request.user}", 
        "button": f"Update the account: {request.user}"
    }
    return render(request, 'register.html', context)











@login_required
def add_ticket(request):


    customer = Customer.objects.get(account_id = request.user.id )
    message = None

    new_ticket_form = NewTicketForm(request.POST)
    if request.method =='POST':
        if new_ticket_form.is_valid():
        # if Flight_Ticket.filter(account_id = customer.id):

            CustomerFancade.add_ticket(new_ticket_form.cleaned_data , customer.id)
            message = 'Ticket added successfully'
    context = {
        'form': new_ticket_form,
        'message': message,
        'title': "Add ticket",
        'button': 'add',
        'extension': context_ext(request)

        }
    # return render(request, 'add_ticket.html', context)
    return render(request, 'form_template.html', context)




@login_required
def get_my_tickets(request):
    customer = Customer.objects.get(account_id = request.user.id)
    all_my_tickets = CustomerFancade.get_my_tickets(customer.id)
    
    return render(request, "get_my_tickets.html", {'all_tickets': all_my_tickets})



@login_required
def remove_ticket(request):
    context= {}
    if request.user.is_authenticated:
        customer = Customer.objects.get(account_id = request.user.id)
        form = RemoveTicket(customer.id, request.POST )
        if request.method =='POST':
            if form.is_valid():
                CustomerFancade.remove_ticket(form.cleaned_data)   


        context = {
            'form':form,
            'title': "Remove Ticket", 
            "button": "remove",
            'extension': context_ext(request)
            
        }

        return render(request, 'form_template.html', context)
    else:
        return redirect('home')




@login_required
def remove_specific_ticket(request, ticket_id):
    customer = Customer.objects.get(account_id = request.user)
    ticket = Flight_Ticket.objects.get(pk = ticket_id)
    if customer != ticket.customer:
        return Http404('you are not the customer who purchased this ticket!')
    fakeform = {"ticket_id":ticket}
    CustomerFancade.remove_ticket(fakeform)
    return redirect('home')




#cannot be named 'login'



def logout(request):
    if request.user.is_authenticated:
        auth.logout(request)
        # return redirect('home')
        # return render(request,'logged_out.html')
    # else:
    return redirect('home')



def register_customer(request):
    return register(request , account_role=2)



def register_airline(request):
    register(request , account_role=1)



def register(request, account_role):
    context = {}
    account_role = Account_Role.objects.get(role_name='Customer')

    if request.POST:    
        user_form = RegistrationForm(request.POST)
        customer_form = NewCustomerForm(request.POST)

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
        user_form = RegistrationForm()
        customer_form = NewCustomerForm()
        context['user_registration_form'] = user_form 
        context['customer_registration_form'] = customer_form 
        context['button'] = 'register'
        # context2['customer_registration_form'] = customer_form 
        
    return render(request, 'register.html', context )









################################################
                # Old Methods
################################################


#old login method
# def login_page(request):
#     new_login = LoginForm(request.POST or None)
#     if request.method == 'POST':
#         if new_login.is_valid():
#             user_role , user_id = AnonymusFancade.login(new_login.cleaned_data)
#             if user_role == 2 :
#                 redirect_address =f'/backend/custloggedin/{user_id}'
#             if user_role == 1:
#                 redirect_address =f'/backend/airlineloggedin/{user_id}'
#                 return redirect(redirect_address)

#     return render(request, 'login_page.html', {'form': new_login})






# def add_new_user(request):
#     #temp
#     user_id = 0
#     message = None
#     new_user_id = BaseFuncade.create_new_user()

    # # new_user = NewUserForm(request.POST  or None)
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
#     new_user = NewUserForm(request.POST  or None)
#     new_customer = NewCustomerForm(request.POST or None)
#     if request.method =='POST':
#         if new_user.is_valid():
#             # 2 for customer role
#             new_user_id = BaseFuncade.create_new_user(2 , new_user.cleaned_data)
#             if new_customer.is_valid():
#                 AnonymusFancade.add_customer(new_user_id, new_customer.cleaned_data)
#                 redirect_address =  f'/backend/loggedin/{new_user_id}'
#                 return redirect(redirect_address)

#     context = {
#         'userform': new_user,
#         'custform': new_customer,
#         }
#     return render(request, 'create_customer_form.html', context)



# def new_user(request):
#     # new_user_form =  SignUpForm(request.POST or None)
#     new_user_form = SignUpForm(request.POST)

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
#         form = RegistrationForm(request.POST)
        
#         if form.is_valid():
#             BaseFuncade.create_new_user(form)
#             # print(form.cleaned_data)

#             # email = form.cleaned_data['email']
#             # raw_password = form.cleaned_data['password1']


#             # account = authenticate(email = email, password = raw_password)
#             # login(request,account)
#             # id = Account.objects.get(email = email) 
#             # print(id.id)
#             # print(id)


#             # form2 = {'user_id': id, 
#             #         'first_name': form.cleaned_data['first_name'], 
#             #         'last_name': form.cleaned_data['last_name'],
#             #         'credit_card_no': form.cleaned_data['credit_card_no'],
#             #         'address': form.cleaned_data['address'],
#             #         'phone_number': form.cleaned_data['phone_number']}
#             # AdministratorFuncade.add_customer2(form2)


#             account_role = Account_Role.objects.get(pk = 1)
#             id.account_role = account_role
#             id.save()
#             return redirect('home')
#         else:
#             context['registration_form'] = form
#     else:
#         form = RegistrationForm()
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



# def members_tickets(request):
# #     if request.user.is_authenticated:
# #         return render(request , 'add_ticket.html')
# #     return redirect('home.html')


# def show_flight_info (request):
#     # all_flights = BaseFuncade.get_all_flights()
#     # flight_by_id = BaseFuncade.get_flight_by_id(2)
#     flights_by_param = BaseFuncade.get_flights_by_parameters(1,2 , 50)
#     context = {
#         'all_flights' : all_flights,
#         # 'flight_by_id' :flight_by_id,
#         # 'flights_by_param' : flights_by_param,
#     }
#     return render(request, "flight_info.html", context)





# def show_airline_info(request):
#     # all_airlines = BaseFuncade.get_all_airlines()
#     # airline_by_id = BaseFuncade.get_airline_by_id(1)
#     airline_by_params = BaseFuncade.get_airline_by_parameters('CrashAir', 1 , 2)

#     context = {
#         # 'all_airlines' : all_airlines,
#         'airline_by_id' :airline_by_id,
#         'airline_by_params' : airline_by_params,
#     }
#     return render(request, "airline_info.html", context)





# def show_country_by_id(request, country_id):
#     country_by_id = BaseFuncade.get_country_by_id(country_id)
#     context = {
#         'country_by_id' :country_by_id,
#     }
#     return render(request, "country_by_id.html", context)



#def view_flights_by_id(request):
#     flight_id_form = flight_by_id(request.POST)   
#     if request.POST:
#         if flight_id_form.is_valid():   
#             flight_list = BaseFuncade.get_flight_by_id(flight_id_form.cleaned_data[0].id)
              
            
#             return render(request, "flight_disp.html", {'flight_list': flight_list,'title': 'Flight By ID' })

#         else:
#             flight_by_id()
    
#     context = {
#         'form':flight_id_form,
#         'title': "Search Flight by id", 
#         "button": "Search"
#      }

#     return render(request, 'form_template.html', context)


#def view_flights_by_id(request):
#     flight_id_form = flight_by_id(request.POST)   
#     if request.POST:
#         if flight_id_form.is_valid():   
#             flight_list = BaseFuncade.get_flight_by_id(flight_id_form.cleaned_data[0].id)
              
            
#             return render(request, "flight_disp.html", {'flight_list': flight_list,'title': 'Flight By ID' })

#         else:
#             flight_by_id()
    
#     context = {
#         'form':flight_id_form,
#         'title': "Search Flight by id", 
#         "button": "Search"
#      }

#     return render(request, 'form_template.html', context)


#def view_countries_by_id(request):
#     country_id_form = country_by_id(request.POST)   
#     if request.POST:
#         if country_id_form.is_valid():   
#             country_list = BaseFuncade.get_country_by_id(country_id_form.cleaned_data['country_id'])

#             return render(request, "countries_disp.html", {'country_list': country_list,'title': 'Country By ID' })
     
#         else:
#             country_by_id()

#     context = {
#         'form':country_id_form,
#         'title': "Search country by id", 
#         "button": "Search"
#      }

#     return render(request, 'form_template.html', context)


#def view_airline_by_id(request):
#     airline_id_form = airline_by_id(request.POST)   
#     if request.POST:
#         if airline_id_form.is_valid():
#             country_id = departure_form.cleaned_data['country_id']
#             airline_list = BaseFuncade.get_airline_by_id(airline_id_form.cleaned_data['airline_id'])
                       
#             return render(request, "airline_disp.html", {'airline_list': airline_list,'title': 'Airline By ID' })
#         else:
#              airline_by_id()
    
      
#     context = {
#         'form':airline_id_form,
#         'title': "Search Airline by id", 
#         "button": "Search"
#      }

#     return render(request, 'form_template.html', context)



# tranlate country id to name
# def view_airline_by_params(request):
#     context = {}
#     airline_params_form = airline_by_params(request.POST)   
#     if request.POST:
#         if airline_params_form.is_valid():
#             params = airline_params_form.cleaned_data 
#             pass

#             # airline_list = BaseFuncade.get_airline_by_parameters(params[].cleaned_data, params['country_id'])

#             # BaseFuncade.get_airline_by_parameters(airline_name, country_id)


#             # return render(request, "airline_disp.html", {'flight_list': airline_list,'title': 'Airline By Params' })
        


#     context = {
#         'form':airline_params_form,
#         'title': "Search Airline", 
#         "button": "Search"
#      }

#     return render(request, 'form_template.html', context)




# def view_flights_by_params(request):
#     flight_params_form = country_by_id(request.POST)   
#     if request.POST:
#         airline_id_form = airline_by_id(request.POST)   
#         if flight_params_form.is_valid():
#             flight_list = []
#             return render(request, "flight_disp.html", {'flight_list': flight_list,'title': 'Flight By ID' })
        


#         context = {
#         'form':flight_params_form,
#         'title': "Search flight by params", 
#         "button": "Search"
#      }

#     return render(request, 'form_template.html', context)




# def view_all_flights (request):
#     all_flights = BaseFuncade.get_all_flights()
#     return render(request, "flight_disp.html", {'flight_list' : all_flights, 'title': 'All Flights' })

# #shows contries info , if no argument was sent it shows all

# def view_all_countries(request):
#     all_countries = BaseFuncade.get_all_countries()
#     return render(request, "countries_disp.html", {'country_list': all_countries,'title': 'All Countries' })

# # def view_all_airlines(request):
# #     all_airlines = BaseFuncade.get_all_airlines()

# #     return render(request, "airline_disp.html", {'airline_list' : all_airlines, 'title': 'All Arilines' })

#ef show_country_search_from(request):

#     f = contact_from = country_id_search_form(request.POST or None) # reteins data even if the submit was invalid.
#     # print(request.GET)
#     if f.is_valid():
#         #print(f.cleaned_data.get('coutry_id'))
#         # cleans everything but the raw data submitted, prints only selected by get 'subject in this case
#         country_id = f.cleaned_data.get('country_id')

#         redirect_address = f'/backend/countryinfo/{country_id}'

#         return redirect(redirect_address)

#     context = {
#         'form' : contact_from,
#     }
#     return render(request,'search_country_page.html' , context)
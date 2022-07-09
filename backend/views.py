from .models import Flight, Country
from .DAL.admin_facade import AdministratorFuncade
# from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.decorators import api_view
import pytz
from .top_level_methods.user_api import *
from .top_level_methods.admin_api import *
from .top_level_methods.airline_api import *
from .top_level_methods.customer_api import *
from .top_level_methods.country_api import *
from .serializers import FlightSerializer, CountrySerializer
from rest_framework.generics import ListAPIView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .filters import *



utc=pytz.UTC



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
############### Filters ##########################

class Flightfilter(ListAPIView):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    # filter_backends = (DjangoFilterBackend)
    filterset_class = Flightfilter


# class TicketByUserfilter(ListAPIView):
#     queryset = Flight_Ticket.objects.all()
#     serializer_class = TicketSerializer
#     filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
#     filterset_class = Ticketfilter
    

class Countryfilterget(ListAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    # filter_backends = (DjangoFilterBackend)
    filterset_class = Countryfilter
    search_fields = ['country_name']
    

#########################################################
#################### Tickets ############################



@api_view(['GET', 'POST', 'DELETE'])
def tickets_api(request):
    
    result = Customer_API_Actions.are_you_a_customer(request)
    if result['result'] == False:
        return result
    else:
        customer = result['customer']
    
    if request.method == 'GET':
        mytickets = Customer_API_Actions.get_all_my_tickets(customer)
        return mytickets
    
    if request.method == 'POST':
        mytickets = Customer_API_Actions.add_ticket_api(request, customer)
        return mytickets

    if request.method == 'DELETE':
        mytickets = Customer_API_Actions.remove_ticket_api(request)    
        return mytickets
    


# @api_view(['GET'])
# def getfli(request, id):
#     flight = BaseFuncade.get_flight_by_id(id)
#     seralizer = FlightSerializer(flight, many = False)
#     return Response(seralizer.data)


####################################################
##################Airline###########################


# @api_view(['GET'])
# def allair(requset):
#     ailines =  Airline.objects.all()
#     seralizer = AirlineSerializer(ailines, many = True)
#     return Response(seralizer.data)

# @api_view(['GET'])
# def getair(requset, id):
#     airline = BaseFuncade.get_airline_by_id(id)
#     seralizer = AirlineSerializer(airline, many = False)
#     return Response(seralizer.data)


@api_view(['GET', 'POST'])
def airline_api(request):

    result = Airline_API_Actions.are_you_an_airline(request)
    if result['result'] == False:
        return result
    else:
        airline = (result['airline']).id

    #returns all of user's flights
    if request.method == 'GET':
        respon = Airline_API_Actions.get_all_my_flights(airline)
        return respon
    
    #creates a new flight based on post data
    if request.method == 'POST':
        respon = Airline_API_Actions.create_flight_airline_api(request, airline)
        return respon


@api_view(['PATCH','DELETE', 'GET'])
def airline_delete_update(request, id): 

    result = Airline_API_Actions.are_you_an_airline(request)
    if result['result'] == False:
        return result
    airline = result['airline']

    result = Airline_API_Actions.does_flight_exist_is_it_yours(airline,id)
    if result['result'] == False:
        return result['response']
    flight = result['flight']
        
    #returns specific flight data
    if request.method == 'GET':
        respon = Airline_API_Actions.get_specific_flight_airline_api(flight)
        return respon

    #updates specific flight
    if request.method == 'PATCH':
        respon = Airline_API_Actions.update_flight_airline_api(request=request, airline=airline.id, flight=flight)
        return respon
    
    #deletes specific flight
    if request.method=='DELETE':
        respon = Airline_API_Actions.remove_flight_airline_api(id, airline)
        return respon

####################################################
###################Country#########################3


@api_view(['GET', 'POST'])
def country_api(request):
    if request.method == 'GET':
        return Country_API_Actions.all_countries_api()
    Admin_API_Actions
    result = Admin_API_Actions.are_you_an_admin(request)
    if result != True:
        return result
    else:
        if request.method == 'POST':
            result = Country_API_Actions.create_country_api(request)
            return result




@api_view(['GET', 'PATCH', 'DELETE'])
def specific_country_api(request, id):
    if request.method == 'GET':
        result = Country_API_Actions.get_country_api(id)
        return result

    
    result = Admin_API_Actions.are_you_an_admin(request)
    if result != True:
        return result
    else:
        if request.method == 'PATCH':
            result = Country_API_Actions.update_country_api(request, id)
            return result 

        if request.method == 'DELETE':
            result = Country_API_Actions.delete_country_api
            return result 




# @api_view(['DELETE'])
# def deletecount(request, id):
#     country = BaseFuncade.get_country_by_id(id)
#     country.delete()
#     return Response("Deleted")




##################### ACCOUNT ACTIONS ############################

@api_view(['GET', 'POST', 'PUT', 'PATCH', 'DELETE'])
def user_api(request):
    
    #register the user, if good, returns details on user and status 200, returns 400 and errors otherwise
    if request.method == 'POST':   
        respon = User_API_Actions.register_user(request)
        return respon

    result = User_API_Actions.are_you_logged_in(request)
    if result != True:
        return result

    else:

        #This gets the user account and linked data for updates
        if request.method=='GET':
            respon = User_API_Actions.get_user(request)
            return respon

        #This handles updates, please insert all values an account type is meant to have + email
        if request.method == 'PUT':
            res = User_API_Actions.update_user_user_api(request)
            return res

        #This handles password updates
        if request.method == 'PATCH':
            res = User_API_Actions.change_password(request)
            return res


        #This will be to delete current user. 
        if request.method == 'DELETE':  
            return Response('Extra feature! it may not be in use by the final product but if we want to, its here for us to implement.')

##################### ADMIN ACTIONS ############################

#For either viewing all accounts of a certain type (POST), searching a specific type (POST) or changing an account role (PATCH)
@api_view(['POST', 'PATCH'])
def admin_api(request):
    result = Admin_API_Actions.are_you_an_admin(request)
    if result != True:
        return result
    
    if request.method == 'POST':
        res = Admin_API_Actions.get_users_admin(request)
        return res

    if request.method == 'PATCH':   
        res = Admin_API_Actions.change_account_role(request)
        return res


#deletes a given account by the username value
@api_view(['DELETE'])
def admin_delete(request, username):
    result = Admin_API_Actions.are_you_an_admin(request)
    if result != True:
        return result

    if request.method == 'DELETE':
        res = Admin_API_Actions.delete_full_account(request, username)
        return res

##################################################
##################################################





# def test(request):
#     return render(request,'testblock.html')
# #     #  return render(request,'flight_search.html')
# #     # return render(request,'members_home.html')


# def user_login(request):
#     context = {}
#     logged = False
#     #data = data=request.POST is the only way to get AuthenticationForm to pass
#     new_login = Login(data=request.POST)

#     if request.method == 'POST':
#         if new_login.is_valid():
#             logged = AnonymusFancade.login(request, new_login.cleaned_data)
#             if logged:
#                 return redirect('home')
#             else:
           
#                 raise PermissionDenied()
#         else:
#             context['login_form'] = new_login 
#             # return render(request, 'form_test.html', {'form':new_login})
#     else:
#         new_login = Login()
#         context['login_form'] = new_login 

#     return render(request, 'login_page.html', context)


# def homeview(request):

#     if request.user.is_authenticated:
#         if request.user.is_superuser or request.user.is_admin:
#                 return redirect('admin home')
#         return redirect('members home')

#     return render(request, 'anony_home.html')





# def on_login(request):
#     if request.user.is_authenticated:
#         # account_type_lst = ['Customer', 'Airline']
#         account_id = request.user.id
#         account_type = request.user.account_role

#         if request.user.is_superuser or request.user.is_admin: 
#             return view_all_customers(request)
            
#         elif account_type == Account_Role.objects.get(role_name='Customer'):
#           account = Customer.objects.get(account_id = account_id).first_name
#           return get_my_tickets(request)

#         elif account_type == Account_Role.objects.get(role_name = 'Airline'):
#             account = Airline.objects.get(account_id = account_id).name
#             return view_flights_by_airline(request)

#     return redirect('login')






# def context_ext(request):

#     try:
#         account_type = request.user.account_role
#     except AttributeError:
#         return 'anony_home.html'
#     if request.user.is_superuser or request.user.is_admin:
#         return 'admin_home.html'
#     if account_type == Account_Role.objects.get(role_name='Customer'):
#         return "cust_home.html"
#     elif account_type == Account_Role.objects.get(role_name = 'Airline'):
#         return 'airline_home.html'


# def user_ui(request):
#     request.account


# def view_all_flights (request):
#     all_flights = BaseFuncade.get_all_flights()
#     context = {
#         'flight_list' : all_flights, 
#         'title':  'All Flights',
#         'extension': context_ext(request)
#     }
#     return render(request, "flight_disp.html", context)



# #shows contries info , if no argument was sent it shows all

# def view_all_countries(request):
#     all_countries = BaseFuncade.get_all_countries()
#     context = {
#         'country_list' : all_countries, 
#         'title':  'All Countries',
#         'extension': context_ext(request)
#     }

#     return render(request, "countries_disp.html", context)



# def view_all_airlines(request):
#     all_airlines = BaseFuncade.get_all_airlines()
#     context = {
#         'airline_list' : all_airlines, 
#         'title': 'All Arilines',
#         'extension': context_ext(request)
#     }

#     # return render(request, "airline_disp.html", {'airline_list' : all_airlines, 'title': 'All Arilines' })
#     return render(request, "airline_disp.html",context)










# def view_flights_by_params(request):
#     airline_id_form = flights_by_params(request.POST)   
#     if request.POST:
#         if airline_id_form.is_valid():
#             pass

#         else:
            
#             flights_by_params()
      
#     context = {
#         'form':airline_id_form,
#         'title': "Search Airline by id", 
#         "button": "Search",
#         'extension': context_ext(request)
#      }

#     return render(request, 'form_template.html', context)






# def view_departure_by_country(request, flag = False):
#     form = departure_arrival_flights(request.POST)   
#     if request.POST:
#         if form.is_valid():
#             country_id = form.cleaned_data['country_id']
#             furure = datetime.datetime.now() + datetime.timedelta(hours = 12)

#             if not flag:
#                 departure = Flight.objects\
#                 .filter(origin_country_id = country_id)\
#                 .filter(departure_time__lt = furure)
#                 context = {'flight_list': departure, 
#                 'title': 'Departure By ID',
#                 'extension': context_ext(request)
#                  }


#             else:                
#                 arrival = Flight.objects\
#                 .filter(destination_country_id = country_id)\
#                 .filter(landing_time__lt = furure)
#                 context = {'flight_list': arrival, 
#                 'title': 'Arrival By ID',
#                 'extension': context_ext(request)
#                  }

#             return render(request, "flight_disp.html", context)
#         else:
            
#             departure_arrival_flights()


#     context = {'form':form,'extension': context_ext(request),"button": "Search" }
#     if not flag:
#         context.update({'title': "Departure Flights By Country" })
#     else:
#         context.update({'title': "Arrival Flights By Country" })

#     return render(request, 'form_template.html', context)




# def view_arrival_by_country(request):
#    return  view_departure_by_country(request, True)



# def context_builder(request,form, title, button):
#     context = {
#         'form':form,
#         'title': title, 
#         "button": button,
#         'extension': context_ext(request)
              
#         }



# def view_flights_by_airline_cust(request):
#     airline_id_form = airline_by_id(request.POST)   
#     if request.POST:
#         if airline_id_form.is_valid():

#             flight_list = Flight.objects.filter(airline_id = airline_id_form.cleaned_data['airline_id'])

#             context = {
#                 'flight_list': flight_list,
#                 'title': 'Flights By Airline',
#                 'extension': context_ext(request)
#                  }


#             return render(request, "flight_disp.html",  context)
#         else:
#              airline_by_id()
    
      
#     context = {
#         'form':airline_id_form,
#         'title': "Search Flights by Airline", 
#         "button": "Search",
#         'extension': context_ext(request)
#      }

#     return render(request, 'form_template.html', context)




# def view_airline_by_country(request):

#     country_id_form = country_by_id(request.POST)   
#     if request.POST:
#         if country_id_form.is_valid():
#             airline_list = Airline.objects.filter(country_id = country_id_form.cleaned_data['country_id'])
#             context = {
#                 'airline_list': airline_list,
#                 'title': 'Airline by Country',
#                 'extension': context_ext(request)
#                  }


#             return render(request, "airline_disp.html", context)
#         else:
#              country_by_id()
    
      
#     context = {
#         'form':country_id_form,
#         'title': "Airline by Country", 
#         "button": "Search",
#         'extension': context_ext(request)
#      }

#     return render(request, 'form_template.html', context)        

    



# #shows all flights for the airline that's logged in. shows nothing if not logged in as an airline
# @login_required()
# def view_flights_by_airline(request):

#     airline = Airline.objects.filter(account=request.user.id)
#     try:
#         airline = airline[0]
#         flights = Airline_Facade.get_my_flights(airline.id)
#         context = {
#             'Flights': flights,
#             'Airline': airline,
#             'extension': context_ext(request)
#             }
#     except: 
#         context = {'Flights': None, 
#                     'Airline': 'You are not logged in as an airline. You may not view this',
#                     'extension': context_ext(request)
#                     }

#     return render(request, 'airline_home.html', context)              
#     # return render(request, 'airline_get_flights.html', context)






# #takes a flight_id, deletes it if you're logged in as the airline that flight belongs to.
# @login_required()
# def delete_flight_for_airline(request, flight_id):
#     if request.user.account_role != Account_Role.objects.get(role_name='Airline'):
#         return HttpResponse('You are not logged in as an Airline. Please login')
#     airline = Airline.objects.get(account=request.user)
    
#     result = Airline_Facade.remove_flight(flight_id, airline)
#     if result == 1:
#         return redirect("airline view flights")

# #shows all customers (or accounts if we mark in that line). if not admin, doesn't let access
# @login_required()
# def view_all_customers(request):
#     # admin_role = Account_Role.objects.get(role_name='Admin')
#     # if request.user.account_role != admin_role:

#     if not (request.user.is_admin or request.user.is_superuser):
#         return HttpResponse('You are not logged in as an Admin. Please login')
#     customers = AdministratorFuncade.get_all_customers()
#     #accounts = AdministratorFuncade.get_all_accounts()
#     context = {'customers':customers, 'extension': context_ext(request)}
#     return render(request, 'view_all_customers.html', context)

# @login_required
# def view_all_admins(request):
#     if not (request.user.is_admin or request.user.is_superuser):
#         return HttpResponse('You are not logged in as an Admin. Please login')
#     admins = AdministratorFuncade.get_all_admins(request.user)
#     context = {'users':admins, 'type':'Admins', 'extension': context_ext(request)}
#     return render(request, 'view_all.html', context)

# @login_required
# def view_all_airlines_admin(request):
#     if not (request.user.is_admin or request.user.is_superuser):
#         return HttpResponse('You are not logged in as an Admin. Please login')
#     airlines = AdministratorFuncade.get_all_airlines()
#     context = {'users':airlines, 'type':'Airlines', 'extension': context_ext(request)}
#     return render(request, 'view_all.html', context)

# #takes user account, gets it by username, deletes account and associated details
# @login_required()
# def delete_user_admin(request, account):
#     if not (request.user.is_admin or request.user.is_superuser):
#         return HttpResponse('You are not logged in as an Admin. Please login')
#     acc = AdministratorFuncade.get_by_username(account)
#     if acc['account_role'] == 'Customer':
#         AdministratorFuncade.remove_customer(acc['user'])
#     elif acc['account_role'] == 'Airline':
#         AdministratorFuncade.remove_airline(acc['user'])
#     elif acc['account_role'] == 'Admin':
#         AdministratorFuncade.remove_admin(acc['user'])
#     AdministratorFuncade.remove_account(acc['account'])
#     return redirect('admin home')

# #lets airline fill in form for new flight
# @login_required()
# def airline_add_flight(request):
#     if request.user.account_role != Account_Role.objects.get(role_name='Airline'):
#         return HttpResponse('You are not logged in as an Airline. Please login')
#     airline = Airline.objects.get(account=request.user)

#     flightform = NewFlightForm(request.POST or None)
#     if request.method =='POST':
#         if flightform.is_valid():
#             flight = Flight()
#             Airline_Facade.add_flight(airline.id, flightform.cleaned_data, flight)
#             return redirect("airline view flights")
#     context = {
#         'form': flightform,
#         'extension': context_ext(request)
#     }
#     return render(request, 'form_template.html', context)


#takes flight id as peremeter, let's user update said flight. denies them if flight does not exist or user is not the airline for this flight
# @login_required()
# def airline_update_flight(request, flight_id):
#     if request.user.account_role != Account_Role.objects.get(role_name='Airline'):
#         return HttpResponse('You are not logged in as an Airline. Please login')
#     airline = Airline.objects.get(account=request.user)

#     #if flight does not exist, raises http404
#     try:
#         instance = (BaseFuncade.get_flight_by_id(flight_id))[0]
#     except:
#         raise Http404('Flight does not exist')

#     #if you're not logged in as the airline for this flight, raises permission deny
#     if airline != instance.airline:
#         raise PermissionDenied("This is not your flight! You may not update it")

#     if request.method =='POST':
#         flightform = NewFlightForm(request.POST, instance=instance)
#         if flightform.is_valid():
            
#             flightform.save()
#             #Airline_Facade.update_flight(airline.id, flightform.cleaned_data, instance)
#             return redirect("airline view flights")
#     else: flightform = NewFlightForm(instance=instance)
#     context = {
#         'form': flightform,
#         'extension': context_ext(request)
#     }
#     return render(request, 'form_template.html', context)


#takes user account, makes it a customer and deletes airline/admin account
# @login_required()
# def add_customer_admin(request, account):
#     if not (request.user.is_admin or request.user.is_superuser):
#         return HttpResponse('You are not logged in as an Admin. Please login')
#     user = AdministratorFuncade.get_by_username(account)
#     if user['account_role'] == 'Airline':
#         form = NewCustomerForm(request.POST or None)
#     elif user['account_role'] == 'Admin':
#         form = NewCustomerfromAdminForm(request.POST or None)
#     elif user['account_role'] == 'SuperUser':
#         return HttpResponse('The Superuser may not be changed')
#     else: return HttpResponse('This is already a customer!')

#     if request.method =='POST':
#         if form.is_valid():
#             AdministratorFuncade.add_customer_admin_command(account=user['account'], form=form.cleaned_data)
#             return redirect('home')
#     context = {
#         'form': form,
#         'extension': context_ext(request)
#     }
#     return render(request, 'form_template.html', context)




#takes user account, makes it an airline and deletes customer/admin account
# @login_required()
# def add_airline(request, account):
#     if not (request.user.is_admin or request.user.is_superuser):
#         return HttpResponse('You are not logged in as an Admin. Please login')
#     user = AdministratorFuncade.get_by_username(account)
#     if user['account_role'] == 'Airline':
#         return HttpResponse('User is already an airline!')
#     elif user['account_role'] == 'SuperUser':
#         return HttpResponse('The Superuser may not be changed')
    
#     form = AirlineUpdateForm(request.POST or None)
#     if request.method =='POST':
#         if form.is_valid():
#             AdministratorFuncade.add_airline(form=form.cleaned_data, account=user['account'])
#             return redirect("view all airlines admin")
#     context = {
#         'form': form,
#         'extension': context_ext(request)
#     }
#     return render(request, 'form_template.html', context)

#takes user account, makes it an admin and deletes customer/airline account
# @login_required()
# def add_admin(request, account):
#     if not (request.user.is_admin or request.user.is_superuser):
#         return HttpResponse('You are not logged in as an Admin. Please login')
#     user = AdministratorFuncade.get_by_username(account)
#     if user['account_role'] == 'Airline':
#         form = AdminUpdateForm(request.POST or None)
#         if request.method =='POST':
#             if form.is_valid():
#                 AdministratorFuncade.add_admin(form=form.cleaned_data, account=user['account'])
#                 return redirect("view all admins")
#         context = {
#         'form': form,
#         'extension': context_ext(request)
#             }
#         return render(request, 'form_template.html', context)
#     elif user['account_role'] == 'Customer':
#         AdministratorFuncade.add_admin(account=user['account'])
#         return redirect('admin home')
#     else: return HttpResponse('This is already an Admin!')

# @login_required()
# def search_user(request):
#     if not (request.user.is_admin or request.user.is_superuser):
#         return HttpResponse('You are not logged in as an Admin. Please login')
#     pass

# @login_required()
# def add_country(request):
#     if not (request.user.is_admin or request.user.is_superuser):
#         return HttpResponse('You are not logged in as an Admin. Please login')
#     pass

# @login_required()
# def update_account(request):
#     if request.user.account_role != Account_Role.objects.get(role_name='Customer'):
#         return HttpResponse('You are not logged in as a Customer. Please login')
#     try: instance = Customer.objects.get(account=request.user)
#     except: raise Http404('Customer account does not exist. Please contact an administrator.')

#     if request.method =='POST':
#         cusform = NewCustomerForm(request.POST, instance=instance)
#         emailform = AccountUpdateForm(request.POST, instance=request.user)
#         if cusform.is_valid() and emailform.is_valid():
#             print(request.user, cusform.cleaned_data, emailform.cleaned_data)
#             CustomerFancade.update_customer(account=request.user, form=cusform.cleaned_data, emailform=emailform.cleaned_data)
#             return redirect("home")
#     else: 
#         cusform = NewCustomerForm(instance = instance)
#         emailform = AccountUpdateForm(instance=request.user)
#     context = {
#         'customer_registration_form':cusform,
#         'user_registration_form':emailform,
#         'title': f"Update {request.user}", 
#         "button": f"Update the account: {request.user}"
#     }
#     return render(request, 'register.html', context)

#all in one update function. will update an account no matter its type including superusers
# @login_required()
# def update_user(request):
#     if request.user.account_role == Account_Role.objects.get(role_name='Customer'):
#         instance = Customer.objects.get(account=request.user)
#         update_check = "customer"
#     elif request.user.account_role == Account_Role.objects.get(role_name='Airline'):
#         instance = Airline.objects.get(account=request.user)
#         update_check = "airline"
#     elif request.user.is_superuser == True:
#         instance = None
#         update_check = "superuser"
#     elif request.user.is_admin == True:
#         instance = Administrator.objects.get(account=request.user)
#         update_check = "admin"
#     else: 
#         raise Http404('Account is missing. Please contact staff.')

#     if request.method =='POST':
#         if update_check == "customer": form = NewCustomerForm(request.POST, instance=instance)
#         elif update_check == 'airline': form = AirlineUpdateForm(request.POST, instance=instance)
#         elif update_check == 'admin': form = AdminUpdateForm(request.POST, instance=instance)
#         else: form = None

#         emailform = AccountUpdateForm(request.POST, instance=request.user)
#         if emailform.is_valid():
#             if update_check == "superuser":
#                 AdministratorFuncade.update_account(account=request.user, form=emailform.cleaned_data)
#                 return redirect("home")
#             elif form.is_valid():
#                 print(request.user, form.cleaned_data, emailform.cleaned_data)
#                 if update_check == "customer": CustomerFancade.update_customer(account=request.user, form=form.cleaned_data, emailform=emailform.cleaned_data)
#                 elif update_check == 'airline': Airline_Facade.update_airline(account=request.user, form=form.cleaned_data, emailform=emailform.cleaned_data)
#                 elif update_check == 'admin': AdministratorFuncade.update_admin(account=request.user, form=form.cleaned_data, emailform=emailform.cleaned_data)
#                 return redirect("home")

#     else: 
#         if update_check == "customer": form = NewCustomerForm(instance=instance)
#         elif update_check == 'airline': form = AirlineUpdateForm(instance=instance)
#         elif update_check == 'admin': form = AdminUpdateForm(instance=instance)
#         else: form = None
#         emailform = AccountUpdateForm(instance=request.user)
#     context = {
#         'customer_registration_form':form,
#         'user_registration_form':emailform,
#         'title': f"Update {request.user}", 
#         "button": f"Update the account: {request.user}"
#     }
#     return render(request, 'register.html', context)











# @login_required
# def add_ticket(request):


#     customer = Customer.objects.get(account_id = request.user.id )
#     message = None

#     new_ticket_form = NewTicketForm(request.POST)
#     if request.method =='POST':
#         if new_ticket_form.is_valid():
#         # if Flight_Ticket.filter(account_id = customer.id):

#             CustomerFancade.add_ticket(new_ticket_form.cleaned_data , customer.id)
#             message = 'Ticket added successfully'
#     context = {
#         'form': new_ticket_form,
#         'message': message,
#         'title': "Add ticket",
#         'button': 'add',
#         'extension': context_ext(request)

#         }
#     # return render(request, 'add_ticket.html', context)
#     return render(request, 'form_template.html', context)




# @login_required
# def get_my_tickets(request):
#     customer = Customer.objects.get(account_id = request.user.id)
#     all_my_tickets = CustomerFancade.get_my_tickets(customer.id)
    
#     return render(request, "get_my_tickets.html", {'all_tickets': all_my_tickets})



# @login_required
# def remove_ticket(request):
#     context= {}
#     if request.user.is_authenticated:
#         customer = Customer.objects.get(account_id = request.user.id)
#         form = RemoveTicket(customer.id, request.POST )
#         if request.method =='POST':
#             if form.is_valid():
#                 CustomerFancade.remove_ticket(form.cleaned_data)   


#         context = {
#             'form':form,
#             'title': "Remove Ticket", 
#             "button": "remove",
#             'extension': context_ext(request)
            
#         }

#         return render(request, 'form_template.html', context)
#     else:
#         return redirect('home')




# @login_required
# def remove_specific_ticket(request, ticket_id):
#     customer = Customer.objects.get(account_id = request.user)
#     ticket = Flight_Ticket.objects.get(pk = ticket_id)
#     if customer != ticket.customer:
#         return Http404('you are not the customer who purchased this ticket!')
#     fakeform = {"ticket_id":ticket}
#     CustomerFancade.remove_ticket(fakeform)
#     return redirect('home')




#cannot be named 'login'



# def logout(request):
#     if request.user.is_authenticated:
#         auth.logout(request)
#         # return redirect('home')
#         # return render(request,'logged_out.html')
#     # else:
#     return redirect('home')



# def register_customer(request):
#     return register(request , account_role=2)



# def register_airline(request):
#     register(request , account_role=1)



# def register(request, account_role):
#     context = {}
#     account_role = Account_Role.objects.get(role_name='Customer')

#     if request.POST:    
#         user_form = RegistrationForm(request.POST)
#         customer_form = NewCustomerForm(request.POST)

#         if user_form.is_valid():
#             created_account = BaseFuncade.create_new_user(user_form , account_role)
#             if customer_form.is_valid():
#                 AnonymusFancade.add_customer(customer_form , created_account)
            
#             else:
#                 return Http404
#             return redirect('../login/')
#         else:
            
#             context['user_registration_form'] = user_form 
#             context['customer_registration_form'] = customer_form 
#     else:
#         user_form = RegistrationForm()
#         customer_form = NewCustomerForm()
#         context['user_registration_form'] = user_form 
#         context['customer_registration_form'] = customer_form 
#         context['button'] = 'register'
#         # context2['customer_registration_form'] = customer_form 
        
#     return render(request, 'register.html', context )




################################################
                # Old Methods
################################################



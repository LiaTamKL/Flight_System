from ..models import *
from ..forms import *
from django.http import Http404
from django.contrib.auth.models import User
from django.http import HttpResponse, Http404
class BaseFuncade():
 
    def get_all_flights():
        return list(Flight.objects.all())

    def get_flight_by_id(id):
        return Flight.objects.get(pk=id)
        

    def get_flights_by_parameters(airline, origin_country_id, destination_country_id, departure_time, landing_time, remaining_tickets ): # fix it later
        flight_by_params = list(Flight.objects
        .filter(airline = airline)
        .filter(origin_country_id = origin_country_id)
        .filter(origin_country_id = destination_country_id)
        .filter(departure_time = departure_time)
        .filter(landing_time = landing_time)
        .filter(remaining_tickets = remaining_tickets))    
        
        return flight_by_params




    def get_all_airlines():
            return list(Airline.objects.all())

    def get_airline_by_id(id):   
            return Airline.objects.get(pk=id)

    # customer shouldn't have access to account_id 
    def get_airline_by_parameters(airline_name, country_id):
        # raise Exception (airline_name, country_by_id)

        airline_by_params = list(Airline.objects
        .filter(name = airline_name)
        .filter(country_id = Country.objects.get(country_name = country_id).id))   
        return airline_by_params



    def get_all_countries():
            country_list = list(Country.objects.all())
            return country_list

    def get_country_by_id(id):
            return Country.objects.get(pk=id)



    # new user creation , user will be in list format to extract usernmae and password
    # create login screen form with Create new user button which moves to user details page
    # on commit login details will be sent here for user creation.
    # also will generate token for the user?
    
    def create_new_user(form):
        user = form.save()
        user.set_password(user.password)
        role = Account_Role.objects.get(role_name="Customer")
        user.account_role= role
        user.is_customer = True
        user.save()
        #email = form.data['email']
        
        #created_account = Account.objects.get(email = email)
        # raise Exception({account_role})
        #created_account.account_role_id = account_role
        #created_account.is_customer = True
        #created_account.save()
        return  user




        # user = User.objects.create_user(
        #     username = form['username'], 
        #     password = form['password1'],
        #     email = form['email']
        # )
        # user.save()

        # new_user = User()
        # user_role = 2
        # new_user.username = form[username']
        # new_user.password = form['password']
        # new_user.email = form['email']
        # new_user.user_role =  User_Role.objects.get(pk = user_role)
        # new_user.save()
        # return  new_user.id






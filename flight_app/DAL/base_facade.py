from ..models import *
from ..forms import *
from django.http import Http404
from django.contrib.auth.models import User
from django.http import HttpResponse, Http404
class BaseFuncade():
 
    def get_all_flights():
        flight_list = list(models.Flight.objects.all())
        return list(models.Flight.objects.all())

    def get_flight_by_id(id):
        flight_by_id = list(models.Flight.objects.filter(pk=id))
        return flight_by_id 
        

    def get_flights_by_parameters(airline, origin_country_id, destination_country_id, departure_time, landing_time, remaining_tickets ): # fix it later
        flight_by_params = list(models.Flight.objects
        .filter(airline = airline)
        .filter(origin_country_id = origin_country_id)
        .filter(origin_country_id = destination_country_id)
        .filter(departure_time = departure_time)
        .filter(landing_time = landing_time)
        .filter(remaining_tickets = remaining_tickets))    
        
        return flight_by_params




    def get_all_airlines():
            return list(models.Airline.objects.all())

    def get_airline_by_id(id):   
            airline_by_id = list(models.Airline.objects.filter(pk=id))
            return airline_by_id 

    # customer shouldn't have access to account_id 
    def get_airline_by_parameters(airline_name, country_id):
        # raise Exception (airline_name, country_by_id)

        airline_by_params = list(models.Airline.objects
        .filter(name = airline_name)
        .filter(country_id = models.Country.objects.get(country_name = country_id).id))   
        return airline_by_params



    def get_all_countries():
            country_list = list(models.Country.objects.all())
            return country_list

    def get_country_by_id(id):
            country_by_id = list(models.Country.objects.filter(pk=id))
            return country_by_id



    # new user creation , user will be in list format to extract usernmae and password
    # create login screen form with Create new user button which moves to user details page
    # on commit login details will be sent here for user creation.
    # also will generate token for the user?
    
    def create_new_user(form , account_role):
        form.save()
        email = form.cleaned_data['email']
        
        created_account = models.Account.objects.get(email = email)
        # raise Exception({account_role})
        created_account.account_role_id = account_role
        created_account.save()
        return  created_account




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






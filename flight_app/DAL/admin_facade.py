from flight_app.DAL.airline_facade import Airline_Facade
from ..models import *
from django.http import Http404
from .base_facade import BaseFuncade
from django.db import transaction
from django.shortcuts import render ,redirect

class AdministratorFuncade(BaseFuncade):
    
    #returns all customer objects
    def get_all_customers():
        cus = Customer.objects.all()
        return cus

    #returns all account objects
    def get_all_accounts():
        account = Account.objects.all()
        return account

    #receives clean_data form, adds a customer based on that to the database.
    def add_customer(form):
        return redirect('home')
            # cus = Customer()
            # cus.address = form['address']
            # cus.credit_card_no = form['credit_card_no']
            # cus.first_name = form['first_name']
            # cus.last_name = form['last_name']
            # cus.account = form['account_id']
            # cus.phone_number = form['phone_number']
            # cus.save()


    #receives an airline id, deletes said airline, returns the account
    def remove_airline(airline_id):
        try:
            airline = Airline.objects.get(pk = airline_id)
        except Airline.DoesNotExist:
            raise Http404("Airline does not exist")
        flights =Flight.objects.filter(airline=airline)
        for flight in flights:
            Airline_Facade.remove_flight(flight.id)
        a = airline.account
        airline.delete()
        return a

    #receives a customer id, deletes said customer, returns the account
    def remove_customer(customer_id):
        try:
            customer = Customer.objects.get(pk = customer_id)
        except Customer.DoesNotExist:
            raise Http404("Customer does not exist")
        tickets =Flight_Ticket.objects.filter(customer=customer)
        for ticket in tickets:
            ticket.delete()
        a = customer.account
        customer.delete()
        return a

    #deletes an account
    def remove_account(account):
        account.delete()

    #receives a admin id, deletes said admin, returns the account
    def remove_admin(admin_id):
        try:
            admin = Administrator.objects.get(pk = admin_id)
        except Administrator.DoesNotExist:
            raise Http404("Admin does not exist")
        a = admin.account
        admin.delete()
        return a

    #receives clean_data form, adds an airline based on that to the database.
    #marked out parts will work once i change models
    def add_airline(form):
            account = Account.objects.get(pk=form['user_id'])
            if account.account_role == Account_Role.objects.get(role_name='Admin'):
                account.is_admin = False
                account.is_staff = False
                admin = Administrator.objects.get(account=account)
                AdministratorFuncade.remove_admin(admin.id)
            else:
                customer = Administrator.objects.get(account=account)
                AdministratorFuncade.remove_customer(customer.id)
            account.account_role = Account_Role.objects.get(role_name='Airline')
            airline = Airline()
            airline.name = form['name']
            airline.country = form['airline']
            airline.account = form['user_id']
            airline.save()


    #takes airline_id and form data, makes airline an admin while deleting the customer object
    def add_admin_from_airline(form, airline_id):
            try:
                airline = Airline.objects.get(pk = airline_id)
            except Airline.DoesNotExist:
                raise Http404("Airline does not exist")
            account = airline.account
            account.account_role = Account_Role.objects.get(role_name='Admin')
            account.is_admin = True
            account.is_staff = True
            admin = Administrator()
            admin.first_name = form['first_name']
            admin.last_name = form['last_name']
            admin.account = account
            AdministratorFuncade.remove_airline(airline)
            account.save()
            admin.save()
    
    #takes customer_id, makes customer an admin while deleting the customer object
    def add_admin_from_customer(customer_id):
        try:
            customer = Customer.objects.get(pk=customer_id)
        except Customer.DoesNotExist:
            raise Http404("Customer does not exist")
        admin = Administrator()
        admin.first_name = customer.first_name
        admin.last_name = customer.last_name
        admin.account = customer.account
        account = customer.account
        account.account_role = Account_Role.objects.get(role_name='Admin')
        account.is_admin = True
        account.is_staff = True
        AdministratorFuncade.remove_customer(customer.id)
        account.save()
        admin.save()
############################################################

    #receives username, brings back the linked admin,airline or customer account in a touple where the second object is a string with the role name
    def get_by_username(username):
        try:
            account = Account.objects.get(username=username)
        except:
            raise Http404("Account does not exist")
        if account.role == Account_Role.objects.get(role_name='Admin'):
            user = Administrator.objects.get(account=account)
            role = "Admin"
        elif account.role == Account_Role.objects.get(role_name='Airline'):
            user = Airline.objects.get(account=account)
            role = "Airline"
        elif account.role == Account_Role.objects.get(role_name='Customer'):
            user = Customer.objects.get(account=account)
            role = "Customer"
        else:
            raise Http404("Account seems to not be linked to any profile. Please contact an administrator")
        
        return (user, role)

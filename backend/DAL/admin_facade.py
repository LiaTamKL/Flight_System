from backend.DAL.airline_facade import Airline_Facade
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
    def get_all_accounts(account):
        account = Account.objects.exclude(pk=account.id)
        return account

    #returns all admin objects but the one in use
    def get_all_admins(account):
        admins = Administrator.objects.exclude(account=account)
        return admins

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


    #receives an airline id, deletes said airline and their flights and tickets, returns the account
    def remove_airline(airline):
        flights =Flight.objects.filter(airline=airline)
        for flight in flights:
            Airline_Facade.remove_flight(flight.id)
        a = airline.account
        airline.delete()
        return a

    #receives a customer id, deletes said customer and their tickets, returns the account
    def remove_customer(customer):
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
    def remove_admin(admin):
        a = admin.account
        admin.delete()
        return a

    #receives clean_data form, adds an airline based on that to the database and deletes old customer/admin details.
    def add_airline(form, account):
            if account.account_role == Account_Role.objects.get(role_name='Admin'):
                admin = Administrator.objects.get(account=account)
                AdministratorFuncade.remove_admin(admin)
                account.is_admin = False
                account.is_staff = False
            else:
                customer = Customer.objects.get(account=account)
                AdministratorFuncade.remove_customer(customer)
                account.is_customer = False
            airline = Airline()
            airline.name = form['name']
            airline.country = form['country']
            airline.account = account
            account.account_role = Account_Role.objects.get(role_name='Airline')
            account.is_airline = True
            account.save()
            airline.save()

    #takes account and form (form can be left empty if its a customer account), makes an admin account and deletes old airline/customer details
    def add_admin(account, form=None):
        if account.account_role == Account_Role.objects.get(role_name='Customer'):
            customer = Customer.objects.get(account=account)
            first_name = customer.first_name
            last_name = customer.last_name
            AdministratorFuncade.remove_customer(customer)
            account.is_customer = False
        elif account.account_role == Account_Role.objects.get(role_name='Airline'):
                airline = Airline.objects.get(account = account)
                first_name = form['first_name']
                last_name = form['last_name']
                AdministratorFuncade.remove_airline(airline)
                account.is_airline = False
        else:
            raise Http404("This user either does not exist or is already an admin")

        admin = Administrator()
        admin.first_name = first_name
        admin.last_name = last_name
        admin.account = account
        account.account_role = Account_Role.objects.get(role_name='Admin')
        account.is_admin = True
        account.is_staff = True
        account.save()
        admin.save()
   
   #takes account and form, makes a customer account and deletes old airline/admin details
    def add_customer_admin_command(account, form):
        if account.account_role == Account_Role.objects.get(role_name='Admin'):
            admin = Administrator.objects.get(account=account)
            first_name = admin.first_name
            last_name = admin.last_name
            AdministratorFuncade.remove_admin(admin)
            account.is_admin = False
            account.is_staff = False
        elif account.account_role == Account_Role.objects.get(role_name='Airline'):
                airline = Airline.objects.get(account = account)
                first_name = form['first_name']
                last_name = form['last_name']
                AdministratorFuncade.remove_airline(airline)
                account.is_airline = False
        else:
            raise Http404("This user either does not exist or is already an admin")

        customer = Customer()
        customer.first_name = first_name
        customer.last_name = last_name
        customer.account = account
        customer.address = form['address']
        customer.phone_number = form['phone_number']
        customer.credit_card_no = form['credit_card_no']
        account.account_role = Account_Role.objects.get(role_name='Customer')
        account.is_customer = False
        account.save()
        customer.save()


    #receives username, brings back the linked admin,airline or customer account in a touple where the third object is a string with the role name, along with the account as the second
    def get_by_username(username):
        try:
            account = Account.objects.get(username=username)
            # print(account)
        except:
            raise Http404("Account does not exist")
        if account.account_role == Account_Role.objects.get(role_name='Admin') and account.is_superuser ==False:
            user = Administrator.objects.get(account=account)
            role = "Admin"
        elif account.account_role == Account_Role.objects.get(role_name='Airline'):
            user = Airline.objects.get(account=account)
            role = "Airline"
        elif account.account_role == Account_Role.objects.get(role_name='Customer'):
            user = Customer.objects.get(account=account)
            role = "Customer"
        elif account.is_superuser == True:
            user = None
            role = 'Superuser'
        else:
            raise Http404("Account seems to not be linked to any profile. Please contact an administrator")
        
        return {'user':user, 'account':account, 'account_role':role}

    #takes form and an existing account, updates the admin attached to it with form data
    def update_admin(form, account, emailform):
        admin = Administrator.objects.get(account=account)
        admin.first_name = form['first_name']
        admin.last_name = form['last_name']
        account.email = emailform['email']
        admin.save()
        account.save()

    def update_account(account, form):
        account.email = form['email']
        account.save()

############################################################

    # #takes airline_id and form data, makes airline an admin while deleting the customer object
    # def add_admin_from_airline(form, airline_id):
    #         try:
    #             airline = Airline.objects.get(pk = airline_id)
    #         except Airline.DoesNotExist:
    #             raise Http404("Airline does not exist")
    #         account = airline.account
    #         account.account_role = Account_Role.objects.get(role_name='Admin')
    #         account.is_admin = True
    #         account.is_staff = True
    #         admin = Administrator()
    #         admin.first_name = form['first_name']
    #         admin.last_name = form['last_name']
    #         admin.account = account
    #         AdministratorFuncade.remove_airline(airline)
    #         account.save()
    #         admin.save()
    
    # #takes customer_id, makes customer an admin while deleting the customer object
    # def add_admin_from_customer(customer_id):
    #     try:
    #         customer = Customer.objects.get(pk=customer_id)
    #     except Customer.DoesNotExist:
    #         raise Http404("Customer does not exist")
    #     admin = Administrator()
    #     admin.first_name = customer.first_name
    #     admin.last_name = customer.last_name
    #     admin.account = customer.account
    #     account = customer.account
    #     account.account_role = Account_Role.objects.get(role_name='Admin')
    #     account.is_admin = True
    #     account.is_staff = True
    #     AdministratorFuncade.remove_customer(customer.id)
    #     account.save()
    #     admin.save()
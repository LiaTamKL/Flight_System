from flight_app.DAL.airline_facade import Airline_Facade
from ..models import Account, Customer, Airline, Administrator, Flight, Flight_Ticket
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


    #receives clean_data form, adds an airline based on that to the database.
    def add_airline(form):
        with transaction.Atomic():
            airline = Airline()
            airline.name = form['name']
            airline.country = form['airline']
            airline.account = form['user_id']
            airline.save()


    #receives clean_data form, adds an admin based on that to the database.
    def add_admin(form):
        with transaction.Atomic():
            admin = Administrator()
            admin.first_name = form['first_name']
            admin.last_name = form['last_name']
            admin.account = form['user_id']
            admin.save()

    #receives an airline id, deletes said airline
    def remove_airline(airline):
        try:
            f = Airline.objects.get(pk = airline)
        except Airline.DoesNotExist:
            raise Http404("Airline does not exist")
        flights =Flight.objects.filter(pk=f)
        for flight in flights:
            Airline_Facade.remove_flight(flight.id)
        f.delete()

    #receives a customer id, deletes said customer
    def remove_customer(customer):
        try:
            f = Customer.objects.get(pk = customer)
        except Customer.DoesNotExist:
            raise Http404("Customer does not exist")
        tickets =Flight_Ticket.objects.filter(pk=f)
        for ticket in tickets:
            ticket.delete()
        f.delete()

    #receives a admin id, deletes said admin
    def remove_admin(admin):
        try:
            f = Administrator.objects.get(pk = admin)
        except Administrator.DoesNotExist:
            raise Http404("Admin does not exist")
        f.delete()



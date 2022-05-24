from flight_app.DAL.airline_facade import Airline_Facade
from ..models import Customer, Airline, Administrator, Flight, Flight_Ticket
from django.http import Http404
from .base_facade import BaseFuncade
from django.db import transaction

class AdministratorFuncade(BaseFuncade):
    # def add_customer(customer_id, form):
    #     cust = Customer()
    #     id = Airline.objects.get(pk = customer_id)
    #     cust.id = id
    #     cust.address = form['address']
    #     cust.credit_card_no = form['credit_card_no']
    #     cust.first_name = form['first_name']
    #     cust.last_name = form['last_name']
    #     cust.user = form['user_id']
    #     cust.save()
    
    #returns all customer objects
    def get_all_customers():
        cus = Customer.objects.all()
        return cus

    #receives clean_data form, adds a customer based on that to the database.
    def add_customer2(form):
        with transaction.Atomic():
            cus = Customer()
            cus.address = form['address']
            cus.credit_card_no = form['credit_card_no']
            cus.first_name = form['first_name']
            cus.last_name = form['last_name']
            cus.user = form['user_id']
            cus.save()


    #receives clean_data form, adds an airline based on that to the database.
    def add_airline(form):
        with transaction.Atomic():
            airline = Airline()
            airline.name = form['name']
            airline.country = form['airline']
            airline.user = form['user_id']
            airline.save()


    #receives clean_data form, adds an admin based on that to the database.
    def add_admin(form):
        with transaction.Atomic():
            admin = Administrator()
            admin.first_name = form['first_name']
            admin.last_name = form['last_name']
            admin.user = form['user_id']
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



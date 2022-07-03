from ..models import *
from ..forms import *
from django.http import Http404
from .base_facade import BaseFuncade

class CustomerFancade(BaseFuncade):

    def update_customer(account, form, emailform):
        customer = Customer.objects.get(account = account)
        customer.first_name = form['first_name']
        customer.last_name = form['last_name']
        customer.address = form['address']
        customer.phone_number = form['phone_number']
        customer.credit_card_no = form['credit_card_no']
        account.email = emailform['email']
        customer.save()
        account.save()


    def add_ticket(form , customer_id):
        
        flight_Ticket = Flight_Ticket()
        flight_Ticket.customer_id = customer_id
        flight_Ticket.flight_id = form['flight']
        flight_Ticket.save()
        
        #Remove Ticket From Flight
        flight = Flight.objects.get(pk = form['flight'] )
        flight.remaining_tickets -= 1
        flight.save() 



    def remove_ticket(form):
        ticket_to_remove = Flight_Ticket.objects.get(pk =form['ticket'].id)
        ticket_to_remove.delete()
        
        # Add removed ticket to flight
        flight = Flight.objects.get(pk = form['flight'] )
        flight.remaining_tickets += 1
        flight.save() 
   


    #need to be logged in
    def get_my_tickets(id):
           return Flight_Ticket.objects.filter(customer_id = id)



    def add_flight(airline, form):
        flight = Flight()
        flight.airline = airline
        flight.origin_country = form['origin_country']
        flight.destination_country = form['destination_country']
        flight.departure_time = form['departure_time']
        flight.landing_time = form['landing_time']
        flight.remaining_tickets = form['remaining_tickets']
        flight.save()
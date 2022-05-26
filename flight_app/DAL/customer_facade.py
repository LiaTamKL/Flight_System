from ..models import *
from ..forms import *
from django.http import Http404
from .base_facade import BaseFuncade

class CustomerFancade(BaseFuncade):

    def update_customer(customer_id, form):
        customer = Customer.objects.get(pk = customer_id)


    def add_ticket(form , customer_id):
        flight_Ticket = Flight_Ticket()
        flight_Ticket.customer_id = customer_id
        # flight_Ticket.customer = form["customer_id"]
        flight_Ticket.flight = form['flight_id']
        flight_Ticket.save()

    def remove_ticket(ticket):
        ticket_to_remove = Flight_Ticket.objects.get(pk = ticket["ticket_id"].id)
        ticket_to_remove.delete()



    #need to be logged in
    def get_my_tickets(id):
            ticket_list = list(models.Flight_Ticket.objects.filter(customer_id = id))
            return ticket_list



    def add_flight(airline, form):
        flight = Flight()
        flight.airline = airline
        flight.origin_country = form['origin_country']
        flight.destination_country = form['destination_country']
        flight.departure_time = form['departure_time']
        flight.landing_time = form['landing_time']
        flight.remaining_tickets = form['remaining_tickets']
        flight.save()
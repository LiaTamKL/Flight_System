from ..models import *
from ..forms import *
from django.http import Http404
from .base_facade import BaseFuncade

class CustomerFancade(BaseFuncade):

    def update_customer(customer):
        pass

    def add_ticket(ticket_id , form):
        flight_Ticket = Flight_Ticket()
        flight_Ticket.id = ticket_id
        flight_Ticket.customer_id = form["customer_id"]
        flight_Ticket.flight_id = form['flight_id']
        flight_Ticket.save()

    def remove_ticket(ticket):
        try:
            ticket_to_remove = Flight_Ticket.objects.get(pk = ticket)
        except Flight_Ticket.DoesNotExist:
            raise Http404("Ticket does not exist")
        ticket_to_remove.delete()
        return 1


    def get_my_tickets():
        pass


    def add_flight(airline, form):
        flight = Flight()
        flight.airline = airline
        flight.origin_country = form['origin_country']
        flight.destination_country = form['destination_country']
        flight.departure_time = form['departure_time']
        flight.landing_time = form['landing_time']
        flight.remaining_tickets = form['remaining_tickets']
        flight.save()
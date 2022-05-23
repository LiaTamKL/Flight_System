from ..models import *
from ..forms import *
from django.http import Http404
from .base_facade import BaseFuncade

class CustomerFancade(BaseFuncade):

    def update_customer(customer):
        pass

    def add_ticket(ticket , form):
        # ticket_id, customer_id, flight_id =  ticket.split() 
        flight_Ticket= Flight_Ticket()
        flight_Ticket.customer_id = form.cleaned_data["customer_id"]
        flight_Ticket.flight_id = form.cleaned_data['flight_id']
        flight_Ticket.save()

    def remove_ticket(ticket):
        pass

    def get_my_tickets():
        pass


    def add_flight(airline, form):
        flight = Flight()
        flight.airline = airline
        flight.origin_country = form.cleaned_data['origin_country']
        flight.destination_country =form.cleaned_data['destination_country']
        flight.departure_time = form.cleaned_data['departure_time']
        flight.landing_time = form.cleaned_data['landing_time']
        flight.remaining_tickets = form.cleaned_data['remaining_tickets']
        flight.save()
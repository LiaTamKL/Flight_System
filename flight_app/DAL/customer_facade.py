from ..models import *
from ..forms import *
from django.http import Http404
from .base_facade import BaseFuncade

class CustomerFancade(BaseFuncade):

    def update_customer(customer_id, form):
        customer = Customer.objects.get(pk = customer_id)
        customer.first_name = form['first_name']
        customer.last_name = form['last_name']
        customer.address = form['address']
        customer.phone_number = form['phone_number']
        customer.credit_card_no = form['credit_card_no']
        customer.save()

    def add_ticket(form):
        flight_Ticket = Flight_Ticket()
        flight_Ticket.customer = form["customer_id"]
        flight_Ticket.flight = form['flight_id']
        flight_Ticket.save()

    def remove_ticket(ticket):
        try:
            ticket_to_remove = Flight_Ticket.objects.get(pk = ticket)
        except Flight_Ticket.DoesNotExist:
            raise Http404("Ticket does not exist")
        ticket_to_remove.delete()
        return 1

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
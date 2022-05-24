from ..models import Airline, Flight, Flight_Ticket
from django.http import Http404
from .base_facade import BaseFuncade
from django.db import transaction

#This is for actions only someone with an airline login token can do

class Airline_Facade(BaseFuncade):

    #add a flight. uses form. in the future, should use logincheck
    def add_flight(airline, form, flight):
        
        with transaction.Atomic():
            airli = Airline.objects.get(pk = airline)
            flight.airline = airli
            flight.origin_country = form['origin_country']
            flight.destination_country =form['destination_country']
            flight.departure_time = form['departure_time']
            flight.landing_time = form['landing_time']
            flight.remaining_tickets = form['remaining_tickets']
            flight.save()

    #updates airline details via a form where the existing details are shown
    #this SHOULD NOT allow other companies to update other companies. We need logincheck later
    def update_airline(airline, form, flight):
        Airline_Facade.add_flight(airline, form, flight)


    #remove a flight. in the future, should use logincheck. returns 1 if successful
    def remove_flight(flight):
        #needs login check first to avoid other companies deleting flights for this company
        try:
            f = Flight.objects.get(pk = flight)
        except Flight.DoesNotExist:
            raise Http404("Flight does not exist")
        tickets = Flight_Ticket.objects.filter(flight=flight)
        if tickets.count() > 0:
            for ticket in tickets: ticket.delete()
        f.delete()


    #takes the login token, returns the filter for all flight objects by said airline
    #this SHOULD NOT be id in the final product. it needs to be based on logintokens
    def get_my_flights(id):
        f = Flight.objects.filter(airline=id)
        return f

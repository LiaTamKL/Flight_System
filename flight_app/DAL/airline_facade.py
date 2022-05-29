from ..models import Airline, Flight, Flight_Ticket
from django.http import Http404
from .base_facade import BaseFuncade
from django.db import transaction

#This is for actions only someone with an airline login token can do

class Airline_Facade(BaseFuncade):

    #takes form, a flight object and an airline id, makes a new flight. 
    def add_flight(airline, form, flight):
            airli = Airline.objects.get(pk = airline)
            flight.airline = airli
            flight.origin_country = form['origin_country']
            flight.destination_country =form['destination_country']
            flight.departure_time = form['departure_time']
            flight.landing_time = form['landing_time']
            flight.remaining_tickets = form['remaining_tickets']
            flight.save()

    #same as the above, just a different name to clarify
    def update_flight(airline, form, flight):
        Airline_Facade.add_flight(airline, form, flight)


    #remove a flight.returns 1 if successful
    def remove_flight(flight, airline):
        #if the flight doesn't exist, returns 404
        try:
            f = Flight.objects.get(pk = flight)
        except Flight.DoesNotExist:
            raise Http404("Flight does not exist")
        #if this flight doesn't belong to said airline, returns 404
        if airline != f.airline:
            raise Http404("This is not your flight! You may not delete it")
        tickets = Flight_Ticket.objects.filter(flight=flight)
        #makes sure to delete all tickets for deleted flights
        if tickets.count() > 0:
            for ticket in tickets: ticket.delete()
        f.delete()
        return 1


    #gets all flight for an airline
    def get_my_flights(id):
        return Flight.objects.filter(airline=id)

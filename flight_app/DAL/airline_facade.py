from ..models import *
from ..forms import *
from django.http import Http404

#This is for actions only someone with an airline login token can do

class Airline_Facade():

    #updates airline details via a form where the existing details are shown
    #this SHOULD NOT allow other companies to update other companies. We need logincheck later
    def update_airline(airline):
        pass

    #add a flight. uses form. in the future, should use logincheck
    def add_flight(airline):
        pass

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
        return 1

    #takes the login token, returns the filter for all flight objects by said airline
    #this SHOULD NOT be id in the final product. it needs to be based on logintokens
    def get_my_flights(id):
        f = Flight.objects.filter(airline=id)
        return f

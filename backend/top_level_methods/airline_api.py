from rest_framework import status
from rest_framework.response import Response
from ..DAL.airline_facade import Airline_Facade
from ..serializers import FlightSerializer
from datetime import datetime
import pytz
utc=pytz.UTC
from ..models import Country, Flight

def get_all_my_flights(airline):
    flights =  Flight.objects.filter(airline=airline).order_by('departure_time')
    seralizer = FlightSerializer(flights, many = True)
    return Response(seralizer.data)


def create_flight_airline_api(request, airline):
    serializer = FlightSerializer(data=request.data, many = False)
    if serializer.is_valid():
            if request.data['origin_country']  == request.data['destination_country']:
                return Response(data='Destination and origin countries must not be the same!', status=status.HTTP_400_BAD_REQUEST)
            data= request.data
            departure_time = utc.localize(datetime.strptime(request.data['departure_time'].replace('T', ' '), '%Y-%m-%d %H:%M'))
            landing_time = utc.localize(datetime.strptime(request.data['landing_time'].replace('T', ' '), '%Y-%m-%d %H:%M'))
            if departure_time < utc.localize(datetime.strptime(utc.localize(datetime.now()).strftime("%Y-%m-%d %H:%M"), '%Y-%m-%d %H:%M')):
                return Response(data='You cannot choose a date in the past', status=status.HTTP_400_BAD_REQUEST)
            if landing_time <= departure_time:
                return Response(data='A landing must be after a departure', status=status.HTTP_400_BAD_REQUEST)
            data['departure_time'] = departure_time
            data['landing_time'] = landing_time
            data['origin_country'] = Country.objects.get(pk=data['origin_country'])
            data['destination_country'] = Country.objects.get(pk=data['destination_country'])
            flight=Flight()
            Airline_Facade.add_flight(airline=airline, form=data, flight=flight)
            return Response(f'Successfully made new flight by {request.user}')

    else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def update_flight_airline_api(request, airline, flight):
    serializer = FlightSerializer(data=request.data, many = False)
    if serializer.is_valid():
            if request.data['origin_country']  == request.data['destination_country']:
                return Response(data='Destination and origin countries must not be the same!', status=status.HTTP_400_BAD_REQUEST)
            data= request.data
            departure_time = utc.localize(datetime.strptime(request.data['departure_time'].replace('T', ' '), '%Y-%m-%d %H:%M'))
            landing_time = utc.localize(datetime.strptime(request.data['landing_time'].replace('T', ' '), '%Y-%m-%d %H:%M'))
            if departure_time < utc.localize(datetime.strptime(utc.localize(datetime.now()).strftime("%Y-%m-%d %H:%M"), '%Y-%m-%d %H:%M')):
                return Response(data='You cannot choose a date in the past', status=status.HTTP_400_BAD_REQUEST)
            if landing_time <= departure_time:
                return Response(data='A landing must be after a departure', status=status.HTTP_400_BAD_REQUEST)
            data['departure_time'] = departure_time
            data['landing_time'] = landing_time
            data['origin_country'] = Country.objects.get(pk=data['origin_country'])
            data['destination_country'] = Country.objects.get(pk=data['destination_country'])
            Airline_Facade.update_flight(airline=airline, form=data, flight=flight)
            return Response(f'Successfully made new flight by {request.user}')

    else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def get_specific_flight_airline_api(flight):
    serializer = FlightSerializer(data=flight, many = False)
    return Response(serializer.data)
from django_filters import FilterSet, IsoDateTimeFilter
from .models import *



class Flightfilter(FilterSet):
    from_departure_time = IsoDateTimeFilter(field_name='departure_time',lookup_expr='gte')
    to_arrival_time = IsoDateTimeFilter(field_name='landing_time', lookup_expr='lte')
    # positive_tickets_number = NumberFilter(field_name='remaining_tickets', lookup_expr='gt') 
    
    class Meta:
        model = Flight
        fields = {
            "id": ["exact", "in"],
            "airline": ["exact"],
            "origin_country": ["exact"], 
            "destination_country": ["exact"],
            "departure_time": ["exact"],
            "landing_time": ["exact"],
            "remaining_tickets":["exact"],

        }

# class Ticketfilter(FilterSet):
#     class Meta:
#         model = Flight_Ticket
#         fields = {
#             'customer': ["in", "exact"],
#             'flight': ["in", "exact"]
#         }

class Countryfilter(FilterSet):
    class Meta:
        model = Country
        fields = ['country_name']

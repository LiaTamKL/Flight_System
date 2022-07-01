from django_filters import FilterSet, AllValuesFilter
from django_filters import DateTimeFilter, NumberFilter, IsoDateTimeFilter
from .models import *



class Flightfilter(FilterSet):
    from_departure_time = IsoDateTimeFilter(field_name='departure_time',lookup_expr='gte')
    to_arrival_time = IsoDateTimeFilter(field_name='landing_time', lookup_expr='lte')
    positive_tickets_number = NumberFilter(field_name='remaining_tickets', lookup_expr='gt') 
    
    class Meta:
        model = Flight
        fields = '__all__'
        # fields = ('from_departure_time', 'to_arrival_time')

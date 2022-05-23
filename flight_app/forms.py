
from email import message
from tkinter import Widget
from django import forms
from . import models
from datetime import datetime
import pytz
utc=pytz.UTC

class MainForm(forms.Form):
    pass



class country_id_search_form(forms.Form):
    country_id = forms.IntegerField(min_value=1)

    def clean_message(self):
        country_id_m = self.cleaned_data['country_id']
        # if not str.isdigit(country_id_m):
            # raise forms.ValidationError('Please Enter valid country id')
        
        return country_id_m

class NewFlightForm(forms.Form):
    origin_country = forms.ModelChoiceField(queryset=models.Country.objects.all(), required=True, label = 'From')
    destination_country = forms.ModelChoiceField(queryset=models.Country.objects.all(), required=True, label = 'To')
    departure_time = forms.DateTimeField(required=True, label = 'Departure at', input_formats=[r'%d/%m/%Y %H:%M'])
    landing_time = forms.DateTimeField(required=True, label = 'Landing at', input_formats=[r'%d/%m/%Y %H:%M'])
    remaining_tickets = forms.IntegerField(required=True, min_value=0)
    class Meta:
        model = models.Flight
        fields = ('origin_country', 'destination_country', 'departure_time', 'landing_time', 'remaining_tickets')

    #checks if the destination and origin countries are the same, if they are, raises an error
    def clean_destination_country(self):
        origin = self.cleaned_data['origin_country']
        print(f'origin: {origin}')
        destination = self.cleaned_data['destination_country']
        print(f'origin: {destination}')
        if origin == destination:
            print('invalid.... d=o')
            raise forms.ValidationError('Destination and origin countries must not be the same')
        return destination

    #checks if departure is actually not in the past, and whether the landing time is after the departure
    def clean_landing_time(self):
        print('cleaning data')
        departure = self.cleaned_data['departure_time']
        print(f'Departure: {departure}')
        print(utc.localize(datetime.now()))
        if departure < utc.localize(datetime.now()):
            print('invalid.... de < now')
            raise forms.ValidationError('You cannot choose a date in the past')
        landing = self.cleaned_data['landing_time']
        print(f'Landing: {landing}')
        if landing <= departure:
            print('invalid.... la <= de')
            raise forms.ValidationError('A landing must be after a departure')
        return landing
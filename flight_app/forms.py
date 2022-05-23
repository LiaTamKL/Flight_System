
from django import forms
from . import models
#these three are meant to compare datetime.now() with times fetched from the form. it helps validate them
from datetime import datetime
import pytz
utc=pytz.UTC



class MainForm(forms.Form):
    pass



class country_id_search_form(forms.ModelForm):
    country_id = forms.IntegerField(min_value=1)
    def clean_message(self):
        country_id_m = self.cleaned_data['country_id']
        # if not str.isdigit(country_id_m):
            # raise forms.ValidationError('Please Enter valid country id')
        
        return country_id_m

class NewTicketForm(forms.ModelForm):
    customer_id = forms.ModelChoiceField(queryset=models.Customer.objects.all(),required=True, label='Customer ID')
    flight_id = forms.ModelChoiceField(queryset=models.Flight.objects.all(), required=True , label='Flight ID')

    class Meta:
        model = models.Flight_Ticket
        fields = ['customer_id', 'flight_id']

    def clean_message(self):
        customer_id = self.cleaned_data['customer_id']
        return customer_id

    # def __str__(self) -> str:
    #     customer_id = customer_id.id
    #     return customer_id


#add password validator 
#https://medium.com/geekculture/django-shorts-password-validators-95285c0936de
class NewUserForm(forms.ModelForm):
    username = forms.CharField(max_length=10 , required=True, label="The most impressing nickname you ever had")
    password = forms.CharField(max_length=16 ,  widget=forms.PasswordInput() , label="Password, why bother probably you will use 123456")
    # password = forms.CharField(max_length=16 , required=True , label= "Password, why bother probably you will use 1-6") 
    email = forms.CharField(max_length=255 ,  required=True, label="email, Prepare for shitload of SPAM baby")



    class Meta:
        model = models.User
        fields = ['username', 'password', 'email']

    # def clean_message(self):
    #     customer_id = self.cleaned_data['customer_id']
    #     return customer_id


class NewCustomerForm(forms.ModelForm):
    first_name = forms.CharField(max_length=50 , required=True, label="Yo name ")
    last_name = forms.CharField(max_length=50 , required=True , label= "Yo fam name") 
    address = forms.CharField(max_length=255 ,  required=True, label="Where Yo live fool?")
    phone_number = forms.IntegerField(max_value = 9999999999, label="Yo phone , real one this time ")
    credit_card_no = forms.IntegerField(max_value = 9999999999999999, label="Credit card , you can trust me..., to buy some expensive shit!") 

    class Meta:
        model = models.Flight_Ticket
        fields = ['first_name', 'last_name', 'address', 'phone_number', 'credit_card_no']
        

    # def clean_message(self):
    #     customer_id = self.cleaned_data['customer_id']
    #     return customer_id

class NewFlightForm(forms.ModelForm):

    #def __init__(self, *args, **qwargs):
    #    super(models.Flight, self).__init__(*args, **qwargs)

    origin_country = forms.ModelChoiceField(queryset=models.Country.objects.all(), required=True, label = 'From')
    destination_country = forms.ModelChoiceField(queryset=models.Country.objects.all(), required=True, label = 'To')
    departure_time = forms.DateTimeField(required=True, label = 'Departure at', input_formats=[r'%d/%m/%Y %H:%M'])
    landing_time = forms.DateTimeField(required=True, label = 'Landing at', input_formats=[r'%d/%m/%Y %H:%M'])
    remaining_tickets = forms.IntegerField(required=True, min_value=0)
    class Meta:
        model = models.Flight
        fields = ['origin_country', 'destination_country', 'departure_time', 'landing_time', 'remaining_tickets']

    #checks if the destination and origin countries are the same, if they are, raises an error
    def clean_destination_country(self):
        origin = self.cleaned_data['origin_country']
        destination = self.cleaned_data['destination_country']
        if origin == destination:
            raise forms.ValidationError('Destination and origin countries must not be the same')
        return destination

    #checks if departure is actually not in the past, and whether the landing time is after the departure
    def clean_landing_time(self):
        departure = self.cleaned_data['departure_time']
        if departure < utc.localize(datetime.now()):
            raise forms.ValidationError('You cannot choose a date in the past')
        landing = self.cleaned_data['landing_time']
        if landing <= departure:
            raise forms.ValidationError('A landing must be after a departure')
        return landing

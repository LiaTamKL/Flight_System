
from django import forms
from . import models
#these three are meant to compare datetime.now() with times fetched from the form. it helps validate them
from datetime import datetime
import pytz
from django.contrib.auth.forms import UserCreationForm , AuthenticationForm
from django.contrib.auth.models import User
from django.contrib.auth import password_validation
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.validators import UnicodeUsernameValidator
from .models import Account
from .DAL.base_facade import BaseFuncade





utc=pytz.UTC



class flights_by_params(forms.ModelForm):
    origin_country_id =  forms.ModelChoiceField(queryset=models.Country.objects.all(), required=False , label='Origin Country',)
    detination_country_id = forms.ModelChoiceField(queryset=models.Country.objects.all(), required=False , label=' Detination Country',)
    airline_id = forms.ModelChoiceField(queryset=models.Airline.objects.all(), required=False , label='Airline',)
    departuredate = forms.ModelChoiceField(queryset=models.Flight.objects.values_list("departure_time" ,  flat=True), required=False , label='Departure Date',)
    landingdate = forms.ModelChoiceField(queryset=models.Flight.objects.values_list("landing_time", flat=True), required=False , label='Landing Date',)
    class Meta:
        model = models.Flight 
        fields = ['origin_country_id','detination_country_id',"airline_id",'departuredate',"landingdate" ]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)


        # raise Exception 
        
        # self.fields['detination_country_id'].queryset = models.Country.objects.get(pk = 1)

        # self.fields['detination_country_id'].queryset = models.Country.objects.none()
        # self.fields['airline_id'].queryset = models.Airline.objects.none()
        # self.fields['departuredate'].queryset = models.Flight.objects.none()
        #x self.fields['landingdate'].queryset = models.Flight.objects.none()


        # if 'origin_country_id' in self.data:

        #     self.fields['detination_country_id'].queryset=models.Country.objects.filter(pk = 1)
        #     return 
        
    # def clean_form(self):
    #     country_id = int(self.cleaned_data['origin_country_id'])
    #     return country_id

            #     self.fields['city'].queryset = City.objects.filter(country_id=country_id).order_by('name')
            #     # self.fields['detination_country_id'].queryset = City.objects.filter(country_id=country_id).order_by('name')


        # self.fields['origin_country_id'].queryset = models.Country.objects.none()







# mexico - norway - Crap Airlines

# class PersonForm(forms.ModelForm):
#     class Meta:
#         model = Person
#         fields = ('name', 'birthdate', 'country', 'city')

#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         self.fields['city'].queryset = City.objects.none()

#         if 'country' in self.data:
#             try:
#                 country_id = int(self.data.get('country'))
#                 self.fields['city'].queryset = City.objects.filter(country_id=country_id).order_by('name')
#             except (ValueError, TypeError):
#                 pass  # invalid input from the client; ignore and fallback to empty City queryset
#         elif self.instance.pk:
#             self.fields['city'].queryset = self.instance.country.city_set.order_by('name')

class airlines_by_country(forms.ModelForm):
    country_id = 1

    class Meta:
        model = models.Airline 
        fields = '__all__'

class departure_arrival_flights(forms.ModelForm):
    country_id = 1
    
    class Meta:
        model = models.Flight 
        fields = '__all__'





class country_by_id(forms.ModelForm):
    country_id = forms.IntegerField(min_value=1,widget=forms.TextInput(), label="Search Country By ID" )
    
    class Meta:
        model = models.Country 
        fields = ['country_id']

    def clean_country_id(self):
        country_id = int(self.cleaned_data['country_id'])
        if len(BaseFuncade.get_country_by_id(country_id))== 0:
            raise forms.ValidationError('Invalid country id')
        return country_id
        
        

class flight_by_id(forms.ModelForm):
    flight_id = forms.IntegerField(min_value=1, widget=forms.TextInput(), label="Search Flight By ID" )

    class Meta:
        model = models.Flight 
        fields = ['flight_id']

    def clean_flight_id(self):
        flight_id = int(self.cleaned_data['country_id'])
        if len(BaseFuncade.get_flight_by_id(flight_id))== 0:
            raise forms.ValidationError('Invalid flight id')
        return flight_id



class airline_by_id(forms.ModelForm):
    airline_id = forms.IntegerField(min_value=1,widget=forms.TextInput(), label="Search Airline By ID" )
    


    class Meta:
        model = models.Country 
        fields = ['airline_id']

    def clean_airline_id(self):
        airline_id = int(self.cleaned_data['airline_id'])
        if len(BaseFuncade.get_airline_by_id(airline_id))== 0:
            raise forms.ValidationError('Invalid Ailine id')
        return airline_id
        
    






# show not as chooseble list but expend with tickets to each flight 
class NewTicketForm(forms.ModelForm):
    # customer_id = forms.CharField(max_length=128, widget=forms.TextInput(attrs={'placeholder': 'Please enter the title'}))
    # customer_id = forms.ModelChoiceField(queryset=models.Customer.objects.all(),required=True, label='Customer ID')

    flight_id = forms.ModelChoiceField(queryset=models.Flight.objects.all(), required=True , label='Flight ID')
    # flight_id = forms.ChoiceField(widget=forms.Select, choices=models.Flight.objects.all().values_list('airline_id', 'origin_country_id'), required=False, help_text="Flight ID")
   
    class Meta:
        model = models.Flight_Ticket
        # fields = ['customer_id', 'flight_id']
        fields = ['flight_id']

    # def clean_message(self):
    #     customer_id = self.cleaned_data['customer_id']
    #     return customer_id

    # def __str__(self) -> str:
    #     customer_id = customer_id.id
    #     return customer_id


#add password validator 
#https://medium.com/geekculture/django-shorts-password-validators-95285c0936de



class Login(AuthenticationForm):

    #by deafult it takes an email as username 
    username = forms.CharField( label="Email")
    # email = forms.EmailField( max_length=60, help_text='required', label="Emule")
    # password = forms.CharField(max_length=16 ,  widget=forms.PasswordInput() , label="Password")
    class Meta: 
        model = Account
        # fields = '__all__'
        fields = ("username", 'password',) 
        

username_validator = UnicodeUsernameValidator()


# UserCreationForm does not support item assigments
class RegistrationForm(UserCreationForm):
    email = forms.EmailField( max_length=60, help_text='required')
    # first_name = forms.CharField(max_length=50 , required=True, label="Yo name ")
    # last_name = forms.CharField(max_length=50 , required=True , label= "Yo fam name") 
    # address = forms.CharField(max_length=255 ,  required=True, label="Where Yo live fool?")
    # phone_number = forms.IntegerField(max_value = 9999999999, label="Yo phone , real one this time ")
    # credit_card_no = forms.IntegerField(max_value = 9999999999999999, label="Credit card , you can trust me..., to buy some expensive shit!") 
    # account_role = forms.IntegerField(widget=forms.HiddenInput() , required=False, label="")
    class Meta:
        model = Account
        fields = ("email", 'username',) #'password1', 'password2' )
        



class NewCustomerForm(forms.ModelForm):
    first_name = forms.CharField(max_length=50 , required=True, label="Yo name ")
    last_name = forms.CharField(max_length=50 , required=True , label= "Yo fam name") 
    address = forms.CharField(max_length=255 ,  required=True, label="Where Yo live fool?")
    phone_number = forms.IntegerField(max_value = 9999999999, label="Yo phone , real one this time ")
    credit_card_no = forms.IntegerField(max_value = 9999999999999999, label="Credit card , you can trust me..., to buy some expensive shit!") 

    class Meta:
        model = models.Customer
        fields = ['first_name', 'last_name', 'address', 'phone_number', 'credit_card_no']
    
    def clean_credit_card_no(self):
        credit_card = self.cleaned_data['credit_card_no']
        phone = self.cleaned_data['phone_number']
        print(credit_card)
        print(phone)
        try:
              cus = models.Customer.objects.get(credit_card_no=credit_card)
              print('hello')
              raise forms.ValidationError('User with this credit card number already exists')
        except:
              try:
                  cus = models.Customer.objects.get(phone_number=phone)
                  print('hi')
                  raise forms.ValidationError('User with this phonenumber already exists')
              except:
                  return credit_card

    # def clean_message(self):
    #     customer_id = self.cleaned_data['customer_id']
    #     return customer_id

class NewFlightForm(forms.ModelForm):

    #def __init__(self, *args, **qwargs):
    #    super(models.Flight, self).__init__(*args, **qwargs)

    origin_country = forms.ModelChoiceField(queryset=models.Country.objects.all(), required=True, label = 'From')
    destination_country = forms.ModelChoiceField(queryset=models.Country.objects.all(), required=True, label = 'To')
    departure_time = forms.DateTimeField(required=True, label = 'Departure at', input_formats=[r'%d/%m/%Y %H:%M'])
                    #,widget=forms.DateTimeInput(format=[r'%d/%m/%Y %H:%M']))

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




# do not use tags simular to bulit in functions
class RemoveTicket(forms.ModelForm):


    ticket_id = forms.ModelChoiceField(queryset=models.Flight_Ticket.objects.all(), required=False , label='',)

    def __init__(self, user, *args, **kwargs):
        self.customer_id = user
        super(RemoveTicket, self).__init__(*args, **kwargs)

        self.fields['ticket_id'].queryset=models.Flight_Ticket.objects.filter(customer_id = self.customer_id)

    class Meta:
        model = models.Flight_Ticket
        fields = ['ticket_id']




#################################################################
#class SignUpForm(UserCreationForm):
#     # first_name = forms.CharField(max_length=12, min_length=4, required=True, help_text='Required: First Name',
#     #                             widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'First Name'}))
#     # # last_name = forms.CharField(max_length=12, min_length=4, required=True, help_text='Required: Last Name',
#     #                            widget=(forms.TextInput(attrs={'class': 'form-control'})))
#     email = forms.EmailField(max_length=50, help_text='Required. Inform a valid email address.',
#                              widget=(forms.TextInput(attrs={'class': 'form-control'})))
#     password1 = forms.CharField(label=_('Password'),
#                                 widget=(forms.PasswordInput(attrs={'class': 'form-control'})),
#                                 help_text=password_validation.password_validators_help_text_html())
#     password2 = forms.CharField(label=_('Password Confirmation'), widget=forms.PasswordInput(attrs={'class': 'form-control'}),
#                                 help_text=_('Just Enter the same password, for confirmation'))
#     username = forms.CharField(
#         label=_('Username'),
#         max_length=150,
#         help_text=_('Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.'),
#         validators=[username_validator],
#         error_messages={'unique': _("A user with that username already exists.")},
#         widget=forms.TextInput(attrs={'class': 'form-control'})
#     )

#     class Meta:
#         model = User
#         fields = ('username', 'email', 'password1', 'password2',)

# # class SignUpForm(UserCreationForm):
# #     username = forms.CharField(max_length=10 , required=True, label="The most impressing nickname you ever had")
# #     # password = forms.CharField(max_length=16 ,  widget=forms.PasswordInput() , label="Password, why bother probably you will use 123456")
# #     email = forms.EmailField(max_length=255 ,  required=True, label="email, Prepare for shitload of SPAM baby")
# #     class Meta:
# #         model = User
# #         fields = ['username','email','password1','password2' ]

# #     # def clean_message(self):
# #     #     customer_id = self.cleaned_data['customer_id']
# #     #     return customer_id

# class LoginForm(AuthenticationForm):
#     # email = forms.EmailField( max_length=60, help_text='required')
#     # username = forms.CharField(max_length=10 , required=True, label="Username", widget=forms.TextInput(attrs={'class': 'form-control'}))
#     # password = forms.CharField(max_length=16 ,  widget=forms.PasswordInput() , label="Password")
#     # password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control'}))
#     class Meta:
#         model = Account
#         # fields = '__all__'
#         fields = ['email', 'password1']
        
# class NewTicketForm(forms.ModelForm):
#     # customer_id = forms.CharField(max_length=128, widget=forms.TextInput(attrs={'placeholder': 'Please enter the title'}))
#     # customer_id = forms.ModelChoiceField(queryset=models.Customer.objects.all(),required=True, label='Customer ID')

#     flight_id = forms.ModelChoiceField(queryset=models.Flight.objects.all(), required=True , label='Flight ID')
   
#     class Meta:
#         model = models.Flight_Ticket
#         # fields = ['customer_id', 'flight_id']
#         fields = ['flight_id']

#     # def clean_message(self):
#     #     customer_id = self.cleaned_data['customer_id']
#     #     return customer_id

#     # def __str__(self) -> str:
#     #     customer_id = customer_id.id
#     #     return customer_id


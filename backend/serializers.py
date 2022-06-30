from rest_framework.serializers import ModelSerializer , SlugRelatedField, ValidationError
from .models import *




#helper function to connect pk with name
def db_link(field):
        return SlugRelatedField(many=False,read_only=True,slug_field=field)
 

class FlightSerializer(ModelSerializer):


    destination_country = db_link("country_name")
    origin_country = db_link("country_name")
    airline = db_link("name")

    class Meta:
        model = Flight
        fields = '__all__'



class AirlineSerializer(ModelSerializer):

    country = db_link("country_name")
    account = db_link("username")
    
    class Meta:
        model = Airline
        fields = '__all__'



class CountrySerializer(ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'


class AllAccount_rolesSerializer(ModelSerializer):


    class Meta:
        model = Account_Role
        fields = '__all__'

class AccountSerializer(ModelSerializer):
    account_role = db_link("role_name")


    class Meta:
        model = Account
        fields = '__all__'
    # def validate_email(self, data):
    #     email = data['email']
    #     try:
    #         account = Account.objects.exclude(pk=self.instance.pk).get(email=email)
    #     except Account.DoesNotExist:
    #         return email
    #     raise ValidationError(f'email: {email} is already in use')

class CustomerSerializer(ModelSerializer):
    account = db_link("username")

    class Meta:
        model = Customer
        fields = '__all__'

class AdminSerializer(ModelSerializer):
    account = db_link("username")

    class Meta:
        model = Administrator
        fields = '__all__'



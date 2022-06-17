from rest_framework.serializers import ModelSerializer , SlugRelatedField 
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

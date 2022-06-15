from rest_framework.serializers import ModelSerializer , SlugRelatedField 
from .models import *



class AllFlightSerializer(ModelSerializer):

    def db_link(field):
        return SlugRelatedField(many=False,read_only=True,slug_field=field)
 

    destination_country = db_link("country_name")
    origin_country = db_link("country_name")
    airline = db_link("name")

    class Meta:
        model = Flight
        fields = '__all__'


class AllAccount_rolesSerializer(ModelSerializer):


    class Meta:
        model = Account_Role
        fields = '__all__'

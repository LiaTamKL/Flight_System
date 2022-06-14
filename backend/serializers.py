from rest_framework.serializers import ModelSerializer , SlugRelatedField , SerializerMethodField
from .models import *
from datetime import datetime



class AllFlightsSerializer(ModelSerializer):

    # links PKS with DB enteries 
    def db_link(field):
        return SlugRelatedField(many=False,read_only=True,slug_field=field)
 

    destination_country = db_link("country_name")
    origin_country = db_link("country_name")
    airline = db_link("name")

    class Meta:
        model = Flight
        fields = '__all__'


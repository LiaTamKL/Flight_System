from ..serializers import CountrySerializer
from ..models import Country
from rest_framework import status
from rest_framework.response import Response
from ..DAL.base_facade import BaseFuncade

def __check_if_exists(id):
    try:
        country = Country.objects.get(pk = id)
        return country
    except Country.DoesNotExist:
        return 404

def __check_if_admin(request):
    if request.user.is_admin == False:
        return 400
    else: return True



def all_countries_api():
    countries =  Country.objects.all()
    seralizer = CountrySerializer(countries, many = True)
    return Response(seralizer.data)

def get_country_api(id):
    country = __check_if_exists(id)
    if country == 404:
        return Response(data='Country does not exist', status=status.HTTP_404_NOT_FOUND)
    seralizer = CountrySerializer(country, many = False)
    return Response(seralizer.data)

def update_country_api(request, id):
    if __check_if_admin(request) == 400:
        return Response(data='Only admins may do this', status=status.HTTP_400_BAD_REQUEST)
    data = request.data
    country = __check_if_exists(id)
    if country == 404:
        return Response(data='Country does not exist', status=status.HTTP_404_NOT_FOUND)

    seralizer = CountrySerializer(instance=country, data=data)
    
    if seralizer.is_valid():
        seralizer.save()
        return Response(seralizer.data)
    else:
        return Response(data=seralizer.errors ,status=status.HTTP_400_BAD_REQUEST)

def delete_country_api(request, id):
    if __check_if_admin(request) == 400:
        return Response(data='Only admins may do this', status=status.HTTP_400_BAD_REQUEST)
    data = request.data
    country = __check_if_exists(id)
    if country == 404:
        return Response(data='Country does not exist', status=status.HTTP_404_NOT_FOUND)

    country = BaseFuncade.get_country_by_id(id)
    country.delete()
    return Response("Deleted")

def create_country_api(request):
    if __check_if_admin(request) == 400:
        return Response(data='Only admins may do this', status=status.HTTP_400_BAD_REQUEST)
    data = request.data
    data['country_name'] = data["countryName"]
    # country = Country.objects.create(
    #     country_name = data["countryName"],
    #     flag = data["flag"]
    # )
    seralizer = CountrySerializer(data=data, many = False)
    if seralizer.is_valid():
        seralizer.save()
        return Response('country made successfully')
    else:
        return Response(data=seralizer.errors ,status=status.HTTP_400_BAD_REQUEST)
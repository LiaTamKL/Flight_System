from django.urls import path
from . import views

urlpatterns = [
    path('', views.homeview) ,
    path('flightinfo/', views.show_flight_info),
    path('airlineinfo/', views.show_airline_info),
    path('countryinfo/', views.show_countries_info),
    path('countryinfo/<country_id>' ,views.show_country_by_id),
    path('searchcountry/', views.show_country_search_from)
    #path('test/', views.testview)
]
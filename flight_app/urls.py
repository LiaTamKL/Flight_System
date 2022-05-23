from django.urls import path
from . import views

urlpatterns = [
    path('', views.homeview) ,
    path('flightinfo/', views.show_flight_info),
    path('airlineinfo/', views.show_airline_info),
    path('countryinfo/', views.show_countries_info),
    path('countryinfo/<country_id>' ,views.show_country_by_id),
    path('seachcountrybyid/', views.show_country_search_from),
<<<<<<< HEAD
    path('tickets/add', views.FormPlace.add_ticket),
    path('airline/<airline_id>', views.view_flights_by_airline),
=======


    path('airline/view/<airline_id>', views.view_flights_by_airline),
>>>>>>> 55875f0917ef1b3b73b8082809a8ceb62fffe2f5
    path('airline/delete/<flight_id>', views.delete_flight_for_airline),
    path('airline/add', views.airline_add_flight),

    #path('test/', views.testview)
]
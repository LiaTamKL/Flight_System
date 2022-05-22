from django.urls import path
from . import views

urlpatterns = [
    path('', views.testview ),
    path('flightinfo/', views.show_flight_info),
    path('airlineinfo/', views.show_airline_info),
    path('countryinfo/', views.show_countries_info),
    path('countryinfo/<country_id>' ,views.show_country_by_id),
    path('formtest/', views.show_contact_from),

    path('airline/<airline_id>', views.view_flights_by_airline),
    path('airline/delete/<flight_id>', views.delete_flight_for_airline),

    #path('test/', views.testview)
]
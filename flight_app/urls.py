from django.urls import path
from . import views

urlpatterns = [
    path('', views.homeview) ,
    path('flightinfo/', views.show_flight_info),
    path('airlineinfo/', views.show_airline_info),
    path('countryinfo/', views.show_countries_info),
    path('countryinfo/<country_id>' ,views.show_country_by_id),
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    path('searchcountry/', views.show_country_search_from)
=======
=======
>>>>>>> 75f967abe5426d2c6240a58e22df21797101f685
=======
>>>>>>> 75f967abe5426d2c6240a58e22df21797101f685
    path('formtest/', views.show_contact_from),

    path('airline/<airline_id>', views.view_flights_by_airline),
    path('airline/delete/<flight_id>', views.delete_flight_for_airline),

<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 75f967abe5426d2c6240a58e22df21797101f685
=======
>>>>>>> 75f967abe5426d2c6240a58e22df21797101f685
=======
>>>>>>> 75f967abe5426d2c6240a58e22df21797101f685
    #path('test/', views.testview)
]
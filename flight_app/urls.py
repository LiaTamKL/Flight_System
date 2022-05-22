from django.urls import path
from . import views

urlpatterns = [
    path('', views.testview ),
    path('flightinfo/', views.show_flight_info),
    path('airlineinfo/', views.show_airline_info),
    path('countryinfo/', views.show_countries_info)
    #path('test/', views.testview)
]
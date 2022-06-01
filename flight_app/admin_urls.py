from django.urls import path
from . import views
from django.shortcuts import redirect






urlpatterns = [
    path('', lambda request: redirect('home/', permanent=True)),

    #customers
    path('home/', views.on_login, name="admin home"),
    path('delete/<customer_id>',views.delete_customer, name="delete customer"),
    path('add_from_customer/<account>', views.add_admin_from_customer, name="admin from customer"),
    

    #airlines
    path('airline/all/', views.view_all_airlines, name="view all airlines"),
    path('airline/add/', views.add_airline, name="add airlines"),
    path('airline/remove/', views.delete_airline, name="remove airlines"),

    #administrators
     path('admins/add/<account>', views.add_admin_from_customer, name="add admin"),
     path('admins/remove/<admin_id>', views.delete_admin, name="remove admin"),

    path('country/all/', views.view_all_countries, name="view all countries"),
    path('flights/all/', views.view_all_flights, name="view all flights"),
   
    path('airline/bycountry/', views.view_airline_by_country, name="view airline by country"),


    path("search/flights/", views.view_flights_by_params, name="view flight by params"),
    path("search/flights/departure/", views.view_departure_by_country, name= "departure by country"),
    path("search/flights/arrival/", views.view_arrival_by_country, name='arrival by country'),
    path("search/flights/byairline/", views.view_flights_by_airline_cust, name='flights by airline'),

   
    path('test/', views.test),


    # path('ticket/view/<cust_id>', views.get_my_tickets),
    
    path('flights/myview/', views.view_flights_by_airline, name="airline view flights"),
    path('flights/delete/<flight_id>', views.delete_flight_for_airline, name="delete flight"),
    path('flights/add', views.airline_add_flight, name='add flight'),
    path('flights/update/<flight_id>', views.airline_update_flight, name='update flight'),


]
   




    ############################################
                #Old / test routes 
    ############################################
    # path('newuser/', views.add_new_user), 
    # path('register/', views.add_new_customer_anonymous),
    # path('custloggedin/<user_id>' , views.cust_login),
    # path("accounts/login/[name='login']", views.login_page ),
    #path('test/', views.testview)
    # # 
    # path('airlineloggedin/<user_id>' , views.airline_login),
    # path('loggedin' , views.logged_in),
    # path('members/tickets/remove/<ticket_id>', views.remove_ticket),    
    # # path('denied',views.members_tickets),

    # path('test/', views.test),
    
    # path('flightinfo/', views.show_flight_info),
    # path('airlineinfo/', views.show_airline_info),
    
    # path('countryinfo/<country_id>' ,views.show_country_by_id),
    # path('seachcountrybyid/', views.show_country_search_from),


    # path('members/country/byid/', views.view_countries_by_id),
    # path('members/flights/byid/', views.view_flights_by_id),
    # path('members/airline/byid/', views.view_airline_by_id),
    # path('ticket/remove/<ticket_id>', views.remove_ticket),

        # path('tickets/add/',views.add_ticket, name='add tickets'),
    # path('tickets/remove/', views.remove_ticket, name='remove tickets'),
    # path('tickets/all/', views.get_my_tickets, name='view all tickets'),
    # path('update_account/', views.update_account, name='update account'),
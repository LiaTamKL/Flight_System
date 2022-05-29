from django.urls import path
from . import views
from django.shortcuts import redirect

urlpatterns = [
    path('', views.homeview, name='home') ,
    path('admin/', lambda request: redirect('/admin/login/', permanent=True)),
    path('members/', lambda request: redirect('home', permanent=True)),

   
    path('login/',views.user_login, name='login'),
    path('members/homepage/',views.members_homepage),   
    path('members/tickets/add/',views.add_ticket),
    path('members/tickets/remove/', views.remove_ticket),
    path('members/tickets/all/', views.get_my_tickets),
    path('members/update_account/', views.update_account),
    


    path('members/country/all/', views.view_all_countries),
    path('members/flights/all/', views.view_all_flights),
    path('members/airline/all/', views.view_all_airlines),
    path('members/airline/bycountry/', views.view_airline_by_country),


    path("members/search/flights/", views.view_flights_by_params),
    path("members/search/flights/departure/", views.view_departure_by_country),
    path("members/search/flights/arrival/", views.view_arrival_by_country),
    path("members/search/flights/byairline/", views.view_flights_by_airline_anony),


    


    # path('members/airline/byparams/', views.view_airline_by_params),


    path('register/', views.register_customer),
    path('logout/', views.logout),

    
    path('test/', views.test),


    # path('ticket/view/<cust_id>', views.get_my_tickets),
    
    path('airline/view/', views.view_flights_by_airline, name="airline view flights"),
    path('airline/delete/<flight_id>', views.delete_flight_for_airline, name="delete flight"),
    path('airline/add', views.airline_add_flight, name='add flight'),
    path('airline/update/<flight_id>', views.airline_update_flight, name='update flight'),

   path('ouradmin/', views.view_all_customers, name="admin home"),
   path('ouradmin/delete/<customer_id>',views.delete_customer, name="delete customer"),
   path('ouradmin/add_from_customer/<customer_id>', views.add_admin_from_customer, name="admin from customer")
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
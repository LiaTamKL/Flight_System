from django.urls import path
from . import views

urlpatterns = [
    path('', views.homeview, name='home') ,
    path('flightinfo/', views.show_flight_info),
    path('airlineinfo/', views.show_airline_info),
    path('countryinfo/', views.show_countries_info),
    path('countryinfo/<country_id>' ,views.show_country_by_id),
    path('seachcountrybyid/', views.show_country_search_from),
    path('ticket/add', views.add_ticket),
    path('ticket/remove/<ticket_id>', views.remove_ticket),
    # path('login/',views.user_login),

    path('register/', views.register),
    

    # path('airlineloggedin/<user_id>' , views.airline_login),



    path('ticket/view/<cust_id>', views.get_my_tickets),
    
    path('airline/view/<airline_id>', views.view_flights_by_airline),
    path('airline/delete/<flight_id>', views.delete_flight_for_airline),
    path('airline/add', views.airline_add_flight),
    path('airline/update/<flight_id>', views.airline_update_flight),

   
]




    ############################################
                #Old / test routes 
    ############################################
    # path('newuser/', views.add_new_user), 
    # path('register/', views.add_new_customer_anonymous),
    # path('custloggedin/<user_id>' , views.cust_login),
    # path("accounts/login/[name='login']", views.login_page ),
    #path('test/', views.testview)
    # # path('loggedin' , views.logged_in),
    #path('login/',views.user_login),
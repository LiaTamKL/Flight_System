from django.urls import path , include
from .views import *
from django.shortcuts import redirect
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
# from .views import MyTokenObtainPairView

urlpatterns = [
    path('', lambda request: redirect('home/', permanent=True)),
    path('home/', homeview, name='home') ,

    path('admin/', lambda request: redirect('/admin/login/', permanent=True)),
    
    path('members/', include('backend.members_urls')),
    path('ouradmin/', include('backend.admin_urls')),
 
    path('login/',user_login, name='login'),
    
    path('country/all/', view_all_countries, name="view all countries anony"),
    path('flights/all/', view_all_flights, name="view all flights anony"),
    path('airline/all/', view_all_airlines, name="view all airlines anony"),
    path('airline/bycountry/', view_airline_by_country, name="view airline by country anony"),


    path("search/flights/", view_flights_by_params, name="view flight by params anony"),
    path("search/flights/departure/", view_departure_by_country, name= "departure by country anony"),
    path("search/flights/arrival/", view_arrival_by_country, name='arrival by country anony'),
    path("search/flights/byairline/", view_flights_by_airline_cust, name='flights by airline anony'),


    path('register/', register_customer, name='login'),
    path('logout/', logout,name='logout'),

    

    
    ############## backend #########################
    # path('test/', test),
        

    path('flights/search/', Flightfilter.as_view()),
    path ('flights/',Flightfilter.as_view()),
    # path ('flights/create', createfli),
    # path ('flights/<str:id>/update', updatefli),
    # path ('flights/<str:id>/delete', deletefli),
    path ('flights/<str:id>/', getfli),
    


    path('airlines/', allair,),
    path('airlines/<str:id>/', getair),

    # path ('countries/', allcount),
    # #path ('countries/create', createfli),
    # path ('countries/<str:id>/update', updatecount),
    # path ('countries/<str:id>/delete', deletecount),
    # path ('countries/<str:id>/', createcount),

    path('api/country/', Countryfilterget.as_view()),

    path('api/tickets/', TicketByUserfilter.as_view()),

    path('api/customer_api', tickets_api),

    # path('cust/tickes/str:id'),

    path ('countries/', country_api),
    path ('countries/<str:id>/', specific_country_api),



    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/user_api', user_api),
    path('api/admin_api', admin_api),
    path('api/admin_api/<str:username>', admin_delete),
    path('api/airline_api', airline_api),
    path('api/airline_api/<int:id>', airline_delete_update),


    #############################################





    
]




    ############################################
                #Old / test routes 
    ############################################
    # path('newuser/', add_new_user), 
    # path('register/', add_new_customer_anonymous),
    # path('custloggedin/<user_id>' , cust_login),
    # path("accounts/login/[name='login']", login_page ),
    #path('test/', testview)
    # # 
    # path('airlineloggedin/<user_id>' , airline_login),
    # path('loggedin' , logged_in),
    # path('members/tickets/remove/<ticket_id>', remove_ticket),    
    # # path('denied',members_tickets),

    # path('test/', test),
    
    # path('flightinfo/', show_flight_info),
    # path('airlineinfo/', show_airline_info),
    
    # path('countryinfo/<country_id>' ,show_country_by_id),
    # path('seachcountrybyid/', show_country_search_from),


    # path('members/country/byid/', view_countries_by_id),
    # path('members/flights/byid/', view_flights_by_id),
    # path('members/airline/byid/', view_airline_by_id),
    # path('ticket/remove/<ticket_id>', remove_ticket),

        # path('members/homepage/',members_homepage),   
    # path('members/tickets/add/',add_ticket),
    # path('members/tickets/remove/', remove_ticket),
    # path('members/tickets/all/', get_my_tickets),
    # path('members/update_account/', update_account),

        # path('members/', lambda request: redirect('home', permanent=True)),
        
    # path('members/airline/byparams/', view_airline_by_params),


        # path('ticket/view/<cust_id>', get_my_tickets),
    
#     path('airline/view/', view_flights_by_airline, name="airline view flights"),
#     path('airline/delete/<flight_id>', delete_flight_for_airline, name="delete flight"),
#     path('airline/add', airline_add_flight, name='add flight'),
#     path('airline/update/<flight_id>', airline_update_flight, name='update flight'),

#    path('ouradmin/', view_all_customers, name="admin home"),
#    path('ouradmin/delete/<customer_id>',delete_customer, name="delete customer"),
#    path('ouradmin/add_from_customer/<account>', add_admin_from_customer, name="admin from customer"),
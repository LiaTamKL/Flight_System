from django.urls import path , include
from .views import *
from django.shortcuts import redirect
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
  
    
    ############## backend #########################
    # path('test/', test),
        

    path('flights/search/', Flightfilter.as_view()),
    # path ('flights/',Flightfilter.as_view()),

    # path ('flights/<str:id>/', getfli),
    


    

    # path('airlines/', allair,),
    # path('airlines/<str:id>/', getair),


    path('api/country/', Countryfilterget.as_view()),
    
    # path('api/tickets/', TicketByUserfilter.as_view()),

    path('api/customer_api', tickets_api),

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



  # path('', lambda request: redirect('home/', permanent=True)),
    # path('home/', homeview, name='home') ,

    # path('admin/', lambda request: redirect('/admin/login/', permanent=True)),
    
    # path('members/', include('backend.members_urls')),
    # path('ouradmin/', include('backend.admin_urls')),
 
    # path('login/',user_login, name='login'),
    
    # path('country/all/', view_all_countries, name="view all countries anony"),
    # path('flights/all/', view_all_flights, name="view all flights anony"),
    # path('airline/all/', view_all_airlines, name="view all airlines anony"),
    # path('airline/bycountry/', view_airline_by_country, name="view airline by country anony"),


    # path("search/flights/", view_flights_by_params, name="view flight by params anony"),
    # path("search/flights/departure/", view_departure_by_country, name= "departure by country anony"),
    # path("search/flights/arrival/", view_arrival_by_country, name='arrival by country anony'),
    # path("search/flights/byairline/", view_flights_by_airline_cust, name='flights by airline anony'),


    # path('register/', register_customer, name='login'),
    # path('logout/', logout,name='logout'),

    

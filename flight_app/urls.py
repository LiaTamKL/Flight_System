from django.urls import path
from . import views
from django.shortcuts import redirect

urlpatterns = [
    path('', views.homeview, name='home') ,
    path('admin/', lambda request: redirect('/admin/login/', permanent=True)),
    path('members/', lambda request: redirect('home', permanent=True)),


    path('flightinfo/', views.show_flight_info),
    path('airlineinfo/', views.show_airline_info),
    
    path('countryinfo/<country_id>' ,views.show_country_by_id),
    path('seachcountrybyid/', views.show_country_search_from),



    # path('ticket/remove/<ticket_id>', views.remove_ticket),
    path('login/',views.user_login, name='login'),
    path('members/homepage/',views.members_homepage),   
    path('members/tickets/add/',views.add_ticket),
    path('members/tickets/remove/', views.remove_ticket),
    path('members/tickets/all/', views.get_my_tickets),
    path('members/update_account/', views.update_account),
    path('members/country/all/', views.all_countries),
    

    # path('denied',views.members_tickets),






    path('register/', views.register_customer),
    path('logout/', views.logout),

    



    # path('ticket/view/<cust_id>', views.get_my_tickets),
    
    path('airline/view/', views.view_flights_by_airline),
    path('airline/delete/<flight_id>', views.delete_flight_for_airline),
    path('airline/add', views.airline_add_flight),
    path('airline/update/<flight_id>', views.airline_update_flight),

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
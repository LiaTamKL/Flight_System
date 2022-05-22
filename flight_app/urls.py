from django.urls import path
from . import views

urlpatterns = [
    path('', views.testview ),
    path('allflights/', views.show_flight_info)
    #path('test/', views.testview)
]
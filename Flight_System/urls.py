"""Flight_System URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path , include
from django.shortcuts import redirect
from django.views.generic import TemplateView
import re

urlpatterns = [
    path('adm/', admin.site.urls),

    #backend paths
    path('backend/', include('backend.urls')),


    #frontend paths
    path('*', TemplateView.as_view(template_name='index.html')),
    path('', TemplateView.as_view(template_name='index.html')),
    path('login', TemplateView.as_view(template_name='index.html')),
    path('home', TemplateView.as_view(template_name='index.html')),
    path('Home', TemplateView.as_view(template_name='index.html')),
    path('flights', TemplateView.as_view(template_name='index.html')),
    path('update', TemplateView.as_view(template_name='index.html')),
    path('update/password', TemplateView.as_view(template_name='index.html')),

    path('admin/view_airlines', TemplateView.as_view(template_name='index.html')),
    path('admin/view_admins', TemplateView.as_view(template_name='index.html')),
    path('admin/view_specific', TemplateView.as_view(template_name='index.html')),
    path('admin/make_airline/:username', TemplateView.as_view(template_name='index.html')),
    path('admin/make_admin/:username', TemplateView.as_view(template_name='index.html')),
    path('admin/make_customer/:username', TemplateView.as_view(template_name='index.html')),
    path('admin/make_country', TemplateView.as_view(template_name='index.html')),

    path('customer', TemplateView.as_view(template_name='index.html')),
    path('customer/tickets', TemplateView.as_view(template_name='index.html')),
    path('customer/flight/search', TemplateView.as_view(template_name='index.html')),

    path('airline', TemplateView.as_view(template_name='index.html')),
    path('airline/add_flight', TemplateView.as_view(template_name='index.html')),


]
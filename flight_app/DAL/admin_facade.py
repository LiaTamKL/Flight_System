from ..models import *
from ..forms import *
from django.http import Http404
from .base_facade import BaseFuncade

class AdministratorFuncade(BaseFuncade):
    # def add_customer(customer_id, form):
    #     cust = Customer()
    #     id = Airline.objects.get(pk = customer_id)
    #     cust.id = id
    #     cust.address = form['address']
    #     cust.credit_card_no = form['credit_card_no']
    #     cust.first_name = form['first_name']
    #     cust.last_name = form['last_name']
    #     cust.user = form['user_id']
    #     cust.save()
    

    def get_all_customers():
        cus = Customer.objects.all()
        return cus

    def add_airline():
        pass
    
    def add_customer():
        pass
    def add_admin():
        pass
    def remove_airline(airline):
        pass
    def remove_customer(customer):
        pass
    def remove_admin(admin):
        pass



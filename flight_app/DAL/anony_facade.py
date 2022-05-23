from ..models import *
from ..forms import *
from django.http import Http404
from .base_facade import BaseFuncade
class AnonymusFancade(BaseFuncade):
    
    def login(username, password):
        pass
    

    def add_customer(created_user_id,form):
        cust = Customer()
        created_user = User.objects.get(pk = created_user_id)
        cust.first_name = form['first_name']
        cust.last_name = form['last_name']
        cust.address = form['address']
        cust.credit_card_no = form['credit_card_no']
        cust.user = created_user
        cust.save()


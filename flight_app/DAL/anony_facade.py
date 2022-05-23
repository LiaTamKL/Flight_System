from ..models import *
from ..forms import *
from django.http import Http404
from .base_facade import BaseFuncade
from django.db import transaction

class AnonymusFancade(BaseFuncade):
    
    def login(form):
        username_or_mail = form["username_or_mail"]
        password = form["password"]
        cl = (models.User.objects.get(username = username_or_mail)).username
        pass
       
        # raise Exception({cl})
        # # models.User.objects.filter

        # if (models.User.objects.filter(username = username_or_mail) == username_or_mail) or \
        # (models.User.objects.filter(email = username_or_mail) ==  username_or_mail):
        #     if (models.User.objects.filter(password = password) ==  password):
                
        #         logged_user_role = (models.User.objects.filter(username = username_or_mail) == username_or_mail).user_role
        #         logged_user_id = (models.User.objects.filter(username = username_or_mail) == username_or_mail).id
                
        #         raise Exception({logged_user_role , logged_user_id})
        #         return logged_user_role , logged_user_id


    def add_customer(created_user_id,form):
        with transaction.atomic():
            # if one of the settings is empty do not write to db
            cust = Customer()
            created_user = User.objects.get(pk = created_user_id)
            cust.first_name = form['first_name']
            cust.last_name = form['last_name']
            cust.address = form['address']
            cust.phone_number = form['phone_number']
            cust.credit_card_no = form['credit_card_no']
            cust.user = created_user
            cust.save()
from ..models import Customer
from .base_facade import BaseFuncade
from django.contrib.auth import authenticate, login


class AnonymusFancade(BaseFuncade):


    def login(request, form):
        """takes form with username and passwword, logs user in if they match"""
        username = form["username"]
        password = form["password"]
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            logged = True
         
        return logged
            

    def add_customer(form , created_account) :
        """takes form and created account, makes new customer for said new account"""
        form.save()
        created_customer = Customer.objects.get(phone_number =  form.data['phone_number'])
        created_customer.account_id = created_account.id
        created_customer.save()

        
        
  

            
            ###############################################
                            # Old methods
            ###############################################
            #         with transaction.atomic():
            # # if one of the settings is empty do not write to db
            # # cust = Customer()
            # # created_user = User.objects.get(pk = created_user_id)
            # # cust.first_name = form['first_name']
            # # cust.last_name = form['last_name']
            # # cust.address = form['address']
            # # cust.phone_number = form['phone_number']
            # # cust.credit_card_no = form['credit_card_no']
            # # cust.user = created_user
            # # cust.save()


                  # cus = Customer()
        # cus.address = form['address']
        # cus.credit_card_no = form['credit_card_no']
        # cus.first_name = form['first_name']
        # cus.last_name = form['last_name']
        # cus.account = form['account_id']
        # cus.phone_number = form['phone_number']
        # cus.save()
       
       
        # form.save()
        # account_id = created_account["id"]
        # # raise Exception({account_id})
        # created_customer_id = form.cleaned_data['id']
        # created_customer = models.Customer.objects.get(id = created_customer_id)
        # # raise Exception({account_id , created_customer})
        # created_customer.account_id = account_id
        # created_customer.save()

            
            
                # def login(username. password):
            #     pass

            # def login(form):
                
                
                
                # username_or_mail = form["username_or_mail"]
                # password = form["password"]
                # cl = (models.User.objects.get(username = username_or_mail)).username
                # pass
                
                # raise Exception({cl})
                # # models.User.objects.filter

                # if (models.User.objects.filter(username = username_or_mail) == username_or_mail) or \
                # (models.User.objects.filter(email = username_or_mail) ==  username_or_mail):
                #     if (models.User.objects.filter(password = password) ==  password):
                        
                #         logged_user_role = (models.User.objects.filter(username = username_or_mail) == username_or_mail).user_role
                #         logged_user_id = (models.User.objects.filter(username = username_or_mail) == username_or_mail).id
                        
                #         raise Exception({logged_user_role , logged_user_id})
                #         return logged_user_role , logged_user_id
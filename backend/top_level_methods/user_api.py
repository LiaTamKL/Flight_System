
from rest_framework import status
from rest_framework.response import Response
from ..serializers import AccountSerializer, CustomerSerializer
from ..DAL.base_facade import BaseFuncade
from ..DAL.anony_facade import AnonymusFancade
from ..models import *

def register_user(request):
            try: 
                account_role = Account_Role.objects.get(role_name='Customer')
                acc_form = {}
                cus_form = {}
                acc_form['username'] = request.data['username']
                acc_form['email'] = request.data['email']
                acc_form['password'] = request.data['password']
                acc_form['account_role'] = account_role.pk
                cus_form['first_name'] = request.data['first_name']
                cus_form['last_name'] = request.data['last_name']
                cus_form['address'] = request.data['address']
                cus_form['phone_number'] = request.data['phone_number']
                cus_form['credit_card_no'] = request.data['credit_card_no']
            except: return Response(data='ERROR Json parameters not entered correctly.', status=status.HTTP_400_BAD_REQUEST)

            acc_serializer = AccountSerializer(data=acc_form, many = False)
            cus_serializer = CustomerSerializer(data=cus_form, many = False)

            if acc_serializer.is_valid() and cus_serializer.is_valid():
                created_account = BaseFuncade.create_new_user(acc_serializer)
                AnonymusFancade.add_customer(cus_serializer , created_account)
                context = {'data':{'username':acc_serializer.data['username'], 'email':acc_serializer.data['email'], 'first_name':cus_serializer.data['first_name'], 'last_name':cus_serializer.data['last_name']}}
                return Response(context)
            else:
                acc_serializer.is_valid()
                cus_serializer.is_valid()
                context = {}
                for k in acc_serializer.errors:
                    print(acc_serializer.errors[k][0])
                print(acc_serializer.errors)
                print(cus_serializer.errors)
                print(context)
                return Response(data=(acc_serializer.errors, cus_serializer.errors) ,status=status.HTTP_400_BAD_REQUEST)

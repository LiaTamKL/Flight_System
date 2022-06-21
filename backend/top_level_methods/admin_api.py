from ..models import *
from ..DAL.admin_facade import AdministratorFuncade
from ..serializers import AccountSerializer, CustomerSerializer, AirlineSerializer, AdminSerializer
from rest_framework import status
from rest_framework.response import Response


def get_users_admin(request):
        if request.data['view']=='Customers': 
            customers = AdministratorFuncade.get_all_customers()
            serializer = CustomerSerializer(customers, many=True)
        elif request.data['view']=='Airlines':
            airlines = AdministratorFuncade.get_all_airlines()
            serializer = AirlineSerializer(airlines, many=True)
        elif request.data['view']=='Admins':
            admins = AdministratorFuncade.get_all_admins(request.user)
            serializer = AdminSerializer(admins, many=True)
        elif request.data['view']=='Specific':

            searched = AdministratorFuncade.get_by_username(request.data['username'])
            role = searched['account_role']
            user = searched['user']
            account = searched['account']
            acc_serializer = AccountSerializer(account, many=False)
            if role == 'Admin':
                second_serializer = AdminSerializer(user, many=False)
            elif role == 'Airline':
                second_serializer = AirlineSerializer(user, many=False)
            elif role == 'Customer':
                second_serializer = CustomerSerializer(user, many=False)
            else: second_serializer = False

            if second_serializer == False:
                return Response(acc_serializer.data)
            else: return Response((acc_serializer.data, second_serializer.data))

        else: 
            return Response(data='You must enter a view value.', status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data)

def change_account_role(request):
        searched = AdministratorFuncade.get_by_username(username=request.data['username'])
        account = searched['account']
        form = {}
        if searched['account_role']=='Superuser':
            return Response(data='The superuser may not be changed!', status=status.HTTP_400_BAD_REQUEST)
        if request.data['make']=='Admin':
            print("we're making an admin!")
            form['first_name'] = request.data['first_name']
            form['last_name'] = request.data['last_name']
            AdministratorFuncade.add_admin(account=account, form=form)
        elif request.data['make']=='Customer':
            print("we're making a Customer!")
            try: 
                phonetest = Customer.objects.get(phone_number=request.data['phone_number'])
                return Response(data='Phone number already in use!', status=status.HTTP_400_BAD_REQUEST)
            except Customer.DoesNotExist: 
                try:
                    cardtest = Customer.objects.get(credit_card_no=request.data['credit_card_no'])
                    return Response(data='Card number already in use!', status=status.HTTP_400_BAD_REQUEST)
                except Customer.DoesNotExist:
                    form['first_name'] = request.data['first_name']
                    form['last_name'] = request.data['last_name']
                    form['address'] = request.data['address']
                    form['phone_number'] = request.data['phone_number']
                    form['credit_card_no'] = request.data['credit_card_no']
                    AdministratorFuncade.add_customer_admin_command(account=account, form=form)
        elif request.data['make']=='Airline':
            print("we're making an airline!")
            country = Country.objects.get(country_name=request.data['country'])
            form['country'] =  country
            form['name'] = request.data['name']
            AdministratorFuncade.add_airline(account=account, form=form)
        else: return Response(data='make must specify Admin, Customer, or Airline!', status=status.HTTP_400_BAD_REQUEST)
        return Response(data=f'successful update of {account} to {account.account_role}')

def delete_full_account(request, username):
    searched = AdministratorFuncade.get_by_username(username=username)
    if searched['account_role']=='Customer':
            print('a customer! ', searched['user'])
            AdministratorFuncade.remove_customer(searched['user'])
    elif searched['account_role']=='Airline':
            print('an airline! ',searched['user'])
            AdministratorFuncade.remove_airline(searched['user'])
    elif searched['account_role']=='Admin':
            print('an admin! ',searched['user'])
            AdministratorFuncade.remove_admin(searched['user'])
    else: 
            print('a superuser! ',searched['account'])
            return Response(data='Cannot delete the superuser!', status=status.HTTP_400_BAD_REQUEST)
    AdministratorFuncade.remove_account(searched['account'])
    return Response(data=f'successful deletion of {username}')
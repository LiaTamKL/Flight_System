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
from rest_framework import status
from rest_framework.response import Response
from ..serializers import TicketSerializer
from ..DAL.base_facade import BaseFuncade
from ..DAL.anony_facade import AnonymusFancade
from ..models import Flight_Ticket, Account_Role, Customer
from ..DAL.admin_facade import AdministratorFuncade
from ..DAL.customer_facade import CustomerFancade

def are_you_a_customer(request):
    """checks if user is logged in and an customer, returns {'result':True, 'customer':customer (id)} , returns {'result':False, 'response':401 response}"""
    if request.user.is_authenticated == False:
         return {'result':False, 'response': Response(data='You are not logged in!', status=status.HTTP_401_UNAUTHORIZED)}
    if request.user.account_role != Account_Role.objects.get(role_name = 'Customer'):
         return {'result':False, 'response': Response(data='Must be a Customer to use this!', status=status.HTTP_401_UNAUTHORIZED)}
    customer = (Customer.objects.get(account=request.user)).id
    return {'result':True, 'customer':customer}

def get_all_my_tickets(customer):
    """takes customer id, returns all tickets for customer"""
    tickets =  CustomerFancade.get_my_tickets(customer)
    seralizer = TicketSerializer(tickets, many = True)
    return Response(seralizer.data)


def add_ticket_api (request, customer_id):
    """takes customer id and request data, adds ticket for customer for selected flight if there are tickets left"""
    serializer = TicketSerializer(data=request.data, many = False)
    if serializer.is_valid():
        CustomerFancade.add_ticket(request.data , customer_id)
   
        return Response(f'Successfully added a new ticket by {request.user}')       
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def remove_ticket_api(request):
    """request, deletes ticket for customer logged in"""
    serializer = TicketSerializer(data=request.data, many = False)
    if serializer.is_valid():
        CustomerFancade.remove_ticket(request.data),

        return Response(f'Successfully removed ticket by {request.user}')       
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
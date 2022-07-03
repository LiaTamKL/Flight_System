from rest_framework import status
from rest_framework.response import Response
from ..serializers import TicketSerializer
from ..DAL.base_facade import BaseFuncade
from ..DAL.anony_facade import AnonymusFancade
from ..models import *
from ..DAL.admin_facade import AdministratorFuncade
from ..DAL.customer_facade import CustomerFancade


def get_all_my_tickets(customer):
    tickets =  CustomerFancade.get_my_tickets(customer)
    seralizer = TicketSerializer(tickets, many = True)
    return Response(seralizer.data)


def add_ticket_api (request, customer_id):
    serializer = TicketSerializer(data=request.data, many = False)
    if serializer.is_valid():
        CustomerFancade.add_ticket(request.data , customer_id)
   
        return Response(f'Successfully added a new ticket by {request.user}')       
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def remove_ticket_api(request):
    serializer = TicketSerializer(data=request.data, many = False)
    if serializer.is_valid():
        CustomerFancade.remove_ticket(request.data),

        return Response(f'Successfully removed ticket by {request.user}')       
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
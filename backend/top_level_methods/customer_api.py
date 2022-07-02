from rest_framework import status
from rest_framework.response import Response
from ..serializers import TicketSerializer
from ..DAL.base_facade import BaseFuncade
from ..DAL.anony_facade import AnonymusFancade
from ..models import *
from ..DAL.admin_facade import AdministratorFuncade
from ..DAL.airline_facade import Airline_Facade
from ..DAL.customer_facade import CustomerFancade


def get_all_my_tickets(customer):
    tickets =  CustomerFancade.get_my_tickets(customer)
    seralizer = TicketSerializer(tickets, many = True)
    return Response(seralizer.data)

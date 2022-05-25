import pytest
from rest_framework import status
from rest_framework.test import APIClient

class test_flight_app:
    def test_flight_app_home(self):
        client = APIClient()
        print('hello there, lets test')
        response = client.get('/flight_app/')
        print(response.status_code)
        assert response.status_code == status.HTTP_200_OK
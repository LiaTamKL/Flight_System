from django.db import models

class User_Role(models.Model):
    role_name = models.CharField(max_length=30, unique=True, null=False)
    def __str__(self):
        return self.Role_name
    class Meta:
        ordering = ['Role_name']
    def __str__(self) -> str:
        return self.Role_name

class User(models.Model):
    username = models.TextField(max_length=50, null=False, unique=True)
    Password = models.CharField(null=False,max_length=12)
    email = models.EmailField(max_length=50, null=False, unique=True)
    user_role = models.ForeignKey(User_Role, null=False, on_delete=models.PROTECT)
    class Meta:
        ordering = ['Username']
    def __str__(self) -> str:
        return self.Username

class Country(models.Model):
    link = "Edit"
    country_name = models.TextField(max_length=100, null=False, unique=True)
    flag = models.ImageField(upload_to="static\\flags")
    class Meta:
        ordering = ['Country_name']
        verbose_name_plural = 'Countries'
    def __str__(self) -> str:
        return self.Country_name


class Airline(models.Model):
    name = models.TextField(max_length=255, null=False, unique=True)
    country = models.ForeignKey(Country, null=False, on_delete=models.PROTECT)
    user = models.OneToOneField(User, null=False, on_delete=models.CASCADE)
    class Meta:
        ordering = ['Name']
    def __str__(self) -> str:
        return self.Name

class Customer(models.Model):
    first_name = models.TextField(max_length=100, null=False)
    last_name = models.TextField(max_length=100, null=False)
    address = models.TextField(max_length=100, null=False)
    phone_number = models.TextField(max_length=16, null=False, unique=True)
    credit_card_no = models.TextField(max_length=16, null=False, unique=True)
    user = models.OneToOneField(User, null=False, on_delete=models.CASCADE)
    class Meta:
        ordering = ['Last_name']
    def __str__(self) -> str:
        return (self.First_name + self.Last_name)

class Flight(models.Model):
    airline = models.ForeignKey(Airline, null=False, on_delete=models.PROTECT)
    origin_country = models.ForeignKey(Country, null=False,related_name="origin", on_delete=models.PROTECT)
    destination_country = models.ForeignKey(Country, null=False,related_name="destination", on_delete=models.PROTECT)
    departure_time = models.DateTimeField(null=False)
    landing_time = models.DateTimeField(null=False)
    remaining_tickets = models.IntegerField(null=False)
    class Meta:
        ordering = ['Departure_time']
    def __str__(self) -> str:
        return (f"Flight from {self.Origin_country_id} to {self.Destination_country_id}, by {self.Airline_id}, at {self.Departure_time}")

class Flight_Ticket(models.Model):
    customer = models.ForeignKey(Customer, null=False, on_delete=models.PROTECT)
    flight = models.ForeignKey(Flight, null=False, on_delete=models.PROTECT)
    class Meta:
        ordering = ['Flight_id']

class Administrator(models.Model):
    first_name = models.TextField(max_length=50, null=False)
    last_name = models.TextField(max_length=50, null=False)
    user = models.OneToOneField(User, null=False, on_delete=models.CASCADE)
    class Meta:
        ordering = ['Last_name']
    def __str__(self) -> str:
        return (self.First_name + self.Last_name)


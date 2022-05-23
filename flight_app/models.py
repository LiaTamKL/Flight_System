from django.db import models

class User_Role(models.Model):
    role_name = models.CharField(max_length=30, unique=True, null=False)
    def __str__(self):
        return self.role_name
    class Meta:
        ordering = ['role_name']

class User(models.Model):
    username = models.TextField(max_length=50, null=False, unique=True)
    password = models.CharField(null=False,max_length=12)
    email = models.EmailField(max_length=50, null=False, unique=True)
    user_role = models.ForeignKey(User_Role, null=False, on_delete=models.PROTECT)
    class Meta:
        ordering = ['username']
    def __str__(self) -> str:
        return self.username

class Country(models.Model):
    link = "Edit"
    country_name = models.TextField(max_length=100, null=False, unique=True)
    flag = models.ImageField(upload_to="static\\flags")
    class Meta:
        ordering = ['country_name']
        verbose_name_plural = 'countries'
    def __str__(self) -> str:
        return self.country_name


class Airline(models.Model):
    name = models.TextField(max_length=255, null=False, unique=True)
    country = models.ForeignKey(Country, null=False, on_delete=models.PROTECT)
    user = models.OneToOneField(User, null=False, on_delete=models.CASCADE)
    class Meta:
        ordering = ['name']
    def __str__(self) -> str:
        return self.name

class Customer(models.Model):
    first_name = models.TextField(max_length=100, null=False)
    last_name = models.TextField(max_length=100, null=False)
    address = models.TextField(max_length=100, null=False)
    phone_number = models.TextField(max_length=16, null=False, unique=True)
    credit_card_no = models.TextField(max_length=16, null=False, unique=True)
    user = models.OneToOneField(User, null=False, on_delete=models.CASCADE)
    class Meta:
        ordering = ['last_name']
    def __str__(self) -> str:
        return (self.first_name + self.last_name)

class Flight(models.Model):
    airline = models.ForeignKey(Airline, null=False, on_delete=models.PROTECT)
    origin_country = models.ForeignKey(Country, null=False,related_name="origin", on_delete=models.PROTECT)
    destination_country = models.ForeignKey(Country, null=False,related_name="destination", on_delete=models.PROTECT)
    departure_time = models.DateTimeField(null=False)
    landing_time = models.DateTimeField(null=False)
    remaining_tickets = models.IntegerField(null=False)
    class Meta:
        ordering = ['departure_time']
    def __str__(self) -> str:
        return (f"flight from {self.origin_country} to {self.destination_country}, by {self.airline}, at {self.departure_time}")

class Flight_Ticket(models.Model):
    customer = models.ForeignKey(Customer, null=False, on_delete=models.PROTECT)
    flight = models.ForeignKey(Flight, null=False, on_delete=models.PROTECT)
    class Meta:
        ordering = ['flight']
    def __str__(self) -> str:
        return (f'Ticket for {self.customer} on the {self.flight}')

class Administrator(models.Model):
    first_name = models.TextField(max_length=50, null=False)
    last_name = models.TextField(max_length=50, null=False)
    user = models.OneToOneField(User, null=False, on_delete=models.CASCADE)
    class Meta:
        ordering = ['last_name']
    def __str__(self) -> str:
        return (self.first_name + self.last_name)


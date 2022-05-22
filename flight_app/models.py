from django.db import models

class User_Role(models.Model):
    Role_name = models.CharField(max_length=30, unique=True, null=False)
    def __str__(self):
        return self.Role_name
    class Meta:
        ordering = ['Role_name']
    def __str__(self) -> str:
        return self.Role_name

class User(models.Model):
    Username = models.TextField(max_length=50, null=False, unique=True)
    Password = models.CharField(null=False,max_length=12)
    email = models.EmailField(max_length=50, null=False, unique=True)
    user_role = models.ForeignKey(User_Role, null=False, on_delete=models.PROTECT)
    class Meta:
        ordering = ['Username']
    def __str__(self) -> str:
        return self.Username

class Country(models.Model):
    link = "Edit"
    Country_name = models.TextField(max_length=100, null=False, unique=True)
    Flag = models.ImageField(upload_to="static\\flags")
    class Meta:
        ordering = ['Country_name']
        verbose_name_plural = 'Countries'
    def __str__(self) -> str:
        return self.Country_name


class Airline(models.Model):
    Name = models.TextField(max_length=255, null=False, unique=True)
    Country_id = models.ForeignKey(Country, null=False, on_delete=models.PROTECT)
    User_id = models.OneToOneField(User, null=False, on_delete=models.CASCADE)
    class Meta:
        ordering = ['Name']
    def __str__(self) -> str:
        return self.Name

class Customer(models.Model):
    First_name = models.TextField(max_length=100, null=False)
    Last_name = models.TextField(max_length=100, null=False)
    Address = models.TextField(max_length=100, null=False)
    Phone_Number = models.TextField(max_length=16, null=False, unique=True)
    Credit_card_no = models.TextField(max_length=16, null=False, unique=True)
    User_id = models.OneToOneField(User, null=False, on_delete=models.CASCADE)
    class Meta:
        ordering = ['Last_name']
    def __str__(self) -> str:
        return (self.First_name + self.Last_name)

class Flight(models.Model):
    Airline_id = models.ForeignKey(Airline, null=False, on_delete=models.PROTECT)
    Origin_country_id = models.ForeignKey(Country, null=False,related_name="origin", on_delete=models.PROTECT)
    Destination_country_id = models.ForeignKey(Country, null=False,related_name="destination", on_delete=models.PROTECT)
    Departure_time = models.DateTimeField(null=False)
    Landing_time = models.DateTimeField(null=False)
    Remaining_tickets = models.IntegerField(null=False)
    class Meta:
        ordering = ['Departure_time']
    def __str__(self) -> str:
        return (f"Flight from {self.Origin_country_id} to {self.Destination_country_id}, by {self.Airline_id}, at {self.Departure_time}")

class Flight_Ticket(models.Model):
    Customer_id = models.ForeignKey(Customer, null=False, on_delete=models.PROTECT)
    Flight_id = models.ForeignKey(Flight, null=False, on_delete=models.PROTECT)
    class Meta:
        ordering = ['Flight_id']

class Administrator(models.Model):
    First_name = models.TextField(max_length=50, null=False)
    Last_name = models.TextField(max_length=50, null=False)
    User_id = models.OneToOneField(User, null=False, on_delete=models.CASCADE)
    class Meta:
        ordering = ['Last_name']
    def __str__(self) -> str:
        return (self.First_name + self.Last_name)


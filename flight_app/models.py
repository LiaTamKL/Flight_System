from pickle import TRUE
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class Account_Role(models.Model):
    role_name = models.CharField(max_length=30, unique=True, null=False)
    def __str__(self):
        return self.role_name
    class Meta:
        ordering = ['role_name']
        
class MyAccountManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError("User must have an email")
        if not username:
            raise ValueError("User must have an username")

        account = self.model(
            email = self.normalize_email(email),
            username = username,
        )

        account.set_password(password)
        account.save(using=self._db)
        return account

    def create_superuser(self, email,username, password):
        account = self.create_user(
        email=self.normalize_email(email),
        password=password,
        username=username,
        )
        account.is_admin = True
        account.is_staff = True
        account.is_superuser = True
        account.save(using=self._db)
        return account

class Account(AbstractBaseUser):
    email = models.EmailField(verbose_name='email', max_length=60, unique=True)
    username = models.CharField(max_length=30, unique=True)
    date_joined = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    account_role = models.ForeignKey(Account_Role, null=True, on_delete=models.PROTECT)
    # is_airline = models.BooleanField(default=False) #switch this with userrole
    # is_customer = models.BooleanField(default=False) #switch this with userrole

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', ]

    objects = MyAccountManager()

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return self.is_admin
    def has_module_perms(self, app_label):
        return True

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
    account = models.OneToOneField(Account, null=False, on_delete=models.PROTECT)
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
    account = models.OneToOneField(Account, null=True, on_delete=models.PROTECT)
    class Meta:
        ordering = ['last_name']
    def __str__(self) -> str:
        return (self.first_name + ' ' + self.last_name)

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
    account = models.OneToOneField(Account, null=False, on_delete=models.PROTECT)
    class Meta:
        ordering = ['last_name']
    def __str__(self) -> str:
        return (self.first_name + ' ' + self.last_name)



















#########################################################
                #Old Models

# from django.db import models

# class User_Role(models.Model):
#     role_name = models.CharField(max_length=30, unique=True, null=False)
#     def __str__(self):
#         return self.role_name
#     class Meta:
#         ordering = ['role_name']

# class User(models.Model):
#     username = models.TextField(max_length=50, null=False, unique=True)
#     password = models.CharField(null=False,max_length=12)
#     email = models.EmailField(max_length=50, null=False, unique=True)
#     class Meta:
#         ordering = ['username']
#     def __str__(self) -> str:
#         return self.username

# class Country(models.Model):
#     link = "Edit"
#     country_name = models.TextField(max_length=100, null=False, unique=True)
#     flag = models.ImageField(upload_to="static\\flags")
#     class Meta:
#         ordering = ['country_name']
#         verbose_name_plural = 'countries'
#     def __str__(self) -> str:
#         return self.country_name


# class Airline(models.Model):
#     name = models.TextField(max_length=255, null=False, unique=True)
#     country = models.ForeignKey(Country, null=False, on_delete=models.PROTECT)
#     user = models.OneToOneField(User, null=False, on_delete=models.CASCADE)
#     class Meta:
#         ordering = ['name']
#     def __str__(self) -> str:
#         return self.name

# class Customer(models.Model):
#     first_name = models.TextField(max_length=100, null=False)
#     last_name = models.TextField(max_length=100, null=False)
#     address = models.TextField(max_length=100, null=False)
#     phone_number = models.TextField(max_length=16, null=False, unique=True)
#     credit_card_no = models.TextField(max_length=16, null=False, unique=True)
#     user = models.OneToOneField(User, null=False, on_delete=models.CASCADE)
#     class Meta:
#         ordering = ['last_name']
#     def __str__(self) -> str:
#         return (self.first_name + self.last_name)

# class Flight(models.Model):
#     airline = models.ForeignKey(Airline, null=False, on_delete=models.PROTECT)
#     origin_country = models.ForeignKey(Country, null=False,related_name="origin", on_delete=models.PROTECT)
#     destination_country = models.ForeignKey(Country, null=False,related_name="destination", on_delete=models.PROTECT)
#     departure_time = models.DateTimeField(null=False)
#     landing_time = models.DateTimeField(null=False)
#     remaining_tickets = models.IntegerField(null=False)
#     class Meta:
#         ordering = ['departure_time']
#     def __str__(self) -> str:
#         return (f"flight from {self.origin_country} to {self.destination_country}, by {self.airline}, at {self.departure_time}")

# class Flight_Ticket(models.Model):
#     customer = models.ForeignKey(Customer, null=False, on_delete=models.PROTECT)
#     flight = models.ForeignKey(Flight, null=False, on_delete=models.PROTECT)
#     class Meta:
#         ordering = ['flight']
#     def __str__(self) -> str:
#         return (f'Ticket for {self.customer} on the {self.flight}')

# class Administrator(models.Model):
#     first_name = models.TextField(max_length=50, null=False)
#     last_name = models.TextField(max_length=50, null=False)
#     user = models.OneToOneField(User, null=False, on_delete=models.CASCADE)
#     class Meta:
#         ordering = ['last_name']
#     def __str__(self) -> str:
#         return (self.first_name + self.last_name)


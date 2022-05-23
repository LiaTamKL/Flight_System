# Generated by Django 4.0.4 on 2022-05-22 08:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Airline',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.TextField(max_length=255, unique=True)),
            ],
            options={
                'ordering': ['Name'],
            },
        ),
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Country_name', models.TextField(max_length=100, unique=True)),
                ('Flag', models.ImageField(upload_to='')),
            ],
            options={
                'ordering': ['Country_name'],
            },
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('First_name', models.TextField(max_length=100)),
                ('Last_name', models.TextField(max_length=100)),
                ('Address', models.TextField(max_length=100)),
                ('Phone_Number', models.TextField(max_length=16, unique=True)),
                ('Credit_card_no', models.TextField(max_length=16, unique=True)),
            ],
            options={
                'ordering': ['Last_name'],
            },
        ),
        migrations.CreateModel(
            name='Flight',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Departure_time', models.DateTimeField()),
                ('Landing_time', models.DateTimeField()),
                ('Remaining_tickets', models.IntegerField()),
                ('Airline_id', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='flight_app.airline')),
                ('Destination_country_id', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='destination', to='flight_app.country')),
                ('Origin_country_id', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='origin', to='flight_app.country')),
            ],
            options={
                'ordering': ['Departure_time'],
            },
        ),
        migrations.CreateModel(
            name='User_Role',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Role_name', models.CharField(max_length=30, unique=True)),
            ],
            options={
                'ordering': ['Role_name'],
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Username', models.TextField(max_length=50, unique=True)),
                ('Password', models.CharField(max_length=12)),
                ('email', models.EmailField(max_length=50, unique=True)),
                ('user_role', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='flight_app.user_role')),
            ],
            options={
                'ordering': ['Username'],
            },
        ),
        migrations.CreateModel(
            name='Flight_Ticket',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Customer_id', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='flight_app.customer')),
                ('Flight_id', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='flight_app.flight')),
            ],
            options={
                'ordering': ['Flight_id'],
            },
        ),
        migrations.AddField(
            model_name='customer',
            name='User_id',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='flight_app.user'),
        ),
        migrations.AddField(
            model_name='airline',
            name='Country_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='flight_app.country'),
        ),
        migrations.AddField(
            model_name='airline',
            name='User_id',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='flight_app.user'),
        ),
        migrations.CreateModel(
            name='Administrator',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('First_name', models.TextField(max_length=50)),
                ('Last_name', models.TextField(max_length=50)),
                ('User_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='flight_app.user')),
            ],
            options={
                'ordering': ['Last_name'],
            },
        ),
    ]
from dataclasses import fields
from email import message
from pyexpat import model
from tkinter import Widget
from django import forms
from . import models

class MainForm(forms.Form):
    pass


class country_id_search_form(forms.Form):
    country_id = forms.IntegerField(min_value=1)

    def clean_message(self):
        country_id_m = self.cleaned_data['country_id']
        if country_id_m < 1:
            raise forms.ValidationError('Please Enter valid country id')
        
        return country_id_m
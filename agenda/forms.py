from django.forms import ModelForm
from .models import *


class EntreForm(ModelForm):
    class Meta:
        model = Entre
        fields = [

            'name', 'date', 'descricao', 'criacao',

        ]
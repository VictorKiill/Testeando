from django.contrib import admin
from .models import *

# Register your models here.

class EntreAdmin(admin.ModelAdmin):
    list_display = ('name', 'date', 'descricao', 'criacao')


admin.site.register(Entre, EntreAdmin)
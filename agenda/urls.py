from django.urls import path
from .views import *

urlpatterns = [

    path('', agenda.as_view(), name='agenda'),

    path('entre_list/', entreList.as_view(), name='entre_list'),
    path('entre_create/', entreCreate.as_view(), name='entre_create'),
    path('entre_update/<int:pk>/', entreUpdate.as_view(), name='entre_update'),
    path('entre_delete/<int:pk>/', entreDelete.as_view(), name='entre_delete'),

]
# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import generics 
from serializers import ItemSerializer
from models import Item
import models

class ItemListView(generics.ListCreateAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

class ItemView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()
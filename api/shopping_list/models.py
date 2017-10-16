# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class Item(models.Model):
    text = models.CharField(max_length=100)
    done = models.BooleanField(default=False)
# Create your models here.

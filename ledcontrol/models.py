# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models

class BaseModel(models.Model):
    class Meta:
        abstract = True
        app_label = 'ledcontrol'

class LedSettings (models.Model):
    isOn = models.BooleanField()
    brightness = models.IntegerField()
    mode = models.IntegerField()
    toggle = models.IntegerField()
    speed = models.IntegerField()

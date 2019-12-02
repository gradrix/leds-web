from __future__ import unicode_literals
from django.db import models

class ModeLayout(models.Model):

  id = models.IntegerField(primary_key=True)
  name = models.TextField()
  minSpeed = models.IntegerField()
  maxSpeed = models.IntegerField()

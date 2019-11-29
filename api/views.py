# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from api.models import LedSettings
from api.serializers import LedSerializer
from api.ledservicewrapper import LedServiceWrapper

class BaseView(APIView):

    authentication_classes = []

    class Meta:   
        abstract = True
        app_label = 'api'
        authentication_classes = []

    def __init__(self):
        self.ledSvc = LedServiceWrapper()

    def getLedSettingsJson(self, ledSettings):
        result = LedSerializer(ledSettings)
        return result.data

    def setSetting(self, key, value):
        return self.ledSvc.setSetting(key + ":" +str(value))

    def has_permission(self, f, s):
        return True

class LedStatusView(BaseView):
               
    def get(self, request):
        try:
          result = self.ledSvc.getSettings() 
        except Exception as e:
          result = LedSettings()
        return Response(self.getLedSettingsJson(result))

class BrightnessView(BaseView):

    def post(self, request):
        newBrightness = request.data["brightness"]
        result = self.setSetting("B",newBrightness)
        return Response(self.getLedSettingsJson(result))

class OperationView(BaseView):

    def post(self, request):
        newOperation = 1 if request.data["isOn"] else 0
        result = self.setSetting("O", newOperation)
        return Response(self.getLedSettingsJson(result))

class ModeView(BaseView):

    def post(self, request):
        newMode = request.data["mode"]
        result = self.setSetting("M", newMode)
        return Response(self.getLedSettingsJson(result))

class ToggleView(BaseView):

    def post(self, request):
        newToggle = request.data["toggle"]
        result = self.setSetting("T", newToggle)
        return Response(self.getLedSettingsJson(result))

class SpeedView(BaseView):

    def post(self, request):
        newSpeed = request.data["speed"]
        result = self.setSetting("S", newSpeed)
        return Response(self.getLedSettingsJson(result))

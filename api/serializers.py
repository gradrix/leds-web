from api.models import LedSettings
from rest_framework import serializers

class LedSerializer(serializers.Serializer):  
    isOn = serializers.BooleanField()
    brightness = serializers.IntegerField()
    mode = serializers.IntegerField()
    toggle = serializers.IntegerField()
    speed = serializers.IntegerField()

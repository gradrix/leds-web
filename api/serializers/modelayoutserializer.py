from rest_framework import serializers

class ModeLayoutSerializer(serializers.Serializer):  
    
    id = serializers.IntegerField()
    name = serializers.CharField()
    minSpeed = serializers.IntegerField()
    maxSpeed = serializers.IntegerField()

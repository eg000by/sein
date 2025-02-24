from rest_framework import serializers
from .models import Value, UserValue, Goal

class ValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Value
        fields = ['id', 'name', 'color', 'icon']

class UserValueSerializer(serializers.ModelSerializer):
    value = ValueSerializer(read_only=True)

    class Meta:
        model = UserValue
        fields = ['value', 'points']

class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = [
            'id', 
            'value', 
            'title', 
            'description', 
            'status', 
            'deadline', 
            'created_at', 
            'completed_at'
        ]
        read_only_fields = ['user', 'status']
        extra_kwargs = {
            'status': {'required': True}
        }

class GoalCompleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = ['status']
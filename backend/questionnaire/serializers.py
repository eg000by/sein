from rest_framework import serializers
from .models import Question, AnswerOption, UserResponse

class AnswerOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerOption
        fields = ['id', 'text']

class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerOptionSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'text', 'order', 'answers']

class UserResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserResponse
        fields = ['answer']
        extra_kwargs = {
            'user': {'read_only': True}
        }
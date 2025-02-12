from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Value, UserValue, Goal
from .serializers import ValueSerializer, UserValueSerializer, GoalSerializer, GoalCompleteSerializer
from django.core.exceptions import ValidationError



class ValueViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Value.objects.all()
    serializer_class = ValueSerializer
    # permission_classes = [IsAuthenticated]

class UserValueViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserValueSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserValue.objects.filter(user=self.request.user)
    
    def create(self, request):
        # Удаляем старые значения
        UserValue.objects.filter(user=request.user).delete()
        
        # Создаем новые
        values = request.data.get('values', [])
        for value_id in values:
            UserValue.objects.create(
                user=request.user,
                value_id=value_id,
                points=1  # Начальные очки
            )
        return Response({'status': 'success'})

class GoalViewSet(viewsets.ModelViewSet):
    serializer_class = GoalSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Goal.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        value_id = serializer.validated_data['value'].id
        if not UserValue.objects.filter(user=self.request.user, value_id=value_id).exists():
            raise ValidationError("У вас нет доступа к этой ценности")
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['patch'])
    def complete(self, request, pk=None):
        goal = self.get_object()
        serializer = GoalCompleteSerializer(goal, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
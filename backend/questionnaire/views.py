from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Question, UserResponse
from .serializers import QuestionSerializer, UserResponseSerializer

class QuestionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Question.objects.all().order_by('order')
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]

class UserResponseViewSet(viewsets.ModelViewSet):
    serializer_class = UserResponseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserResponse.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

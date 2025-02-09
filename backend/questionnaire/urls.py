from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import QuestionViewSet, UserResponseViewSet

router = DefaultRouter()
router.register(r'questions', QuestionViewSet, basename='question')
router.register(r'responses', UserResponseViewSet, basename='response')

urlpatterns = [
    path('', include(router.urls)),
]
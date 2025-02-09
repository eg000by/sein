from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ValueViewSet, UserValueViewSet, GoalViewSet


router = DefaultRouter()
router.register(r'values', ValueViewSet, basename='value')
router.register(r'user/values', UserValueViewSet, basename='uservalue')
router.register(r'goals', GoalViewSet, basename='goal')

urlpatterns = [
    path('', include(router.urls)),
    path('goals/<int:pk>/complete/', GoalViewSet.as_view({'patch': 'complete'}), name='goal-complete'),
]


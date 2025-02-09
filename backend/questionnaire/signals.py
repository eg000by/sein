from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import UserResponse
from goals.models import UserValue

@receiver(post_save, sender=UserResponse)
def add_value_points(sender, instance, created, **kwargs):
    if created:
        value = instance.answer.value
        user_value, created = UserValue.objects.get_or_create(
            user=instance.user,
            value=value
        )
        user_value.points += instance.answer.weight
        user_value.save()
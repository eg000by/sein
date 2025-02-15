from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from users.models import CustomUser
from django.utils import timezone 

class Value(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50, blank=True)  # Название иконки из FontAwesome
    color = models.CharField(max_length=7, default='#ffffff')  # HEX-код цвета

    def __str__(self):
        return self.name

class UserValue(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    value = models.ForeignKey(Value, on_delete=models.CASCADE)
    points = models.PositiveIntegerField(default=0)
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'value')

    def __str__(self):
        return f"{self.user}: {self.value} ({self.points})"

class Goal(models.Model):
    STATUS_CHOICES = [
        ('active', 'Активная'),
        ('completed', 'Выполнена'),
        ('archived', 'Архивирована'),
    ]

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    value = models.ForeignKey(Value, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')
    created_at = models.DateTimeField(auto_now_add=True)
    deadline = models.DateTimeField()
    completed_at = models.DateTimeField(null=True, blank=True)

    # SMART-поля
    # specific = models.TextField(verbose_name="Конкретность")
    # measurable = models.TextField(verbose_name="Измеримость")
    # achievable = models.TextField(verbose_name="Достижимость")
    # relevant = models.TextField(verbose_name="Актуальность")
    # time_bound = models.TextField(verbose_name="Сроки")

    def __str__(self):
        return f"{self.user}: {self.title}"

@receiver(post_save, sender=Goal)
def update_value_points(sender, instance, **kwargs):
    if instance.status == 'completed' and not instance.completed_at:
        user_value = UserValue.objects.get(user=instance.user, value=instance.value)
        user_value.points += 100  # Или другая логика начисления
        user_value.save()
        instance.completed_at = timezone.now()
        instance.save(update_fields=['completed_at'])
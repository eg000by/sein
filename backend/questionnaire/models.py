from django.db import models
from users.models import CustomUser

class Question(models.Model):
    text = models.TextField()
    order = models.PositiveIntegerField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"Q{self.order}: {self.text[:50]}..."

class AnswerOption(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')
    text = models.CharField(max_length=255)
    value = models.ForeignKey('goals.Value', on_delete=models.CASCADE)
    weight = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.question.order}.{self.id}: {self.text[:20]}"

class UserResponse(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    answer = models.ForeignKey(AnswerOption, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'answer')

    def __str__(self):
        return f"{self.user} → {self.answer}"
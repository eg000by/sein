from django.contrib import admin
from .models import Question, AnswerOption, UserResponse

class AnswerInline(admin.TabularInline):
    model = AnswerOption
    extra = 3

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    inlines = [AnswerInline]
    list_display = ('order', 'text_short')
    
    def text_short(self, obj):
        return obj.text[:50] + '...' if len(obj.text) > 50 else obj.text
    text_short.short_description = 'Текст'

admin.site.register(UserResponse)
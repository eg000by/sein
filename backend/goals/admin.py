from django.contrib import admin
from .models import Value, UserValue, Goal

admin.site.register(Value)
admin.site.register(UserValue)
admin.site.register(Goal)
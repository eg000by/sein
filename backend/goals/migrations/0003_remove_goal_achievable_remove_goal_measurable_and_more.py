# Generated by Django 5.1.5 on 2025-02-15 01:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('goals', '0002_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='goal',
            name='achievable',
        ),
        migrations.RemoveField(
            model_name='goal',
            name='measurable',
        ),
        migrations.RemoveField(
            model_name='goal',
            name='relevant',
        ),
        migrations.RemoveField(
            model_name='goal',
            name='specific',
        ),
        migrations.RemoveField(
            model_name='goal',
            name='time_bound',
        ),
    ]

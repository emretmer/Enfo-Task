# Generated by Django 4.2.14 on 2024-08-07 14:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('task', '0002_patron'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='overdue',
            field=models.CharField(blank=True, max_length=2, null=True),
        ),
    ]

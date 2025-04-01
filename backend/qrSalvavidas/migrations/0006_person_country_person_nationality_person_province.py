# Generated by Django 5.1.7 on 2025-03-31 19:18

import django_countries.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('qrSalvavidas', '0005_person_birth_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='person',
            name='country',
            field=django_countries.fields.CountryField(blank=True, max_length=2, null=True),
        ),
        migrations.AddField(
            model_name='person',
            name='nationality',
            field=django_countries.fields.CountryField(blank=True, max_length=2, null=True, verbose_name='Nationality'),
        ),
        migrations.AddField(
            model_name='person',
            name='province',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]

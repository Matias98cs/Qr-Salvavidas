# Generated by Django 5.1.7 on 2025-03-31 20:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('qrSalvavidas', '0007_alter_person_age'),
    ]

    operations = [
        migrations.AlterField(
            model_name='person',
            name='personal_phone',
            field=models.CharField(blank=True, max_length=20, null=True, unique=True),
        ),
    ]

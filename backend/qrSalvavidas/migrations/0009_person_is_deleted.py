# Generated by Django 5.1.7 on 2025-03-31 22:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('qrSalvavidas', '0008_alter_person_personal_phone'),
    ]

    operations = [
        migrations.AddField(
            model_name='person',
            name='is_deleted',
            field=models.BooleanField(default=False),
        ),
    ]

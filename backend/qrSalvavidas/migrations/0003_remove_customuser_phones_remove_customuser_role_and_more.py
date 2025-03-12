# Generated by Django 5.1.7 on 2025-03-12 20:06

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('qrSalvavidas', '0002_customuser_email_person_email'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='phones',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='role',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='user',
        ),
        migrations.AlterField(
            model_name='qrdata',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.customuser'),
        ),
        migrations.AlterField(
            model_name='person',
            name='company_phones',
            field=models.ManyToManyField(blank=True, related_name='company_phones', to='users.phone'),
        ),
        migrations.AlterField(
            model_name='person',
            name='phones',
            field=models.ManyToManyField(blank=True, to='users.phone'),
        ),
        migrations.DeleteModel(
            name='Phone',
        ),
        migrations.DeleteModel(
            name='Role',
        ),
        migrations.DeleteModel(
            name='CustomUser',
        ),
    ]

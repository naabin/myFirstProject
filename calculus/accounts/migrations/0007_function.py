# Generated by Django 2.0.7 on 2018-07-19 04:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_auto_20180718_0900'),
    ]

    operations = [
        migrations.CreateModel(
            name='Function',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(default='', max_length=100)),
                ('answer', models.CharField(default='', max_length=200)),
            ],
        ),
    ]
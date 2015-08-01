# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0005_auto_20141225_0628'),
    ]

    operations = [
        migrations.AddField(
            model_name='resource',
            name='author_name',
            field=models.CharField(default='', max_length=120),
            preserve_default=False,
        ),
    ]

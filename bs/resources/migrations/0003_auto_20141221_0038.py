# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0002_auto_20141221_0037'),
    ]

    operations = [
        migrations.AlterField(
            model_name='resource',
            name='suggested_for',
            field=models.ManyToManyField(related_name='suggested_for_rel_+', null=True, to='resources.Resource'),
            preserve_default=True,
        ),
    ]

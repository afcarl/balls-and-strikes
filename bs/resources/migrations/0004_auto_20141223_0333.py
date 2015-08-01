# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import autoslug.fields


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0003_auto_20141221_0038'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='resource',
            options={'ordering': ('title',)},
        ),
        migrations.AddField(
            model_name='category',
            name='slug',
            field=autoslug.fields.AutoSlugField(default='', editable=False),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='resource',
            name='slug',
            field=autoslug.fields.AutoSlugField(default='', editable=False),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='resource',
            name='abstract',
            field=models.TextField(default='', blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='resource',
            name='suggested_for',
            field=models.ManyToManyField(related_name='suggested_for_rel_+', null=True, to='resources.Resource', blank=True),
            preserve_default=True,
        ),
    ]

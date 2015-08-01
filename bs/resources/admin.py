from __future__ import unicode_literals

from django import forms
from django.contrib import admin

from mptt.admin import MPTTModelAdmin
from mptt.forms import TreeNodeChoiceField

from .models import Category, Resource


class CategoryAdmin(MPTTModelAdmin):
    pass


class ResourceForm(forms.ModelForm):
    category = TreeNodeChoiceField(queryset=Category.objects.all())

    class Meta:
        model = Resource


class ResourceAdmin(admin.ModelAdmin):
    form = ResourceForm
    list_display = ('title', 'category', 'author_name', 'pub_at', )
    list_filter = ('category', )


admin.site.register(Category, CategoryAdmin)
admin.site.register(Resource, ResourceAdmin)

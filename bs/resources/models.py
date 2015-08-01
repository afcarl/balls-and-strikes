from __future__ import unicode_literals

from django.db import models
from django.utils import timezone

from autoslug.fields import AutoSlugField

from mptt.models import MPTTModel, TreeForeignKey
from mptt.managers import TreeManager

from taggit.managers import TaggableManager


class Category(MPTTModel):
    name = models.CharField(max_length=120)
    slug = AutoSlugField(populate_from='name')
    abstract = models.TextField(blank=True, default='')
    parent = TreeForeignKey('self', null=True, blank=True,
                            related_name='children', db_index=True)

    objects = TreeManager()

    class Meta:
        verbose_name_plural = 'Categories'

    class MPTTMeta:
        order_insertion_by = ['name']

    def __unicode__(self):
        return self.name


class ResourceMgr(models.Manager):
    def live(self):
        return self.filter(live_at__lte=timezone.now())


class Resource(models.Model):
    """Describes a classified resource
    """

    category = models.ForeignKey(Category, related_name='resources')
    title = models.CharField(max_length=120)
    slug = AutoSlugField(populate_from='title')
    abstract = models.TextField(blank=True, default='')
    url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    live_at = models.DateTimeField(null=True, blank=True)

    author_name = models.CharField(max_length=120, default='')
    pub_at = models.DateField(null=True, blank=True)

    tags = TaggableManager()
    suggested_for = models.ManyToManyField('self', related_name='children',
                                           blank=True, null=True)

    objects = ResourceMgr()

    class Meta:
        ordering = ('pub_at', 'title', )

    def __unicode__(self):
        return self.title

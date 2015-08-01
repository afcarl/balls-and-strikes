from __future__ import unicode_literals

from rest_framework.renderers import JSONRenderer

from django.shortcuts import render

from .models import Category, Resource
from .utils import serialize_library


def broadsheet(request):
    roots = (Category.objects
             .root_nodes()
             .prefetch_related('resources'))

    library_tree = serialize_library(roots)
    tree_json = JSONRenderer().render(library_tree)

    # get most recent post
    latest_post = Resource.objects.live().latest('live_at')

    return render(request, 'broadsheet.html', {
        'tree_json': tree_json,
        'latest_post': latest_post,
    })

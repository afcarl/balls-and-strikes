from __future__ import unicode_literals

from .models import Category
from .serializers import CategorySerializer, SuggestiveResourceSerializer


def serialize_node(node):
    struct = CategorySerializer(node).data

    # attach resources
    struct['resources'] = [
        SuggestiveResourceSerializer(res).data
        for res in node.resources.live()
    ]

    # do the same for all children
    struct['children'] = [
        serialize_node(child) for child in node.get_children()
    ]

    return struct


def serialize_library(qs, ignore_empty=True):
    if ignore_empty:
        roots = filter(lambda node: node.get_descendant_count() > 0, qs)
    return [serialize_node(node) for node in qs]

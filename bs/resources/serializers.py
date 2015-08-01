from __future__ import unicode_literals

from rest_framework.serializers import (Serializer, ModelSerializer,
                                        SerializerMethodField)

from .models import Category, Resource


class CategorySerializer(ModelSerializer):
    class Meta:
        fields = ('id', 'level', 'name', 'slug', 'abstract', )
        model = Category


class ResourceSerializer(ModelSerializer):
    class Meta:
        fields = ('id', 'title', 'slug', 'url', 'abstract',
                  'pub_at', 'author_name', )
        model = Resource


class SuggestiveResourceSerializer(ResourceSerializer):
    suggestions = SerializerMethodField()

    class Meta(ResourceSerializer.Meta):
        fields = ('id', 'title', 'url', 'slug', 'abstract',
                  'suggestions', 'pub_at', 'author_name', )

    def get_suggestions(self, obj):
        return [
            ResourceSerializer(res).data for res in obj.suggested_for.live()
        ]

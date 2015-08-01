from django.conf.urls import patterns, url


urlpatterns = patterns(
    'resources.views',

    url(r'^$', 'broadsheet', name='broadsheet'),
)

from django.utils import timezone

from jingo import register


register.env.globals['timezone'] = timezone

from django.conf.urls import url
from zabbix_api.map.views import return_datas

urlpatterns=(
    url(r'return_datas',return_datas),
)

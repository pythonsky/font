#coding:utf-8
from django.conf.urls import url, include

urlpatterns = (
    url(r'^map/', include('zabbix_api.map.urls')),
    url(r'^mzabbix/', include('zabbix_api.mzabbix.urls')),
    #url(r'^query/',include('zabbix_api.query.urls')),

)

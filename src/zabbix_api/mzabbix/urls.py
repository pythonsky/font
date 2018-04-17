from django.conf.urls import url
from zabbix_api.mzabbix.views import zabbix_trigger_get, zabbix_trigger_get_priority,zabbix_trigger_priority_writemysql,zabbix_trigger_priority_datas

urlpatterns=(
    url(r'zabbix_trigger_get$',zabbix_trigger_get),
    url(r'zabbix_trigger_get_priority$',zabbix_trigger_get_priority),
    url(r'zabbix_trigger_priority_writemysql$',zabbix_trigger_priority_writemysql),
    url(r'zabbix_trigger_priority_datas$',zabbix_trigger_priority_datas),    
)


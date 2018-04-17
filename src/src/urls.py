"""src URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Import the include() function: from django.conf.urls import url, include
    3. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import url, include
from django.contrib import admin
from account.views import login, logout
from zabbix_api.mzabbix.views import zabbix_image,zabbix_quality,zabbix_monitoralarm,ceshi,zabbix_table,write_mysql
from zabbix_api.query.views import channel,little,large,device,sp
from apscheduler.scheduler import Scheduler

sched = Scheduler()
@sched.interval_schedule(days=1)    
def mytask():  
   write_mysql()  
@sched.interval_schedule(seconds=60)  
def mytask2():
    zabbix_monitoralarm()      
sched.start()  


urlpatterns = [

    url(r'^admin/', admin.site.urls),
    url(r'', include('zabbix_api.urls')),
    url(r'^api/monitor/v1/login', login),
    url(r'^api/monitor/v1/logout', logout),
    url(r'^api/monitor/v1/zabbix_image',zabbix_image),
    url(r'^api/monitor/v1/zabbix_quality',zabbix_quality),
    url(r'^api/monitor/v1/zabbix_monitoralarm',zabbix_monitoralarm),
    url(r'^api/monitor/v1/ceshi',ceshi),
    url(r'^api/monitor/v1/zabbix_table',zabbix_table),
    url(r'^api/monitor/v1/channel',channel),
    url(r'^api/monitor/v1/little',little),
    url(r'^api/monitor/v1/large',large),
    url(r'^api/monitor/v1/device',device),
    url(r'^api/monitor/v1/sp',sp),
    
]

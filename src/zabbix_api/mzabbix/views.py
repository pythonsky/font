#coding:utf-8
import sys
import cookielib, urllib2, urllib
from datetime import datetime
from pyzabbix import ZabbixAPI
from django.http import HttpResponse
import json,time
from django.db import connection
import datetime
import logging
import json
import os
from collections import defaultdict
import requests
logger=logging.getLogger('django')

PRIORITY_MAP = {
    'levleOne': 1,
    'levleTwo': 2,
}


db_cursor=None
def get_cursor(db_cursor):
    if db_cursor==None:
        db_cursor=connection.cursor()
        return db_cursor
    else:
        return db_cursor

def zabbix_instance():
    zapi=ZabbixAPI("http://bj.monitor.ctzcdn.com/zabbix")
    zapi.login("yunwei","NneBFBRbiOij-!+*")
    logger.info('登陆成功!')
    return zapi

def zabbix_fiveprovince():
    zapi=ZabbixAPI("http://106.39.160.13/zabbix")
    zapi.login("Admin","GyFf51o9*6bO")
    logger.info('登陆成功!')
    return zapi

def zabbix_trigger_get_priority(request):
    """
    监控告警环形图各等级数量接口
    """
    zapi=zabbix_instance()
    alarm_color=zapi.trigger.get(
        output=['priority','expression'],
        expandExpression='true',
        selectHosts=['name'],
        only_true='true',
        active='true',
        monitored='true',
    )
    list_a=[]
    for row in alarm_color:
        name=row['hosts'][0]['name']
        if 'beijing' in name or 'nanjing' in name or 'guangzhou' in name:
            list_a.append(row)
    count={}
    for row in list_a:
        priority=row['priority']
        if priority in count:
            count[priority] += 1
        else:
            count[priority] = 1
    result={}
    level_2=count.get('2')
    if level_2:
        result['提示']= level_2
    level_3=count.get('3')
    if level_3:
        result['三级故障']= level_3
    level_4=count.get('4')
    if level_4:
        result['二级故障']= level_4
    level_5=count.get('5')
    if level_5:
        result['一级故障']= level_5
    return HttpResponse(json.dumps(result))

def write_mysql():
    zapi=zabbix_instance()
    alarm_color=zapi.trigger.get(
        output=['priority','expression'],
        expandExpression='true',
        only_true='true',
        selectHosts=['name'],
        active='true',
        monitored='true',
    )
    list_a=[]
    for row in alarm_color:
        name=row['hosts'][0]['name']
        if 'beijing' in name or 'nanjing' in name or 'guangzhou' in name:
            list_a.append(row)
    count={}
    for row in list_a:
        priority=row['priority']
        if priority in count:
            count[priority] += 1
        else:
            count[priority] = 1
    cursor=get_cursor(db_cursor)
    level_2=count.get('2')
    level_3=count.get('3')
    level_4=count.get('4')
    level_5=count.get('5')
    time=datetime.datetime.now().strftime('%Y-%m-%d')
    cursor.execute("INSERT INTO fault_number(msg,levleThree,levleTwo,levleOne,time) VALUES(%s,%s,%s,%s,%s)", (level_2,level_3,level_4,level_5,time))
    logger.info('写入数据库成功！')
    cursor.close()
def zabbix_trigger_priority_writemysql(request):
    write_mysql()
    return HttpResponse('数据写入数据库成功!') 


def zabbix_trigger_priority_datas(request):
    """
    从数据库中获取30天的告警等级接口
    """
    cursor=get_cursor(db_cursor)
    sql="SELECT ifnull(levleOne,0),ifnull(levleTwo,0),ifnull(levleThree,0),ifnull(msg,0),time FROM fault_number where date(time)>=subdate(curdate(),31) order by time asc limit 30"
    cursor.execute(sql)
    res_datas=zip(*cursor.fetchall())
    cursor.close()
    if not res_datas:
        result={'levleOne':[],'levleTwo':[],'levleThree':[],'msg':[],'time':[]}
        return HttpResponse(json.dumps(result))
    else:
        result={'levleOne':res_datas[0],'levleTwo':res_datas[1],'levleThree':res_datas[2],'msg':res_datas[3],'time':map(str,res_datas[4])}
        return HttpResponse(json.dumps(result))


def zabbix_trigger_get(request):
    """
    监控告警各项信息接口
    """
    cursor=get_cursor(db_cursor)
    sql="SELECT id,username,telephone FROM ops_user"
    cursor.execute(sql)
    message=cursor.fetchall()
    cursor.close()
    zapi=zabbix_instance()
    alerts=zapi.trigger.get(
        output=['triggerid', 'description', 'comments', 'lastchange', 'priority'],
        expandDescription='true',
        expandComment='true',
        selectHosts=['name'],
        sortfield="priority",
        only_true='true',
        active='true',
        monitored='true',
    )
    city = request.GET.get('city')
    if city not in ('beijing', 'nanjing', 'guangzhou'):
        logger.error('city找不到!')
        return HttpResponse("%s doesn't exist!"%city)
    list_data=[]
    for row in alerts:
        name=row['hosts'][0]['name']
        if city in name:
            list_data.append(row)
    list_data.sort(key=lambda x:x['priority'], reverse=True)
    datas=[]
    for row in list_data:
        name=row['hosts'][0]['name']
        description=row['description']
        timestamp=float(row['lastchange'])
        lastchange_a = datetime.datetime.fromtimestamp(timestamp)
        lastchange = datetime.datetime.fromtimestamp(timestamp)
        duration=datetime.datetime.now()-lastchange
        lastchange = lastchange_a.strftime('%Y-%m-%d %H:%M:%S')
        days=duration.days
        seconds=duration.seconds
        hours=seconds/3600
        minutes=seconds%3600/60
        secs=seconds%3600%60
        time_list=[days,hours,minutes,secs]
	tem_list=['d','h','m','s']
        list1=[]
        for i in range(4):
	    if time_list[i]!=0:
                list1.append(str(time_list[i])+tem_list[i])
        duration=''.join(list1) if len(list1)!=0 else '0s'
        comments=row['comments']
        priority=row['priority']
        if priority == '5':
            username=str(message[3][1])
            telephone=str(message[3][2])
            priority='levleOne'
        elif priority == '4':
            username=str(message[2][1])
            telephone=str(message[2][2])
            priority='levleTwo'
        elif priority == '3':
            username=str(message[1][1])
            telephone=str(message[1][2])
            priority='levleThree'
        elif priority == '2':
            username=str(message[0][1])
            telephone=str(message[0][2])
            priority='msg'
        elif priority == '1':
            continue
        datas.append({'name':name,'description':description,'lastchange':lastchange,'duration':duration,'comments':comments,'priority':priority,'username':username,'telephone':telephone})

    return HttpResponse(json.dumps(datas))


class ZabbixGraph(object):
    def __init__(self, url, name, password):
        self.url = url
        self.name = name
        self.password = password
        # 初始化的时候生成cookies
        cookiejar = cookielib.CookieJar()
        urlOpener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cookiejar))
        values = {"name": self.name, 'password': self.password, 'autologin': 1, "enter": 'Sign in'}
        data = urllib.urlencode(values)
        request = urllib2.Request(url, data)
        try:
            urlOpener.open(request, timeout=10)
            self.urlOpener = urlOpener
        except urllib2.HTTPError, e:
            print e

    def GetGraph(self, url, values):
        key = values.keys()
        if "graphid" not in key:
            print u"请确认是否输入graphid"
            sys.exit(1)
        # 以下if 是给定默认值
        if "period" not in key:
            # 默认获取一天的数据，单位为秒
            values["period"] = 86400
        if "stime" not in key:
            # 默认为当前时间开始
            values["stime"] = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
        if "width" not in key:
            values["width"] = 800
        if "height" not in key:
            values["height"] = 200

        data = urllib.urlencode(values)
        request = urllib2.Request(url, data)
        url = self.urlOpener.open(request)
        image = url.read()
        return image


def zabbix_image(request):
    """
    zabbix汇总四张图片接口
    """
    if request.method != 'GET':
        return HttpResponse(json.dumps({'code':-3,'msg':'Request method Error'}))
    graphid=request.GET.get('graphid')
    period=request.GET.get('period')
    stime=request.GET.get('stime')
    width=request.GET.get('width')
    height=request.GET.get('height')
    values = {"graphid": graphid, "period": period,"stime":stime,"width":width,"height":height}
    # 此url是获取图片是的，请注意饼图的URL 和此URL不一样，请仔细观察！
    gr_url = "http://bj.monitor.ctzcdn.com/zabbix/chart2.php"
    # 登陆URL
    indexURL = "http://bj.monitor.ctzcdn.com/zabbix/index.php"
    username = "yunwei"
    password = "NneBFBRbiOij-!+*"
    # 图片的参数，该字典至少传入graphid。
    b = ZabbixGraph(indexURL, username, password)
    return HttpResponse(b.GetGraph(gr_url, values),content_type="image/png")

def zabbix_quality(request):
    """
    五大省中心进出流量差接口
    """
    if request.method !='GET':
        logger.error('请求方式不正确')
        result={'code':4, 'msg': "请求方式不正确,请使用GET方式"}
        return HttpResponse(json.dumps(result))
    try:
        zapi=zabbix_fiveprovince()
        alerts=zapi.trigger.get(
            output=['triggerid', 'description', 'comments', 'lastchange', 'priority','value'],
            expandDescription='true',
            expandComment='true',
            selectHosts=['name'],
            sortfield="priority",
            only_true="true",
            active="true",
            monitored="true",
        )
    except Exception, e:
        logger.exception('zabbix服务出错')
        result={'code':1, 'msg': "zabbix error"}
        return HttpResponse(json.dumps(result))
    try:
        new_list = []
        new_alerts = []
        for row in alerts:
            row.pop('triggerid')
            new_list.append(str(row))
	new_list = set(new_list)
        for i in list(new_list):
            i = eval(i)
            new_alerts.append(i)
	alerts = new_alerts
        datas = []
        for row in alerts:
            value=row['value']
            if "1" == value:
                description=row['description']
                if '带宽进出相差大于200M' in description or '带宽进出相差大于500M' in description:
                    datas.append(row)
    except Exception, e:
        logger.exception('数据取不到')
        result={'code':2, 'msg': "数据取不到"}
        return HttpResponse(json.dumps(result))
    if not datas:
        result={'code':0,'data':[]}
        return HttpResponse(json.dumps(result))
    result = {}
    def parse_row(row):
        try:
            description=row['description']
            if description == '带宽进出相差大于500M':
                priority='levleOne'
            else:
                priority='levleTwo'
            timestamp=float(row['lastchange'])
            lastchange_a = datetime.datetime.fromtimestamp(timestamp)
            lastchange = datetime.datetime.fromtimestamp(timestamp)
            duration=datetime.datetime.now()-lastchange
            lastchange = lastchange_a.strftime('%Y-%m-%d %H:%M:%S')
            days=duration.days
            seconds=duration.seconds
            hours=seconds/3600
            minutes=seconds%3600/60
            secs=seconds%3600%60
            time_list=[days,hours,minutes,secs]
            tem_list=['d','h','m','s']
            list1=[]
            for i in range(4):
                if time_list[i]!=0:
                    list1.append(str(time_list[i])+tem_list[i])
            duration=''.join(list1) if len(list1)!=0 else '0s'
            comments=row['comments']
            return {'name':name,'description':description,'lastchange':lastchange,'duration':duration,'comments':comments,'priority':priority}
        except Exception, e:
            logger.exception('数据取不到')
            result={'code':2, 'msg': "数据取不到"}
            return HttpResponse(json.dumps(result))

    for row in datas:
        name=row['hosts'][0]['name']
        if 'huhehaote' in name:
            province = '内蒙古'
        elif 'shanxi' in name:
            province='山西'
        elif 'wuhan' in name:
            province='湖北'
            A
        elif 'xizang' in name:
            province='西藏'
        elif 'haerbin' in name:
            province='黑龙江'
        else:
            continue
        item = parse_row(row)
        #print item
        if province in result:
            result[province]['datas'].append(item)
            if PRIORITY_MAP[item['priority']] < PRIORITY_MAP[result[province]['priority']]:
                result[province]['priority'] = item['priority']
        else:
            d = {'priority': item['priority'],
                 'datas': [item],}
            result[province] = d
    result1 = []
    for name, data in result.iteritems():
        data['name'] = name 
        result1.append(data)
    print result1
    result={'code':0, 'data': result1}
    return HttpResponse(json.dumps(result))

def zabbix_monitoralarm_write():
    """
    云调系统告警信息对接接口第一次信息存入本地
    """
    try:
        zapi=zabbix_fiveprovince()
        alerts=zapi.trigger.get(
                output=['triggerid', 'description', 'comments', 'lastchange', 'priority','value'],
                expandDescription='true',
                expandComment='true',
                selectHosts=['name','host'],
                sortfield="priority",
                only_true="true",
                active="true",
                monitored="true",
            )
    except Exception, e:
        logger.exception('zabbix服务出错')
        result={'msg': "zabbix error"}
        a=requests.post("http://118.85.194.45:9090/Cloud-interface/rest/soc/pushAlarmInfo", json=result)
        logger.info(a.text)
    list1=[]
    result={}
    for row in alerts:
        value=row['value']
        if "1" == value:
            timestamp=float(row['lastchange'])
            lastchange=datetime.datetime.fromtimestamp(timestamp)
            alarmTime=lastchange.strftime('%Y-%m-%d %H:%M:%S')
            alarmCause=row['description']
            ipAddress=row['hosts'][0]['host']
            alarmLevel=row['priority']
            matchKey=row['triggerid']
            outSystemAlarmNo=matchKey
            #print outSystemAlarmNo
            list1.append({'alarmMessageFormat':"json",'alarmSource':"CDN",'alarmTypeCode':"CDN",'alarmTime':alarmTime,'alarmCause':alarmCause,'ipAddress':ipAddress,'alarmLevel':alarmLevel,'alarmObjectTypeId':"7",'emsTime':datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),'outSystemAlarmNo':outSystemAlarmNo,'matchKey':matchKey})
    json_str=json.dumps(list1)
    data_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'list1.json')
    with open(data_path,'w') as f:
        f.write(json_str)
    return list1


def zabbix_monitoralarm():
    """
    云调系统告警信息对接接口
    """
    data_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'list1.json')
    if not os.path.exists(data_path):
        results=zabbix_monitoralarm_write()
        if results:
            result={'data':results}
            a=requests.post("http://118.85.194.45:9090/Cloud-interface/rest/soc/pushAlarmInfo", json=result)
            logger.info(a.text)
        #return HttpResponse(json.dumps(result))
    else:
        try:
            zapi=zabbix_fiveprovince()
            alerts=zapi.trigger.get(
                    output=['triggerid', 'description', 'comments', 'lastchange', 'priority','value'],
                    expandDescription='true',
                    expandComment='true',
                    selectHosts=['name','host'],
                    sortfield="priority",
                    only_true="true",
                    active="true",
                    monitored="true",
                )
        except Exception, e:
            logger.exception('zabbix服务出错')
            result={'msg': "zabbix error"}
            a=requests.post("http://118.85.194.45:9090/Cloud-interface/rest/soc/pushAlarmInfo", json=result)
            logger.info(a.text)
        list2=[]
        for row in alerts:
            value=row['value']
            if "1" == value:
                timestamp=float(row['lastchange'])
                lastchange=datetime.datetime.fromtimestamp(timestamp)
                alarmTime=lastchange.strftime('%Y-%m-%d %H:%M:%S')
                alarmCause=row['description']
                ipAddress=row['hosts'][0]['host']
                alarmLevel=row['priority']
                matchKey=row['triggerid']
                outSystemAlarmNo=matchKey
                #print outSystemAlarmNo
                list2.append({'alarmMessageFormat':"json",'alarmSource':"CDN",'alarmTypeCode':"CDN",'alarmTime':alarmTime,'alarmCause':alarmCause,'ipAddress':ipAddress,'alarmLevel':alarmLevel,'alarmObjectTypeId':"7",'emsTime':datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),'outSystemAlarmNo':outSystemAlarmNo,'matchKey':matchKey})
        #print list2
        with open(data_path,'r') as f:
            json_str = f.read()
        f.close()
        #print json_str
        #print type(list(json_str))
        list1 = eval(json_str)
        #print list1
        new_list1 = defaultdict(list)
        new_list2 = defaultdict(list)
        for i in list1:
            new_list1[i['matchKey']].append(i)
            #print 'AAAA--{}'.format(new_list1)
        for i in list2:
            new_list2[i['matchKey']].append(i)        
        common_list = [new_list1[n][0] for n in new_list1 if n in new_list2]
        reduce_list = [new_list1[n][0] for n in new_list1 if n not in new_list2]
        add_list = [new_list2[n][0] for n in new_list2 if n not in new_list1]
        #print 'REDUCE----{}'.format(reduce_list)
        #print 'ADD----{}'.format(add_list)
        results=[]
        result={}
        for row in reduce_list:
            row['alarmLevel']="6"
            results.append(row)
        for row in add_list:
            results.append(row)
        json_datas=json.dumps(add_list + common_list)
        data_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'list1.json')
        with open(data_path,'w') as f:
            f.write(json_datas)
        if results:
            result={'data':results}
            a=requests.post("http://118.85.194.45:9090/Cloud-interface/rest/soc/pushAlarmInfo", json=result)
            logger.info(a.text)
        #return HttpResponse(json.dumps(result))

def ceshi(request):
    print request.body
    return HttpResponse('success')

fiveprovince_cache=[
    {
        'hostid':10470,
        'out_itemid':51606,
        'groupid':22,
        'attribute':u'省中心节点A',
        'province':u'内蒙呼和浩特',
        'cdn':42
    },
    {
        'hostid':10755,
        'out_itemid':102173,
        'groupid':90,
        'attribute':u'省中心节点B',
        'province':u'内蒙通辽',
        'cdn':42
    },
    {
        'hostid':10473,
        'out_itemid':51612,
        'groupid':18,
        'attribute':u'省中心节点A',
        'province':u'山西太原',
        'cdn':48
    },
    {
        'hostid':10632,
        'out_itemid':90062,
        'groupid':68,
        'attribute':u'省中心节点B',
        'province':u'山西太原',
        'cdn':42
    },
    {
        'hostid':10472,
        'out_itemid':51610,
        'groupid':31,
        'attribute':u'省中心节点A',
        'province':u'湖北武汉',
        'cdn':42
    },
    {
        'hostid':10799,
        'out_itemid':108658,
        'groupid':91,
        'attribute':u'省中心节点B',
        'province':u'湖北武汉',
        'cdn':66
    },
    {
        'hostid':10471,
        'out_itemid':51608,
        'groupid':94,
        'attribute':u'省中心节点',
        'province':u'西藏拉萨',
        'cdn':42
    },
    {
        'hostid':10580,
        'out_itemid':76850,
        'groupid':25,
        'attribute':u'省中心节点A',
        'province':u'黑龙江哈尔滨',
        'cdn':42
    },
    {
        'hostid':10581,
        'out_itemid':76852,
        'groupid':28,
        'attribute':u'省中心节点B',
        'province':u'黑龙江哈尔滨',
        'cdn':60
    }
]
def zabbix_table(request):
    """
    企业报表接口
    """
    if request.method !='GET':
        logger.error('请求方式不正确')
        result={'code':-1, 'msg': "请求方式不正确,请使用GET方式"}
        return HttpResponse(json.dumps(result))
    startTime=request.GET.get('startTime')
    if not startTime:
        logger.error('缺少必传参数startTime')
        result={'code':-2,'msg':"缺少必传参数startTime"}
        return HttpResponse(json.dumps(result))
    endTime=request.GET.get('endTime')
    if not endTime:
        logger.error('缺少必传参数endTime')
        result={'code':-3,'msg':"缺少必传参数endTime"}
        return HttpResponse(json.dumps(result))
    startTime = startTime.replace('/',' ')
    endTime = endTime.replace('/',' ')
    dateFormat = "%Y-%m-%d %H:%M:%S"
    startTime =  time.strptime(startTime,dateFormat)
    endTime =  time.strptime(endTime,dateFormat)
    time_from = int(time.mktime(startTime))
    time_till = int(time.mktime(endTime))
    try: 
        zapi=zabbix_fiveprovince()
        #group=zapi.hostgroup.get(
        #    output=['groupid','name']
        #)
        #print group
        #outitems=zapi.item.get(
        #    filter={"name":"grpfunc Outcoming network Bond0"},
        #    output=['itemids'],
        #    hostids=10581
        #)
        #print outitems
        results=[]
        for row in fiveprovince_cache:
            groupid=row['groupid']
            hostid=row['hostid']
            out_itemid=row['out_itemid']
            cdn=row['cdn']
            attribute=row['attribute']
            province=row['province']
            province_number=zapi.host.get(
                output=['hostid','name'],
                groupids=groupid,
            )
            group_number=len(province_number)
            outcoming_get=zapi.trend.get(
                output=['value_max'],
                itemids=out_itemid,
                time_from=time_from,
                time_till=time_till,
            )
            #print outcoming_get
            max=0
            for row in outcoming_get:
                if float(row['value_max'])>max:
                    max_row=row
                    max=float(row['value_max'])
            #print max
            if outcoming_get:
                outcoming_max=round(max/(1000*1000*1000),2)
                utilization_ratio=round((outcoming_max/int(cdn))*100,2)
            else:
                outcoming_max=0
                utilization_ratio=0
            results.append({'province':province,'attribute':attribute,'group_number':group_number,'cdn':cdn,'outcoming_max':outcoming_max,'utilization_ratio':utilization_ratio})
        #print results
    except Exception, e:
        logger.exception('zabbix取不到数据')
        result={'code':1, 'msg': "zabbix取不到数据"}
        return HttpResponse(json.dumps(result))
    result={}
    result={'code':0,'data':results}
    return HttpResponse(json.dumps(result))


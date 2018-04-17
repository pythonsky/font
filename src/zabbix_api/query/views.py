#encoding=utf-8
from django.http import HttpResponse
import json,time
import requests
import logging
logger=logging.getLogger('django')


def channel(request):
    """
    频道查询接口
    """
    if request.method !='GET':
        logger.error('请求方式不正确')
        result={'code':4, 'msg': "请求方式不正确,请使用GET方式"}
        return HttpResponse(json.dumps(result),status=200)
    if len(request.GET) != 1:
        logger.error('参数传入不正确')
        result={'code':5, 'msg': "只能传一个参数"}
        return HttpResponse(json.dumps(result),status=200)
    if 'arg' not in request.GET:
        logger.error('参数传入不正确')
        result={'code':5, 'msg': "arg参数为必传参数"}
        return HttpResponse(json.dumps(result),status=200)
    try:
        arg=request.GET.get('arg')
        ori=requests.get("http://106.39.160.142/api/v1/channel/%s"%arg)
        a=ori.text.strip()
        b=a.split('\n\n\n')
        results = []
        for c in b:
            c = c.strip().split('\n')
            d = {}
            for item in c:
                k, v = item.split(': ')
                k=k.replace('"',"")
                k=k.strip()
                d[k] = v
            results.append(d)
    except Exception, e:
        logger.exception('数据取不到')
        result={'code':2, 'msg': "数据取不到"}
        return HttpResponse(json.dumps(result),status=200)
    result={'code':0,'data':results}
    return HttpResponse(json.dumps(result))

def little(request):
    """
    小文件查询接口
    """
    if request.method !='GET':
        logger.error('请求方式不正确')
        result={'code':4, 'msg': "请求方式不正确,请使用GET方式"}
        return HttpResponse(json.dumps(result),status=200)
    if len(request.GET) != 1:
        logger.error('参数传入不正确')
        result={'code':5, 'msg': "只能传一个参数"}
        return HttpResponse(json.dumps(result),status=200)
    if 'arg' not in request.GET:
        logger.error('参数传入不正确')
        result={'code':5, 'msg': "arg参数为必传参数"}
        return HttpResponse(json.dumps(result),status=200)
    try:
        arg=request.GET.get('arg')
        ori=requests.get("http://106.39.160.142/api/v1/video/little/%s"%arg)
        a=ori.text.strip()
        if a == "No Movie Info":
            result={'code':-1,'msg':"数据为空",'data':[]}
            return HttpResponse(json.dumps(result),status=200)
        b=a.split('\n\n\n')
        results = []
        for c in b:
            c = c.strip().split('\n')
            d = {}
            for item in c:
                k, v = item.split(': ', 1)
                k=k.replace('"',"")
                k=k.strip()
                d[k] = v
            results.append(d)
    except Exception, e:
        logger.exception('数据取不到')
        result={'code':2, 'msg': "数据取不到"}
        return HttpResponse(json.dumps(result),status=200)
    result={'code':0,'data':results}
    return HttpResponse(json.dumps(result))

def large(request):
    """
    大文件查询接口
    """
    if request.method !='GET':
        logger.error('请求方式不正确')
        result={'code':4, 'msg': "请求方式不正确,请使用GET方式"}
        return HttpResponse(json.dumps(result),status=200)
    if len(request.GET) != 1:
        logger.error('参数传入不正确')
        result={'code':5, 'msg': "只能传一个参数"}
        return HttpResponse(json.dumps(result),status=200)
    if 'arg' not in request.GET:
        logger.error('参数传入不正确')
        result={'code':5, 'msg': "arg参数为必传参数"}
        return HttpResponse(json.dumps(result),status=200)
    try:
        arg=request.GET.get('arg')
        ori=requests.get("http://106.39.160.142/api/v1/video/large/%s"%arg)
        a=ori.text.strip()
        if a == "No Movie Info":
            result={'code':-1,'msg':"数据为空",'data':[]}
            return HttpResponse(json.dumps(result),status=200)
        b=a.split('\n\n\n')
        results = []
        for c in b:
            c = c.strip().split('\n')
            d = {}
            for item in c:
                k, v = item.split(': ', 1)
                k=k.replace('"',"")
                k=k.strip()
                d[k] = v
            results.append(d)
    except Exception, e:
        logger.exception('数据取不到')
        result={'code':2, 'msg': "数据取不到"}
        return HttpResponse(json.dumps(result),status=200)
    result={'code':0,'data':results}
    return HttpResponse(json.dumps(result))


def device(request):
    """
    设备查询接口
    """
    if request.method !='GET':
        logger.error('请求方式不正确')
        result={'code':4, 'msg': "请求方式不正确,请使用GET方式"}
        return HttpResponse(json.dumps(result),status=200)
    if len(request.GET) != 1:
        logger.error('参数传入不正确')
        result={'code':5, 'msg': "只能传一个参数"}
        return HttpResponse(json.dumps(result),status=200)
    if 'arg' not in request.GET:
        logger.error('参数传入不正确')
        result={'code':5, 'msg': "arg参数为必传参数"}
        return HttpResponse(json.dumps(result),status=200)
    try:
        arg=request.GET.get('arg')
        ori=requests.get("http://106.39.160.142/api/v1/device/%s"%arg)
        a=ori.text.strip()
        if a == "No Movie Info":
            result={'code':-1,'msg':"数据为空",'data':[]}
            return HttpResponse(json.dumps(result),status=200)
        b=a.split('\n\n\n')
        results = []
        for c in b:
            c = c.strip()
            d = {}
            if '--' in c:
                # 有运行频道的
                c1, c2 = c.split(': \n')
                c1 = c1.split('\n')
                for item in c1[:-1]:
                    k, v = item.split(': ',1)
                    k=k.replace('"',"")
                    k=k.strip()
                    d[k] = v
                d[c1[-1]] = c2
            else:
                c = c.split('\n')
                for item in c:
                    k, v = item.split(': ',1)
                    k=k.replace('"',"")
                    k=k.strip()
                    d[k] = v
            results.append(d)
    except Exception, e:
        logger.exception('数据取不到')
        result={'code':2, 'msg': "数据取不到"}
        return HttpResponse(json.dumps(result),status=200)
    result={'code':0,'data':results}
    return HttpResponse(json.dumps(result))

def sp(request):
    """
    SP查询接口
    """
    if request.method !='GET':
        logger.error('请求方式不正确')
        result={'code':4, 'msg': "请求方式不正确,请使用GET方式"}
        return HttpResponse(json.dumps(result),status=200)
    if len(request.GET) != 1:
        logger.error('参数传入不正确')
        result={'code':5, 'msg': "只能传一个参数"}
        return HttpResponse(json.dumps(result),status=200)
    if 'arg' not in request.GET:
        logger.error('参数传入不正确')
        result={'code':5, 'msg': "arg参数为必传参数"}
        return HttpResponse(json.dumps(result),status=200)
    try:
        arg=request.GET.get('arg')
        ori=requests.get("http://106.39.160.142/api/v1/video/sp/%s"%arg)
        a=ori.text.strip()
        if a == "No Movie Info":
            result={'code':-1,'msg':"数据为空",'data':[]}
            return HttpResponse(json.dumps(result),status=200)
        b=a.split('\n\n\n')
        results = []
        for c in b:
            c = c.strip().split('\n')
            d = {}
            for item in c:
                k, v = item.split(': ', 1)
                k=k.replace('"',"")
                k=k.strip()
                d[k] = v
            results.append(d)
    except Exception, e:
        logger.exception('数据取不到')
        result={'code':2, 'msg': "数据取不到"}
        return HttpResponse(json.dumps(result),status=200)
    result={'code':0,'data':results}
    return HttpResponse(json.dumps(result))


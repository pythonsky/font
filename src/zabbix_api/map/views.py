#encoding=utf-8
import sys
reload(sys)
sys.setdefaultencoding("utf-8")
from django.http import JsonResponse
from django.db import connection
import datetime

db_cursor=None
def get_cursor(db_cursor):
    if db_cursor==None:
        db_cursor=connection.cursor()
        return db_cursor
    else:
        return db_cursor

def get_datas():
    cursor=get_cursor(db_cursor)
    exe_sql="""
SELECT  
    r.log_type,
    c_are.name client_name,
    c_are.lng client_lng,
    c_are.lat client_lat,
    s_are.name source_name,
    s_are.lng source_lng,
    s_are.lat source_lat,
    SUM(r.request_number) AS request_number
FROM (
SELECT 
    req.client_ip,
    c.city_id c_city,
    req.source_ip,
    s.city_id s_city,
    req.request_number,
    req.log_type,
    req.create_time
FROM monitor3.request_record req 
    LEFT JOIN ip_city c ON (c.ip=req.client_ip)
    LEFT JOIN ip_city s ON (s.ip=req.source_ip)
WHERE req.create_time >= DATE_SUB(DATE_FORMAT(NOW(),'%Y-%m-%d %H:%i:00'),INTERVAL 5 MINUTE)
    AND req.create_time < DATE_SUB(DATE_FORMAT(NOW(),'%Y-%m-%d %H:%i:00'),INTERVAL 4 MINUTE)
) r
    LEFT JOIN sh_area c_are ON (r.c_city=c_are.id)
    LEFT JOIN sh_area s_are ON (r.s_city=s_are.id)
GROUP BY r.c_city,r.s_city,r.log_type;
"""
    cursor.execute(exe_sql)
    datas=cursor.fetchall()
    return datas

def get_xy(datas):
    dic_result={}
    for row in datas:
        client_name=str(row[1])
        source_name=str(row[4])
        if None not in row[2:4]:
            dic_result[client_name]=map(str,row[2:4])
        if None not in row[5:7]:
            dic_result[source_name]=map(str,row[5:7])
    return dic_result


def get_position(datas): 
    list_result=[]
    for row in datas:
        if None not in [row[1],row[4]]:
            client_name=str(row[1])
            source_name=str(row[4])
            list_result.append([{'name':client_name},{'name':source_name}],)
    return list_result

        
def get_move_line(datas):
    list_beijing_zhibo = []
    bj_line_end_zhibo = []
    list_guangzhou_zhibo = []
    gz_line_end_zhibo = []
    list_nanjing_zhibo = []
    nj_line_end_zhibo = []
    list_beijing_dianbo = []
    bj_line_end_dianbo = []
    list_guangzhou_dianbo = []
    gz_line_end_dianbo = []
    list_nanjing_dianbo = []
    nj_line_end_dianbo = []
    for row in datas:
        source_name=row[4]
        client_name = row[1]
        if not client_name is None and not source_name is None:
            value = int(row[7])
            if row[0] == 'sevenlive':
                if source_name == u'北京市': 
                    list_beijing_zhibo.append((
                        {'name': source_name},
                        {'name': client_name, 'value': value},
                    ))
                    bj_line_end_zhibo.append({'name': client_name, 'value': value})
                elif source_name == u'南京市': 
                    list_nanjing_zhibo.append((
                        {'name': source_name},
                        {'name': client_name, 'value':value},
                    ))
                    nj_line_end_zhibo.append({'name': client_name, 'value': value})
                elif source_name == u'广州市': 
                    list_guangzhou_zhibo.append((
                        {'name': source_name},
                        {'name': client_name, 'value': value},
                    ))
                    gz_line_end_zhibo.append({'name': client_name, 'value': value})
            elif row[0] == 'sevenng':
                if source_name == u'北京市': 
                    list_beijing_dianbo.append((
                        {'name': source_name, 'value': value},
                        {'name': client_name},
                    ))
                    bj_line_end_dianbo.append({'name': client_name, 'value': value})
                elif source_name == u'南京市': 
                    list_nanjing_dianbo.append((
                        {'name': source_name, 'value': value},
                        {'name': client_name},
                    ))
                    nj_line_end_dianbo.append({'name': client_name, 'value': value})
                elif source_name == u'广州市': 
                    list_guangzhou_dianbo.append((
                        {'name': source_name, 'value': value},
                        {'name': client_name},
                    ))
                    gz_line_end_dianbo.append({'name': client_name, 'value': value})
         
    result = {'zhibo':
                 {
                     'beijing_line_zhibo': list_beijing_zhibo,
                     'bj_line_end_zhibo': bj_line_end_zhibo,
                     'guangzhou_line_zhibo': list_guangzhou_zhibo,
                     'gz_line_end_zhibo': gz_line_end_zhibo,
                     'nanjing_line_zhibo':list_nanjing_zhibo,
                     'nj_line_end_zhibo':nj_line_end_zhibo,
                 },
              'dianbo':
                 {
                     'beijing_line_dianbo':list_beijing_dianbo,
                     'nanjing_line_dianbo':list_nanjing_dianbo,
                     'guangzhou_line_dianbo':list_guangzhou_dianbo,
                     'bj_line_end_dianbo': bj_line_end_dianbo,
                     'nj_line_end_dianbo': nj_line_end_dianbo,
                     'gz_line_end_dianbo': gz_line_end_dianbo,
                 }
             }
    return result
            
    

def get_max_min_value(datas):
    list_a=[]
    if datas:
        for row in datas:
            value = int(row[7])
            list_a.append(value)
        max_value=max(list_a)
        min_value=min(list_a)
        list_a = [{'max':max_value,'min':min_value}]
        return list_a


def return_datas(request):
    datas=get_datas()
    xy=get_xy(datas)
    # position=get_position(datas)
    move_line=get_move_line(datas)
    # max_min_value=get_max_min_value(datas)
    last_result={'xy':xy,'move_line':move_line}
    response=JsonResponse(last_result,safe=False)
    return response

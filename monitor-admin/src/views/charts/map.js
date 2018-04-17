export  function getOption(data,_self,zhicharesp) {

    // var placeList = [{
    //         "geoCoord": [116.405285, 39.904989],
    //         "name": "北京北京永丰2层211机房"
    //     },
   
    //     {
    //         "geoCoord": [112.549248, 37.857014],
    //         "name": "山西太原太原市高新技术产业开发区数码西路3号新枢纽楼406机房"
    //     },
    //     {
    //         "geoCoord": [113.295259, 40.09031],
    //         "name": "山西大同大同电信分公司心枢纽楼机房"
    //     },
    //     {
    //         "geoCoord": [113.295259, 40.09031],
    //         "name": "山西大同大同市御东区大同电信分公司大楼7楼机房"
    //     },
    //     {
    //         "geoCoord": [113.295259, 40.09031],
    //         "name": "山西大同大同市御东区大同电信分公司大楼机房7楼机房"
    //     },
   
    
  
    //     {
    //         "geoCoord": [113.583285, 37.861188],
    //         "name": "山西阳泉移动生产楼3层"
    //     },
    //     {
    //         "geoCoord": [113.113556, 36.191112],
    //         "name": "山西长治邮政大楼三层中心机房"
    //     },
     
    //     {
    //         "geoCoord": [112.851274, 35.497553],
    //         "name": "山西晋城电信新大楼4层机房"
    //     },
    //     {
    //         "geoCoord": [112.851274, 35.497553],
    //         "name": "山西晋城晋城市开发区电信新大楼4层机房"
    //     },
    //     {
    //         "geoCoord": [112.851274, 35.497553],
    //         "name": "山西晋城晋城市红星东街2309号电信4楼404机房"
    //     },
    //     {
    //         "geoCoord": [112.851274, 35.497553],
    //         "name": "山西晋城电信4楼404机房"
    //     },
    //     {
    //         "geoCoord": [112.433387, 39.331261],
    //         "name": "山西朔州朔州电信分公司开发区电信大楼四层机房"
    //     },
    //     {
    //         "geoCoord": [112.433387, 39.331261],
    //         "name": "山西朔州朔州开发区文远路西10号电信大楼四层机房"
    //     },
    //     {
    //         "geoCoord": [112.433387, 39.331261],
    //         "name": "山西朔州电信大楼四层机房"
    //     },
    //     {
    //         "geoCoord": [112.736465, 37.696495],
    //         "name": "山西晋中佳地机房1层"
    //     },
    //     {
    //         "geoCoord": [112.736465, 37.696495],
    //         "name": "山西晋中晋中市榆次区定阳路晋中电信（市民之家北200m路西）"
    //     },
    //     {
    //         "geoCoord": [112.736465, 37.696495],
    //         "name": "山西晋中6楼生产机房"
    //     },
    //     {
    //         "geoCoord": [111.003957, 35.022778],
    //         "name": "山西运城5楼机房"
    //     },
    //     {
    //         "geoCoord": [111.003957, 35.022778],
    //         "name": "山西运城6楼机房"
    //     },
    //     {
    //         "geoCoord": [111.003957, 35.022778],
    //         "name": "山西运城运城市盐湖区槐东路移动生产楼5楼"
    //     },
    //     {
    //         "geoCoord": [112.733538, 38.41769],
    //         "name": "山西忻州忻州市新建北路开发区邮政大楼西三层"
    //     },
    //     {
    //         "geoCoord": [112.733538, 38.41769],
    //         "name": "山西忻州邮政大楼西3层"
    //     },
    //     {
    //         "geoCoord": [111.517973, 36.08415],
    //         "name": "山西临汾移动生产楼6层电信中心机房"
    //     },
    //     {
    //         "geoCoord": [111.517973, 36.08415],
    //         "name": "山西临汾临汾市开发区河汾路移动生产楼5F"
    //     },
    //     {
    //         "geoCoord": [111.517973, 36.08415],
    //         "name": "山西临汾移动生产楼6F"
    //     },
    //     {
    //         "geoCoord": [111.134335, 37.524366],
    //         "name": "山西吕梁吕梁市马茂庄中心机房4层"
    //     },
    //     {
    //         "geoCoord": [111.134335, 37.524366],
    //         "name": "山西吕梁电信生产楼4F"
    //     },
    //     {
    //         "geoCoord": [111.670801, 40.818311],
    //         "name": "内蒙古呼和浩特内蒙古信息园数据中心-A6机房3层301机房"
    //     },
    //     {
    //         "geoCoord": [111.670801, 40.818311],
    //         "name": "内蒙古呼和浩特内蒙古信息园数据中心-A6机房3层301机房（中心）"
    //     },
    //     {
    //         "geoCoord": [111.670801, 40.818311],
    //         "name": "内蒙古呼和浩特金桥枢纽楼2楼金桥发展机房"
    //     },
    //     {
    //         "geoCoord": [109.840405, 40.658168],
    //         "name": "内蒙古包头包头市阿尔丁大街联通大厦7楼中心机房"
    //     },
    //     {
    //         "geoCoord": [106.825563, 39.673734],
    //         "name": "内蒙古乌海新华西街联通大楼五楼乌海中心机房"
    //     },
    //     {
    //         "geoCoord": [118.956806, 42.275317],
    //         "name": "内蒙古赤峰天意路与兴安街交叉口，中国电信大楼3楼数据机房"
    //     },
    //     {
    //         "geoCoord": [122.263119, 43.617429],
    //         "name": "内蒙古通辽和平路3楼中心机房（西机房）"
    //     },
    //     {
    //         "geoCoord": [109.99029, 39.817179],
    //         "name": "内蒙古鄂尔多斯鄂尔多斯市东胜区和谐路新枢纽楼五层通信机房"
    //     },
    //     {
    //         "geoCoord": [119.758168, 49.215333],
    //         "name": "内蒙古呼伦贝尔海拉尔电信分公司枢纽楼2楼综合机房"
    //     },
    //     {
    //         "geoCoord": [107.416959, 40.757402],
    //         "name": "内蒙古巴彦淖尔巴彦淖尔市临河区利民西街西苑路电信大楼六楼中国电信机房"
    //     },
    //     {
    //         "geoCoord": [107.416959, 40.757402],
    //         "name": "内蒙古巴盟巴彦淖尔市临河区利民西街西苑路电信大楼六楼中国电信机房"
    //     },
    //     {
    //         "geoCoord": [113.114543, 41.034126],
    //         "name": "内蒙古乌兰察布内蒙古乌兰察布市集宁区满达西街电信公司5楼中心机房"
    //     },
    //     {
    //         "geoCoord": [122.070317, 46.076268],
    //         "name": "内蒙古兴安盟兴安盟中心机房，三楼机房"
    //     },
    //     {
    //         "geoCoord": [126.642464, 45.756967],
    //         "name": "黑龙江哈尔滨 IDC机房(中心)"
    //     },
    //     {
    //         "geoCoord": [126.642464, 45.756967],
    //         "name": "黑龙江哈尔滨数据机房"
    //     },
    //     {
    //         "geoCoord": [126.642464, 45.756967],
    //         "name": "黑龙江哈尔滨 IDC机房"
    //     },
    //     {
    //         "geoCoord": [126.642464, 45.756967],
    //         "name": "黑龙江哈尔滨四楼IDC机房"
    //     },
    //     {
    //         "geoCoord": [126.642464, 45.756967],
    //         "name": "黑龙江哈尔滨新大楼机房"
    //     },
    
    //     {
    //         "geoCoord": [123.953486, 47.348079],
    //         "name": "黑龙江齐齐哈尔电信4楼机房"
    //     },
    //     {
    //         "geoCoord": [123.953486, 47.348079],
    //         "name": "黑龙江齐齐哈尔南苑枢纽楼"
    //     },
    //     {
    //         "geoCoord": [130.975966, 45.300046],
    //         "name": "黑龙江鸡西新枢纽楼机房"
    //     },
    //     {
    //         "geoCoord": [130.277487, 47.332085],
    //         "name": "黑龙江鹤岗中心机房"
    //     },
    //     {
    //         "geoCoord": [130.277487, 47.332085],
    //         "name": "黑龙江鹤岗鹤岗电信二楼机房"
    //     },
    //     {
    //         "geoCoord": [131.157304, 46.643442],
    //         "name": "黑龙江双鸭山三楼电信机房"
    //     },
    //     {
    //         "geoCoord": [125.11272, 46.590734],
    //         "name": "黑龙江大庆枢纽楼五楼机房"
    //     },
    //     {
    //         "geoCoord": [125.11272, 46.590734],
    //         "name": "黑龙江大庆枢纽楼5楼电信机房"
    //     },
   
    
 
    //     {
    //         "geoCoord": [128.899396, 47.724775],
    //         "name": "黑龙江伊春伊春新枢纽楼综合机房"
    //     },
   
    //     {
    //         "geoCoord": [130.361634, 46.809606],
    //         "name": "黑龙江佳木斯佳西3楼机房"
    //     },
    //     {
    //         "geoCoord": [130.361634, 46.809606],
    //         "name": "黑龙江佳木斯三合机房"
    //     },
    //     {
    //         "geoCoord": [131.015584, 45.771266],
    //         "name": "黑龙江七台河二楼枢纽机房"
    //     },
    //     {
    //         "geoCoord": [131.015584, 45.771266],
    //         "name": "黑龙江七台河七台河新枢纽综合机房"
    //     },
    //     {
    //         "geoCoord": [129.618602, 44.582962],
    //         "name": "黑龙江牡丹江二楼电信机房"
    //     },
    //     {
    //         "geoCoord": [127.499023, 50.249585],
    //         "name": "黑龙江黑河新枢纽楼机房"
    //     },
    //     {
    //         "geoCoord": [126.99293, 46.637393],
    //         "name": "黑龙江绥化邮政机房"
    //     },
    //     {
    //         "geoCoord": [126.99293, 46.637393],
    //         "name": "黑龙江绥化绥化南五邮局机房"
    //     },
    //     {
    //         "geoCoord": [124.711526, 52.335262],
    //         "name": "黑龙江大兴安岭二楼电信机房"
    //     },
    //     {
    //         "geoCoord": [118.767413, 32.041544],
    //         "name": "江苏南京新港404机房（中心）"
    //     },
    //     {
    //         "geoCoord": [118.767413, 32.041544],
    //         "name": "江苏南京边缘2F机房"
    //     },
    //     {
    //         "geoCoord": [118.767413, 32.041544],
    //         "name": "江苏南京新港404机房"
    //     },
    //     {
    //         "geoCoord": [120.301663, 31.574729],
    //         "name": "江苏无锡11楼机房"
    //     },
    //     {
    //         "geoCoord": [117.184811, 34.261792],
    //         "name": "江苏徐州综合机房"
    //     },
    //     {
    //         "geoCoord": [119.946973, 31.772752],
    //         "name": "江苏常州4楼机房"
    //     },
    //     {
    //         "geoCoord": [120.619585, 31.299379],
    //         "name": "江苏常熟4层机房"
    //     },
    //     {
    //         "geoCoord": [120.864608, 32.016212],
    //         "name": "江苏南通7楼IDC机房"
    //     },
    //     {
    //         "geoCoord": [119.178821, 34.600018],
    //         "name": "江苏连云港5楼C级业务机房"
    //     },
    //     {
    //         "geoCoord": [119.021265, 33.597506],
    //         "name": "江苏淮安IDC中心机房"
    //     },
      
    //     {
    //         "geoCoord": [119.452753, 32.204402],
    //         "name": "江苏镇江电信17层机房"
    //     },
    //     {
    //         "geoCoord": [119.915176, 32.484882],
    //         "name": "江苏泰州9楼机房"
    //     },
    //     {
    //         "geoCoord": [118.293328, 33.945154],
    //         "name": "江苏宿迁四楼IDC机房"
    //     },
    //     {
    //         "geoCoord": [117.283042, 31.86119],
    //         "name": "安徽合肥安徽合肥天都路3楼机房(中心)"
    //     },
     
    //     {
    //         "geoCoord": [119.306239, 26.075302],
    //         "name": "福建福州福州市仓山信息楼四层东侧机房"
    //     },
    //     {
    //         "geoCoord": [119.306239, 26.075302],
    //         "name": "福建福州2福建省福州市仓山区六一南路仓山电信局二楼（IDC机房）"
    //     },
    //     {
    //         "geoCoord": [118.11022, 24.490474],
    //         "name": "福建厦门厦门江头电信局9楼IDC机房"
    //     },
    //     {
    //         "geoCoord": [119.007558, 25.431011],
    //         "name": "福建莆田莆田市溢华五层机房"
    //     },
    //     {
    //         "geoCoord": [117.635001, 26.265444],
    //         "name": "福建三明三明市下洋四层机房"
    //     },
    //     {
    //         "geoCoord": [118.589421, 24.908853],
    //         "name": "福建泉州1泉州市东海电信大楼6楼IDC机房"
    //     },
    //     {
    //         "geoCoord": [118.589421, 24.908853],
    //         "name": "福建泉州2泉州市普明电信4楼IDC机房"
    //     },
    //     {
    //         "geoCoord": [117.661801, 24.510897],
    //         "name": "福建漳州漳州市二分局二层机房"
    //     },
    //     {
    //         "geoCoord": [118.178459, 26.635627],
    //         "name": "福建南平南平市解放路三层IDC机房 "
    //     },
    //     {
    //         "geoCoord": [117.02978, 25.091603],
    //         "name": "福建龙岩龙岩市指挥大楼五层IDC机房"
    //     },
    //     {
    //         "geoCoord": [119.527082, 26.65924],
    //         "name": "福建宁德宁德市莱茵城六层机房"
    //     },
    //     {
    //         "geoCoord": [114.298572, 30.584355],
    //         "name": "湖北武汉13楼数据机房"
    //     },
    //     {
    //         "geoCoord": [114.298572, 30.584355],
    //         "name": "湖北武汉6层VIP机房"
    //     },
    //     {
    //         "geoCoord": [114.298572, 30.584355],
    //         "name": "湖北武汉5F南面IDC机房"
    //     },
    //     {
    //         "geoCoord": [115.077048, 30.220074],
    //         "name": "湖北黄石花湖3楼机房"
    //     },
    //     {
    //         "geoCoord": [110.785239, 32.647017],
    //         "name": "湖北十堰老大楼三楼交换机房"
    //     },
    //     {
    //         "geoCoord": [111.290843, 30.702636],
    //         "name": "湖北宜昌4层数据机房"
    //     },
    //     {
    //         "geoCoord": [112.144146, 32.042426],
    //         "name": "湖北襄阳5层数据机房"
    //     },
    //     {
    //         "geoCoord": [114.890593, 30.396536],
    //         "name": "湖北鄂州凤凰三楼数据机房"
    //     },
    //     {
    //         "geoCoord": [112.204251, 31.03542],
    //         "name": "湖北荆门电信大楼数据机房"
    //     },
    //     {
    //         "geoCoord": [113.926655, 30.926423],
    //         "name": "湖北孝感电子政务机房"
    //     },
    //     {
    //         "geoCoord": [113.926655, 30.926423],
    //         "name": "湖北孝感湖北省孝感市北京路4楼机房"
    //     },
    //     {
    //         "geoCoord": [112.23813, 30.326857],
    //         "name": "湖北荆州电信城南三层IDC机房"
    //     },
    //     {
    //         "geoCoord": [112.23813, 30.326857],
    //         "name": "湖北荆州 新南门IDC机房"
    //     },
  
     
    //     {
    //         "geoCoord": [114.879365, 30.447711],
    //         "name": "湖北黄冈4F综合机房"
    //     },
    //     {
    //         "geoCoord": [114.328963, 29.832798],
    //         "name": "湖北咸宁温泉开发区银泉大道10楼IDC机房"
    //     },
    //     {
    //         "geoCoord": [114.328963, 29.832798],
    //         "name": "湖北咸宁温泉区银泉大道10楼IDC机房"
    //     },
    //     {
    //         "geoCoord": [113.37377, 31.717497],
    //         "name": "湖北随州解放路5楼机房"
    //     },
    //     {
    //         "geoCoord": [109.48699, 30.283114],
    //         "name": "湖北恩施恩施红庙电信二楼CN2机房"
    //     },

    //     {
    //         "geoCoord": [113.453974, 30.364953],
    //         "name": "湖北仙桃新局八楼数据机房"
    //     },
    //     {
    //         "geoCoord": [112.896866, 30.421215],
    //         "name": "湖北潜江数据机房"
    //     },
    //     {
    //         "geoCoord": [113.165862, 30.653061],
    //         "name": "湖北天门城南四楼数据机房"
    //     },
    //     {
    //         "geoCoord": [113.280637, 23.125178],
    //         "name": "广东广州四层数据机房"
    //     },
    //     {
    //         "geoCoord": [113.280637, 23.125178],
    //         "name": "广东广州越秀区人民中路IDC机楼3楼北机房"
    //     },
    //     {
    //         "geoCoord": [113.280637, 23.125178],
    //         "name": "广东广州广州太和机房四层数据机房"
    //     },
    //     // {
    //     //     "geoCoord": [106.76889, 31.85125],
    //     //     "name": "新疆巴州202分局6楼机房"
    //     // },
    //     {
    //         "geoCoord": [106.713478, 26.578343],
    //         "name": "贵州贵阳IPTV机房（中心）"
    //     },
    //     {
    //         "geoCoord": [106.713478, 26.578343],
    //         "name": "贵州贵阳IPTV机房（边缘）"
    //     },
    //     {
    //         "geoCoord": [106.713478, 26.578343],
    //         "name": "贵州贵阳IPTV机房"
    //     },
    //     {
    //         "geoCoord": [104.846743, 26.584643],
    //         "name": "贵州六盘水数据机房"
    //     },
    //     {
    //         "geoCoord": [106.937265, 27.706626],
    //         "name": "贵州遵义数据机房"
    //     },
    
    //     {
    //         "geoCoord": [105.932188, 26.245544],
    //         "name": "贵州安顺数据机房"
    //     },
    //     {
    //         "geoCoord": [105.28501, 27.301693],
    //         "name": "贵州毕节数据机房"
    //     },
    //     {
    //         "geoCoord": [109.191555, 27.718346],
    //         "name": "贵州铜仁数据机房"
    //     },
    //     {
    //         "geoCoord": [104.897971, 25.08812],
    //         "name": "贵州黔西南数据机房"
    //     },
    //     {
    //         "geoCoord": [107.977488, 26.583352],
    //         "name": "贵州黔东南数据机房"
    //     },
    //     {
    //         "geoCoord": [107.517156, 26.258219],
    //         "name": "贵州黔南数据机房"
    //     },
    //     {
    //         "geoCoord": [102.712251, 25.040609],
    //         "name": "云南昆明14楼南侧机房"
    //     },
    //     {
    //         "geoCoord": [102.712251, 25.040609],
    //         "name": "云南昆明数据机房"
    //     },
    //     {
    //         "geoCoord": [103.797851, 25.501557],
    //         "name": "云南曲靖9楼IDC机房"
    //     },
    //     {
    //         "geoCoord": [102.543907, 24.350461],
    //         "name": "云南玉溪电信202局2楼交换机房"
    //     },
    //     {
    //         "geoCoord": [99.167133, 25.111802],
    //         "name": "云南保山小灵通机房"
    //     },
    //     {
    //         "geoCoord": [103.717216, 27.336999],
    //         "name": "云南昭通4楼新IDC机房"
    //     },
    //     {
    //         "geoCoord": [100.233026, 26.872108],
    //         "name": "云南丽江IDC机房"
    //     },
    //     {
    //         "geoCoord": [100.972344, 22.777321],
    //         "name": "云南普洱思茅区枢纽2楼数据机房"
    //     },
    //     {
    //         "geoCoord": [100.08697, 23.886567],
    //         "name": "云南临沧IDC机房"
    //     },
    //     {
    //         "geoCoord": [101.546046, 25.041988],
    //         "name": "云南楚雄电信公司7楼数据机房"
    //     },
  
    //     {
    //         "geoCoord": [103.384182, 23.366775],
    //         "name": "云南红河10楼机房"
    //     },
    //     {
    //         "geoCoord": [104.24401, 23.36951],
    //         "name": "云南文山数据机房"
    //     },
   
    //     {
    //         "geoCoord": [100.797941, 22.001724],
    //         "name": "云南版纳4楼数据机房"
    //     },
    //     {
    //         "geoCoord": [100.240037, 25.592765],
    //         "name": "云南大理数据机房"
    //     },
    
    //     {
    //         "geoCoord": [98.578363, 24.436694],
    //         "name": "云南德宏五楼数据机房"
    //     },
    //     {
    //         "geoCoord": [98.854304, 25.850949],
    //         "name": "云南怒江4楼数据机房"
    //     },
    //     {
    //         "geoCoord": [99.706463, 27.826853],
    //         "name": "云南迪庆电子政务机房"
    //     },
    //     {
    //         "geoCoord": [91.132212, 29.660361],
    //         "name": "西藏拉萨西郊电信机房6楼"
    //     },
    //     {
    //         "geoCoord": [91.132212, 29.660361],
    //         "name": "西藏拉萨云资源池机房"
    //     },
    //     {
    //         "geoCoord": [91.132212, 29.660361],
    //         "name": "西藏拉萨西郊电信机房6楼CDN机房"
    //     },
    //     {
    //         "geoCoord": [91.132212, 29.660361],
    //         "name": "西藏拉萨西郊电信机房2楼云机房"
    //     },
    //     {
    //         "geoCoord": [91.132212, 29.660361],
    //         "name": "西藏拉萨东郊电信3楼3-4机房"
    //     },
    //     {
    //         "geoCoord": [88.884874, 29.263792],
    //         "name": "西藏日喀则电信新局6楼数据机房"
    //     },
    //     {
    //         "geoCoord": [97.178452, 31.136875],
    //         "name": "西藏昌都昌都分公司4楼网运机房"
    //     },
    //     {
    //         "geoCoord": [97.178452, 31.136875],
    //         "name": "西藏昌都昌都市嘎东街381号昌都市电信分公司4楼网运机房"
    //     },


    //     {
    //         "geoCoord": [91.766529, 29.236023],
    //         "name": "西藏山南山南电信4楼数据机房"
    //     },
    //     {
    //         "geoCoord": [91.766529, 29.236023],
    //         "name": "西藏山南山南电信76局4楼机房"
    //     },
    //     {
    //         "geoCoord": [92.060214, 31.476004],
    //         "name": "西藏那曲那曲分公司2楼网运机房"
    //     },
    
    //     {
    //         "geoCoord": [80.105498, 32.503187],
    //         "name": "西藏阿里新电信二楼数据机房"
    //     },
    //     {
    //         "geoCoord": [80.105498, 32.503187],
    //         "name": "西藏阿里阿里分公司2楼机房"
    //     },
    //     {
    //         "geoCoord": [94.362348, 29.654693],
    //         "name": "西藏林芝电信大厦6楼网运机房"
    //     },
    //     {
    //         "geoCoord": [94.362348, 29.654693],
    //         "name": "西藏林芝传输分局6楼机房"
    //     },
 
    //     {
    //         "geoCoord": [101.778916, 36.623178],
    //         "name": "青海西宁7楼机房（中心）"
    //     },
    //     {
    //         "geoCoord": [101.778916, 36.623178],
    //         "name": "青海西宁西宁古城台二楼机房"
    //     },
    //     {
    //         "geoCoord": [102.10327, 36.502916],
    //         "name": "青海海东平安4F机房"
    //     },
    //     {
    //         "geoCoord": [94.90329, 36.40236],
    //         "name": "青海格尔木格尔木电信三楼机房"
    //     },
    //     {
    //         "geoCoord": [87.617733, 43.792818],
    //         "name": "新疆乌鲁木齐电信第二枢纽6楼IPTV机房（中心）"
    //     },
    //     {
    //         "geoCoord": [87.617733, 43.792818],
    //         "name": "新疆乌鲁木齐电信第二枢纽6楼IPTV机房"
    //     },
    //     {
    //         "geoCoord": [87.617733, 43.792818],
    //         "name": "新疆乌鲁木齐乌鲁木齐市南湖路分局3楼综合01机房B"
    //     },
    //     {
    //         "geoCoord": [87.617733, 43.792818],
    //         "name": "新疆乌鲁木齐乌鲁木齐钱塘江路分局3楼数据机房"
    //     },
    //     {
    //         "geoCoord": [87.617733, 43.792818],
    //         "name": "新疆乌鲁木齐乌鲁木齐中山路分局6F数据机房"
    //     },
    //     {
    //         "geoCoord": [87.40939, 43.47125],
    //         "name": "新疆乌鲁木齐乌鲁木齐市南湖路分局3楼综合01机房B"
    //     },
    //     {
    //         "geoCoord": [87.40939, 43.47125],
    //         "name": "新疆乌鲁木齐乌鲁木齐钱塘江路分局3楼数据机房"
    //     },
    //     {
    //         "geoCoord": [87.40939, 43.47125],
    //         "name": "新疆乌鲁木齐乌鲁木齐中山路分局6F数据机房"
    //     },
    //     {
    //         "geoCoord": [84.873946, 45.595886],
    //         "name": "新疆克拉玛依电信旧楼3层中心局无线机房01B"
    //     },
   
    //     {
    //         "geoCoord": [89.184078, 42.947613],
    //         "name": "新疆吐鲁番电信公司中心局4楼数据机房01B"
    //     },
    
    //     {
    //         "geoCoord": [93.51316, 42.833248],
    //         "name": "新疆哈密中心局3楼综合机房"
    //     },
    //     {
    //         "geoCoord": [87.304012, 44.014577],
    //         "name": "新疆昌吉昌吉电信公司9楼程控交换机房"
    //     },
   
    //     {
    //         "geoCoord": [80.265068, 41.170712],
    //         "name": "新疆阿克苏中国电信21局8楼IDC机房"
    //     },
   
    //     {
    //         "geoCoord": [75.989138, 39.467664],
    //         "name": "新疆喀什电信公司3楼数据01机房"
    //     },
    //     {
    //         "geoCoord": [79.92533, 37.110687],
    //         "name": "新疆和田202局3楼传输机房01"
    //     },
    //     {
    //         "geoCoord": [81.317946, 43.92186],
    //         "name": "新疆伊犁新疆伊宁市解放路61号80局3楼机房"
    //     },
    //     {
    //         "geoCoord": [84.90228, 44.425],
    //         "name": "新疆奎屯新疆奎屯市团结东街36号电信新局8楼机房"
    //     },
    //     {
    //         "geoCoord": [82.985732, 46.746301],
    //         "name": "新疆塔城新华路电信大楼2楼传输、数据中心机房"
    //     },
    //     {
    //         "geoCoord": [88.13963, 47.848393],
    //         "name": "新疆阿勒泰电信大楼4楼数据01机房"
    //     }
    // ]
    let zhichaData=[];
    if(zhicharesp.data.code===0&&zhicharesp.data.data.length!=0){
        for(let i of zhicharesp.data.data){
                zhichaData.push({
                    name:i.name,
                    zhicha:i.priority,
                    detail:i.datas,
                    itemStyle: {
                                normal: {
                                    color: i.priority==="levleOne"?'red':'#ff3249',
                                    label: {
                                        show: true,
                                        textStyle: {
                                            color: '#fff',
                                            fontSize: 15
                                        }
                                    }
                                },
                                emphasis: { // 也是选中样式
                                    borderWidth: 1,
                                    borderColor: 'yellow',
                                    color: i.priority==="levleOne"?'red':'#ff3249',
                                    label: {
                                        show: true,
                                        textStyle: {
                                            color: 'white'
                                        },
                                    }
                                }
                            },
                })
        }


    }
    var option = {
        backgroundColor: '#1b1b1b',
        // color: ['gold', 'aqua', 'lime'],
        title: {
            text: '天翼高清直播点播监控',
            subtext: '数据中心监控',
            x: 'center',
            y: 25,
            textStyle: {
                color: '#fff',
                fontSize: 20
            }
        },
        tooltip: {
            // trigger: 'item',
            trigger: 'axis',
            // formatter:function (params, ticket, callback) {
            //     let res = "<h2 style='color:yellow;''>" + params.data.name + '进出流量差:</h2>';
            //     if (params.data['zhicha']) {
            //         let title=params.data['zhicha']==="levleOne"?"带宽进出相差大于500M":"带宽进出相差大于200M"
            //         let head="<h3>当前进出流量差:" + title + '</h3>';
            //         res += head;
            //         res +="<table border='1px white'><tr>"
            //         res +="<th>主机</th><th>告警时间</th><th>描述</th></tr>"
            //         let detail=params.data.detail;
            //         if (params.data.detail.length>10){
            //             detail=params.data.detail.slice(0,10);
            //         }
            //         for(let i of detail){
            //             res +="<tr><td>"+i.name+"</td><td>"+i.lastchange+"</td><td>"+i.description+"</td></tr>"
            //         }
            //         if (params.data.detail.length>10){
            //             res+="<tr ><td  colspan='3' style='text-align:center'>...</td></tr>"
            //         }
            //         res +="</table>"
            //     }else{
            //         res += "当前进出流量差:" + "暂无" + '</br>';
            //     }
            //     return res;
            // }
        },
        color: [
            'rgb(130, 251, 11)',
            '#CC6600',
            'rgb(130, 251, 11)',
            '#CC6600',
            'rgb(130, 251, 11)',
            '#CC6600',
            'yellow'
            
        ],
        legend: {
            // orient: 'horizontal',
            orient: 'vertical',
            x: '10',
            y: "10",
            itemGap: 5,
            selectedMode: 'multiple',
            // backgroundColor: 'black',
            selected: {
                '北京中心直播': true,
                '北京中心点播': true,
                '南京中心直播': true,
                '南京中心点播': true,
                '广州中心直播': true,
                '广州中心点播': true,
                // '告警': true,
                '机房':true
            },
            data: ['北京中心直播', '北京中心点播', '南京中心直播', '南京中心点播', '广州中心直播', '广州中心点播','机房'],
            textStyle: {
                color: '#fff'
            }
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            x: 'right',
            y: 'center',
            feature: {
                mark: {
                    show: false
                },
                dataView: {
                    show: false,
                    readOnly: false
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                }
            }
        },
        // dataRange: {
        //     x: 'left',
        //     y: 'bottom',
        //     orient: 'horizontal',
        //     // min: data.max_min_value[0].min,
        //     itemHeight: 10,
        //     itemWidth: 10,
        //     min: 0,
        //     // max: data.max_min_value[0].max,
        //     max: 55000,
        //     calculable: true,
        //     color: ['#ff3333', 'orange', 'yellow', 'lime', 'aqua'],
        //     textStyle: {
        //         color: '#fff'
        //     }
        // },
        series: [{
                name: '全国',
                type: 'map',
                roam: true,
                hoverable: false,
                mapType: 'china',
                itemStyle: {
                    normal: {
                        label: {
                            show: true
                        },
                        borderColor: 'rgba(100,149,237,1)',
                        borderWidth: 0.5,
                        areaStyle: {
                            color: '#1b1b1b'
                        }
                    },
                    emphasis:{
                        label: {
                            show: true
                        },
                        borderColor: 'rgba(100,149,237,1)',
                        borderWidth: 0.5,
                        areaStyle: {
                            color: '#1b1b1b'
                        },
                    }
                },
                tooltip: {
                    show: false,
                    formatter: '{c}'
                },
                show: true,
                data:[],
                // data:zhichaData,
                // data: [{
                //     name: '广东',
                //     zhicha:10000,
                //     itemStyle: {
                //         normal: {
                //             color: 'red',
                //             label: {
                //                 show: true,
                //                 textStyle: {
                //                     color: '#fff',
                //                     fontSize: 15
                //                 }
                //             }
                //         },
                //         emphasis: { // 也是选中样式
                //             borderWidth: 2,
                //             borderColor: 'yellow',
                //             areaColor: '#cd5c5c',
                //             label: {
                //                 show: true,
                //                 textStyle: {
                //                     color: 'white'
                //                 },
                //             }
                //         }
                //     },

                // }],
                geoCoord: data.xy,
            },
            {
                name: '北京中心直播',
                type: 'map',
                mapType: 'china',
                data: [],
                symbol: 'emptyCircle',
                markLine: {
                    smooth: true,
                    effect: {
                        show: true,
                        scaleSize: 1,
                        period: 10,
                        color: '#fff',
                        shadowBlur: 10
                    },
                    itemStyle: {
                        normal: {
                            borderWidth: 1.5,
                            lineStyle: {
                                type: 'dotted',
                                shadowBlur: 10
                            }
                        }
                    },
                    data: data.move_line.zhibo.beijing_line_zhibo
                },
                markPoint: {
                    symbol: 'emptyCircle',
                    symbolSize: function (v) {
                        return Math.round(1 + v / 3000)
                    },
                    effect: {
                        show: true,
                        shadowBlur: 0
                    },
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            }
                        },
                        emphasis: {
                            label: {
                                position: 'top'
                            }
                        }
                    },
                    data: data.move_line.zhibo.bj_line_end_zhibo
                }
            },
            {
                name: '北京中心点播',
                type: 'map',
                mapType: 'china',
                data: [],
                symbol: 'emptyCircle',
                markLine: {
                    smooth: true,
                    smoothness: 0.3,
                    effect: {
                        show: true,
                        scaleSize: 1,
                        period: 10,
                        color: 'gray',
                        shadowBlur: 10
                    },
                    itemStyle: {
                        normal: {
                            borderWidth: 1.5,
                            lineStyle: {
                                type: 'dashed',
                                shadowBlur: 5
                            }
                        }
                    },
                    data: data.move_line.dianbo.beijing_line_dianbo
                },
                markPoint: {
                    symbol: 'emptyCircle',
                    symbolSize: function (v) {
                        return Math.round(1 + v / 3000)
                    },
                    effect: {
                        show: true,
                        shadowBlur: 0
                    },
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            }
                        },
                        emphasis: {
                            label: {
                                position: 'top'
                            }
                        }
                    },
                    data: data.move_line.dianbo.bj_line_end_dianbo
                }
            },
            {
                name: '南京中心直播',
                type: 'map',
                mapType: 'china',
                data: [],
                markLine: {
                    smooth: true,
                    effect: {
                        show: true,
                        scaleSize: 1,
                        period: 10,
                        color: '#fff',
                        shadowBlur: 10
                    },
                    itemStyle: {
                        normal: {
                            borderWidth: 1.5,
                            lineStyle: {
                                type: 'dotted',
                                shadowBlur: 10
                            }
                        }
                    },
                    data: data.move_line.zhibo.nanjing_line_zhibo
                },
                markPoint: {
                    symbol: 'emptyCircle',
                    symbolSize: function (v) {
                        return Math.round(1 + v / 3000)
                    },
                    effect: {
                        show: true,
                        shadowBlur: 0
                    },
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            }
                        },
                        emphasis: {
                            label: {
                                position: 'top'
                            }
                        }
                    },
                    data: data.move_line.zhibo.nj_line_end_zhibo

                }
            },
            {
                name: '南京中心点播',
                type: 'map',
                mapType: 'china',
                data: [],
                markLine: {
                    smooth: true,
                    smoothness: 0.3,
                    effect: {
                        show: true,
                        scaleSize: 1,
                        period: 10,
                        color: 'gray',
                        shadowBlur: 10
                    },
                    itemStyle: {
                        normal: {
                            borderWidth: 1.5,
                            lineStyle: {
                                type: 'dashed',
                                shadowBlur: 10
                            }
                        }
                    },
                    data: data.move_line.dianbo.nanjing_line_dianbo
                },
                markPoint: {
                    symbol: 'emptyCircle',
                    symbolSize: function (v) {
                        return Math.round(1 + v / 3000)
                    },
                    effect: {
                        show: true,
                        shadowBlur: 0
                    },
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            }
                        },
                        emphasis: {
                            label: {
                                position: 'top'
                            }
                        }
                    },
                    data: data.move_line.dianbo.nj_line_end_dianbo

                }
            },
            {
                name: '广州中心直播',
                type: 'map',
                mapType: 'china',
                data: [],
                markLine: {
                    smooth: true,
                    effect: {
                        show: true,
                        scaleSize: 1,
                        period: 10,
                        color: '#fff',
                        shadowBlur: 10
                    },
                    itemStyle: {
                        normal: {
                            borderWidth: 1.5,
                            lineStyle: {
                                type: 'dotted',
                                shadowBlur: 10
                            }
                        }
                    },
                    data: data.move_line.zhibo.guangzhou_line_zhibo
                },
                markPoint: {
                    symbol: 'emptyCircle',
                    symbolSize: function (v) {
                        return Math.round(1 + v / 3000)
                    },
                    effect: {
                        show: true,
                        shadowBlur: 0
                    },
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            }
                        },
                        emphasis: {
                            label: {
                                position: 'top'
                            }
                        }
                    },
                    data: data.move_line.zhibo.gz_line_end_zhibo
                }
            },
            {
                name: '广州中心点播',
                type: 'map',
                mapType: 'china',
                data: [],
                markLine: {
                    smooth: true,
                    smoothness:0.3,
                    effect: {
                        show: true,
                        scaleSize: 1,
                        period: 10,
                        color: 'gray',
                        shadowBlur: 10
                    },
                    itemStyle: {
                        normal: {
                            borderWidth: 1.5,
                            lineStyle: {
                                type: 'dashed',
                                shadowBlur: 10
                            }
                        }
                    },
                    data: data.move_line.dianbo.guangzhou_line_dianbo
                },
                markPoint: {
                    symbol: 'emptyCircle',
                    symbolSize: function (v) {
                        return Math.round(1 + v / 3000)
                    },
                    effect: {
                        show: true,
                        shadowBlur: 0
                    },
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            }
                        },
                        emphasis: {
                            label: {
                                position: 'top'
                            }
                        }
                    },
                    data: data.move_line.dianbo.gz_line_end_dianbo
                }
            },
            // {
            //     name: '告警',
            //     type: 'map',
            //     mapType: 'china',
            //     data: [],
            //     tooltip: {
            //         trigger: 'item',
            //         zlevel: 2,
            //         // position:[100,100],
            //         formatter: function (params, ticket, callback) {
            //             // console.log(params)
            //             var res = "<h3 style='color:red;''>" + params.data.name + '告警:</h3>';
            //             if (params.data['一级告警']) {
            //                 res += "一级告警:" + params.data['一级告警'] + '次</br>';
            //             }
            //             if (params.data['二级告警']) {
            //                 res += "二级告警:" + params.data['二级告警'] + '次</br>';
            //             }
            //             if (params.data['三级告警']) {
            //                 res += "三级告警:" + params.data['三级告警'] + '次</br>';
            //             }
            //             if (params.data['提示']) {
            //                 res += "提示:" + params.data['提示'] + '次</br>';
            //             }
            //             // setTimeout(function() {
            //             //   // 仅为了模拟异步回调
            //             //   callback(ticket, res);
            //             // }, 300)
            //             return res;
            //         }
            //     },
            //     markPoint: {
            //         // large:true,
            //         symbol: _self.beijing_img,
            //         symbolSize: 20,
            //         effect: {
            //             show: true,
            //             shadowBlur: 1
            //         },
            //         data: _self.beijingWarning
            //     }
            // },
            // 南京告警
            // {
            //     name: '告警',
            //     type: 'map',
            //     mapType: 'china',
            //     data: [],
            //     tooltip: {
            //         trigger: 'item',
            //         zlevel: 2,
            //         // position:[100,100],
            //         formatter: function (params, ticket, callback) {
            //             // console.log(params)
            //             var res = "<h3 style='color:red;''>" + params.data.name + '告警:</h3>';
            //             if (params.data['一级告警']) {
            //                 res += "一级告警:" + params.data['一级告警'] + '次</br>';
            //             }
            //             if (params.data['二级告警']) {
            //                 res += "二级告警:" + params.data['二级告警'] + '次</br>';
            //             }
            //             if (params.data['三级告警']) {
            //                 res += "三级告警:" + params.data['三级告警'] + '次</br>';
            //             }
            //             if (params.data['提示']) {
            //                 res += "提示:" + params.data['提示'] + '次</br>';
            //             }
            //             return res;
            //         }
            //     },
            //     markPoint: {
            //         // large:true,
            //         symbol: _self.nanjing_img,
            //         symbolSize: 20,
            //         effect: {
            //             show: true,
            //             shadowBlur: 1
            //         },
            //         data: _self.nanjingWarning
            //     }
            // },
            // 广州告警
            // {
            //     name: '告警',
            //     type: 'map',
            //     mapType: 'china',
            //     data: [],
            //     tooltip: {
            //         trigger: 'item',
            //         zlevel: 2,
            //         // position:[100,100],
            //         formatter: function (params, ticket, callback) {
            //             // console.log(params)
            //             var res = "<h3 style='color:red;''>" + params.data.name + '告警:</h3>';
            //             if (params.data['一级告警']) {
            //                 res += "一级告警:" + params.data['一级告警'] + '次</br>';
            //             }
            //             if (params.data['二级告警']) {
            //                 res += "二级告警:" + params.data['二级告警'] + '次</br>';
            //             }
            //             if (params.data['三级告警']) {
            //                 res += "三级告警:" + params.data['三级告警'] + '次</br>';
            //             }
            //             if (params.data['提示']) {
            //                 res += "提示:" + params.data['提示'] + '次</br>';
            //             }
            //             return res;
            //         }
            //     },
            //     markPoint: {
            //         // large:true,
            //         symbol: _self.guangzhou_img,
            //         symbolSize: 20,
            //         effect: {
            //             show: true,
            //             shadowBlur: 1
            //         },
            //         data: _self.guangzhouWarning
            //     }
            // },
                {
                    name: '机房',
                    type: 'map',
                    mapType: 'china',
                    itemStyle: {
                        normal: {
                            borderColor: 'rgb(237, 15, 82)',
                            borderWidth: 1.5,
                            areaStyle: {
                                color: '#f8ff87'
                            }
                        }
                    },
                    data: [],
                    tooltip: {
                        trigger: 'item',
                        zlevel: 2,
                        show:true,
                        // position:[100,100],
                        formatter: function (params, ticket, callback) {
                            // debugger
                            // console.log(params)
                            var res = '<h3>'+ params.data.name +'</h3>';
                            return res;
                        }
                    },
                    markPoint: {
                        symbolSize: 2,
                        // large: true,
                        symbol: 'circle',
                        effect: {
                            show: true,
                            color:"yellow"
                        },
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true
                                }
                            },
                            emphasis: {
                                label: {
                                    show:true,
                                }
                            }
                        },
                        data: (function () {
                            var jifang = [];
                            // var geoCoord
                            for (let i in data.xy) {
                                if(i.includes("机房")){
                                    let item=data.xy[i]
                                    jifang.push({
                                        name: i ,
                                        // value: 10,
                                        geoCoord: [
                                            item[0]-0.1,
                                            item[1]-0.1
                                        ]
                                    })
                                    
                                }
                            }
                            return jifang;
                        })()
                    }
                },
        ]
    };
    return option;
}
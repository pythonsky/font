#coding:utf-8
"""
Django settings for src project.

Generated by 'django-admin startproject' using Django 1.9.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.9/ref/settings/
"""

import os
import ldap
from django_auth_ldap.config import LDAPSearch, LDAPSearchUnion, GroupOfNamesType, PosixGroupType
# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

print "@@@ BASE_DIR:", BASE_DIR
# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.9/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'qwbxp#@(n_)uzhs#z38wbc)u$$j61&@$j*$y=66qo$^u*wd+t&'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

AUTH_LDAP_SERVER_URI = 'ldap://ldap.ctzcdn.com'
BASE_DN = 'cn=accounts,dc=ctzcdn,dc=com'
AUTH_LDAP_BIND_DN = 'uid=_auth.monitor.web,cn=users,'+BASE_DN
AUTH_LDAP_BIND_PASSWORD = "ISI^s*Z-SsvYq~rr"

#AUTH_LDAP_GROUP_TYPE = PosixGroupType(name_attr="cn")
AUTH_LDAP_GROUP_TYPE = GroupOfNamesType(name_attr="cn")

# ldap用户组的搜索路径
AUTH_LDAP_GROUP_SEARCH = LDAPSearch('cn=groups,'+BASE_DN, ldap.SCOPE_SUBTREE, "(objectClass=groupofnames)(cn=g_sys.monitor*)")
AUTH_LDAP_MIRROR_GROUPS = True
AUTH_LDAP_CACHE_GROUPS = True
# AUTH_LDAP_GROUP_CACHE_TIMEOUT = 1800  #(in seconds).
AUTH_LDAP_GROUP_CACHE_TIMEOUT = 1

# AUTH_LDAP_USER_SEARCH = LDAPSearch("dc=ldap,dc=i3box,dc=cn", ldap.SCOPE_SUBTREE, "(uid=%(user)s)")
# 我这边使用的ldapBorwser查看的ldap账号结构和信息
AUTH_LDAP_USER_SEARCH = LDAPSearch('cn=users,'+BASE_DN, ldap.SCOPE_SUBTREE, '(uid=%(user)s)')
AUTH_LDAP_USER_ATTR_MAP = {
    "first_name": "givenName",
    "last_name": "sn",
    "email": "mail"
}

AUTH_LDAP_USER_FLAGS_BY_GROUP = {
#定义用户可以登录admin后台的组是哪个，前面ldap中已经创建了这个组，并加入了指定用户
# 默认创建的django用户是不能登录admin后台的
#     "is_staff": 'cn=admin,cn=monitor,'+BASE_DN, 
    "is_staff": 'cn=g_sys.monitor.web,cn=groups,'+BASE_DN,
#定义用户可以完全操作admin后台的组是哪个，前面ldap中已经创建了这个组，并加入了指定用户
#     "is_superuser": 'cn=superuser,cn=monitor,'+BASE_DN 
    "is_superuser": 'cn=g_sys.monitor.web,cn=groups,'+BASE_DN 
}


# AUTH_LDAP_USER_FLAGS_BY_GROUP = {
# #定义用户可以登录admin后台的组是哪个，前面ldap中已经创建了这个组，并加入了指定用户
# # 默认创建的django用户是不能登录admin后台的
#     "is_staff": '0', 
# #定义用户可以完全操作admin后台的组是哪个，前面ldap中已经创建了这个组，并加入了指定用户
#     "is_superuser": '0' 
# }





AUTHENTICATION_BACKENDS = (  
    'django_auth_ldap.backend.LDAPBackend',   # ldap认证  
)  
LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
    'formatters': {
        'standard': {
            'format': '%(asctime)s [%(levelname)s]  [%(name)s:%(filename)s:%(funcName)s:%(lineno)d]: %(message)s'
        },
    },
    'filters': {
    },
    'handlers': {
        'console': {
            'level':'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter':'standard'
        },
        'django': {
            'level': 'DEBUG',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': '/var/log/django.log',
            'maxBytes': 1024 * 1024 * 100,  # 100 MB
            'backupCount': 5,
            'formatter': 'standard',
        },    
    },
    'loggers': {
        'django': {
            'handlers': ['console','django'],
            'level': 'INFO',
            'propagate': True,
        },
    },
}


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'zabbix_api',
    # 解决跨域问题
    'corsheaders',
    'django_crontab',
    #'account',
]

MIDDLEWARE_CLASSES = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    # 解决跨域问题
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    #'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
# 解决跨域问题
CORS_ORIGIN_ALLOW_ALL=True

CORS_ALLOW_CREDENTIALS=True
CORS_ALLOW_METHODS = 'DELETE,GET,OPTIONS,PATCH,POST,PUT'


ROOT_URLCONF = 'src.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'src.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.9/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'monitor3',
        'USER':'zhaoyongjian',
        'PASSWORD':'Bw$5h#Tzv#',
        'HOST':'106.39.160.52',
        'PORT':'3306',
    }
}


# Password validation
# https://docs.djangoproject.com/en/1.9/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/1.9/topics/i18n/

LANGUAGE_CODE = 'zh-hans'

TIME_ZONE = 'Asia/Shanghai'

USE_I18N = True

USE_L10N = True

USE_TZ = False


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.9/howto/static-files/

STATIC_URL = '/static/'

TEMPLATE_DIRS = (os.path.join(BASE_DIR,  'templates'),)

#CRONJOBS = [
    #('50 14 * * *', 'zabbix_api.mzabbix.views.write_mysql',),
    #('* * * * *', 'zabbix_api.mzabbix.views.zabbix_monitoralarm',),
#]


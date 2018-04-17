#coding:utf-8
import re
from django import forms
from django.core.validators import RegexValidator
class AuthenticateForm(forms.Form):
    username =forms.CharField(validators=[RegexValidator(re.compile('^[0-9a-zA-Z\._-]+$'), code='invalid')], error_messages={'required': u'用户名错误', 'invalid': u'用户名错误',},)
    password =forms.CharField(validators=[RegexValidator(re.compile('^\S+$'), code='invalid')], error_messages={'required': u'密码错误', 'invalid': u'密码错误',},)

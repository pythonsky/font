# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json
from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth import (authenticate, login as django_login,
                                 logout as django_logout)
from django.shortcuts import redirect
from account.forms import AuthenticateForm

def login(request):
    if request.method !='POST':
        return HttpResponse(json.dumps({'code':-3,'msg':'Request method Error'}))
    if request.user.is_authenticated():
        return HttpResponse(json.dumps({'code': 0, 'msg': 'login sucess'}))
    form = AuthenticateForm(request.POST)
    if not form.is_valid():
        print form.errors
        return HttpResponse(json.dumps({'code': -1, 'msg': 'Params Error'}))
    cleaned_data = form.cleaned_data
    print cleaned_data
    user = authenticate(username=cleaned_data['username'], password=cleaned_data['password'],)
    if user:
        django_login(request, user)
        return HttpResponse(json.dumps({'code': 0, 'msg': 'login sucess'}))
    return HttpResponse(json.dumps({'code': -2, 'msg': 'Authenticate Failed'}))


def logout(request):
    django_logout(request)
    return HttpResponse(json.dumps({'code': 0, 'msg': 'logout sucess'}))


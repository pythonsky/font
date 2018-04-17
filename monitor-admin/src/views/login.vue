<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录(版本v0.1.1)
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                            <span slot="prepend">
                                                                <Icon :size="16" type="person"></Icon>
                                                            </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                            <span slot="prepend">
                                                                <Icon :size="14" type="locked"></Icon>
                                                            </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">{{msg}}</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie';
    import util from '@/libs/util.js';
    var qs = require('qs');
    import {
    TweenMax,
    Power2
  } from "gsap";
    export default {
        data() {
            return {
                msg:"",
                form: {
                    userName: 'monitor_admin',
                    password: ''
                },
                rules: {
                    userName: [{
                        required: true,
                        message: '账号不能为空',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '密码不能为空',
                        trigger: 'blur'
                    }]
                }
            };
        },
        methods: {
            loginAnimation:function(){
                 TweenMax.to($('.login-tip'), 0.5, {
                ease: Power3.easeInOut,
                css: {
                  color:'white'
                }
              });
              TweenMax.to($('.login-tip'), 0.5, {
                ease: Power3.easeInOut,
                css: {
                  color:'red'
                },
                delay:1
              });
            },
            handleSubmit() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        // Cookies.set('user', this.form.userName);
                        // Cookies.set('password', this.form.password);
                        this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                        // if (this.form.userName === 'iview_admin') {
                        //     Cookies.set('access', 0);
                        // } else {
                        //     Cookies.set('access', 1);
                        // }
                        let _self = this;
                        util.ajax.post('/api/monitor/v1/login/', qs.stringify({
                            username: _self.form.userName,
                            password: _self.form.password
                        })).then(function(response) {
                            if (response && response.data.code == 0) {
                                Cookies.set('user', _self.form.userName);
                                Cookies.set('password', _self.form.password);
                                Cookies.set('access', 0);
                                _self.$router.push({
                                    name: 'home_index'
                                });
                                _self.msg="登录成功"
    
                            } else if (response && response.data.code == -1) {
                                _self.msg="用户名或者密码输入格式有误!"
                                _self.loginAnimation()
                            } else if (response && response.data.code == -2) {
                                _self.msg="用户名或者密码错误!"
                                _self.loginAnimation()
                            }
                        }).catch(function(error) {
                            console.log(error);
                        });
    
                    }
                });
            }
        }
    };
</script>

<style>
    
</style>

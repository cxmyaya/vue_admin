<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li v-for="(item, index) in menuList" :key="item.id" :class="{'cur-active':current===index}" @click="toggleMenu(item, index)">{{item.txt}}</li>
      </ul>
      <el-form ref="loginForm" :model="formData" size="medium" :rules="rules" status-icon>
        <el-form-item prop="email" class='item-form'>
          <label>邮箱</label>
          <el-input v-model="formData.email" clearable placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="pwd" class='item-form'>
          <label>密码</label>
          <el-input v-model="formData.pwd" clearable placeholder="请输入密码" type="password" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="pwds" class='item-form' v-if="mode=='register'">
          <label>重复密码</label>
          <el-input v-model="formData.pwds" clearable placeholder="请再次输入密码" type="password" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="code" class='item-form'>
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input v-model="formData.code" clearable placeholder="请输入验证码" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block">验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item  class='item-form'>
          <el-button type="danger" class="login-btn block" @click="submit">{{btnTxt}}</el-button>
        </el-form-item>
      </el-form>
    </div>
    
  </div>
</template>

<script>
  import {stripscript, validateEmail, validateCode, validatePwd} from '@/utils/validate'
  export default {
    name: "login",
    data(){
      let checkEmail = (rule, value, callback) => {
        if(value === ''){
          callback(new Error('请输入邮箱'))
        }else if(!validateEmail(value)){
          console.log(value)
          callback(new Error('邮箱格式有误'))
        }else{
          callback()
        }
      } 
      let checkPwd = (rule, value, callback) => {
        this.formData.pwd = stripscript(value)
        value = this.formData.pwd
        if(value === ''){
          callback(new Error('请输入密码'))
        }else if(!validatePwd(value)){
          callback(new Error('密码为6至20位数字+字母'))
        }else{
          callback()
        }
      }

      let checkPwds = (rule, value, callback) => {
        this.formData.pwds = stripscript(value)
        value = this.formData.pwds
        if(value === ''){
          callback(new Error('请再次输入密码'))
        }else if(value != this.formData.pwd){
                 console.log(value != this.formData.pwd)

          callback(new Error('密码输入不一致'))
        }else{
          callback()
        }
      }

       let checkCode = (rule, value, callback) => {
        this.formData.code = stripscript(value)
        value = this.formData.code
        if(value === ''){
          callback(new Error('请输入验证码'))
        }else if(!validateCode(value)){
          callback(new Error('验证码格式有误'))
        }else{
          callback()
        }
      }
     
      return {
        menuList:[
          {txt:'登录', type:'login'},
          {txt:'注册', type:'register'}
        ],
        current:0,
        formData:{
          email:'',
          pwd:"",
          code:'',
          pwds:''
        },
        rules:{
          email:[{required:true,validator:checkEmail,trigger:'blur'}],
          pwd:[{required:true,validator:checkPwd,trigger:'blur'}],
          pwds:[{required:true,validator:checkPwds,trigger:'blur'}],
          code:[{required:true,validator:checkCode,trigger:'blur'}]
        },
        mode:'login',
        btnTxt:'登录'
      }
    },
    mounted(){
      console.log(this.mode)
    },
    methods:{
      toggleMenu(item,index){
        this.current = index
        this.mode = item.type
        this.btnTxt = item.txt
        this.$refs.loginForm.resetFields()
        this.$refs.loginForm.clearValidate()
      },
      submit(){
        this.$refs.loginForm.validate(valid => {
          if(valid){
            console.log('submit!!!')
          }else{
            console.log('error!')
          }
        })
      }
    }
  }
</script>

<style lang='scss' scoped>
  #login{
    height:100vh;
    background-color: #344a5f
  }
  .login-wrap{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    width: 400px;
  }
  .menu-tab{
    text-align: center;
    li{
      display: inline-block;
      width: 88px;
      line-height: 36px;
      color:#fff;
      font-size: 14px;
      border-radius: 2px;
      cursor: pointer;
    }
    .cur-active{
      background-color: rgba(0,0,0,.1);
      box-shadow: 0px -12px 45px 2px #000
    }
  }
  .item-form{
    margin-bottom:5px;
    margin-top:10px;
    label{
      color:#fff;
      font-size:14px;
    }
  }
  .block{
    display: block;
    width:100%
  }
  .login-btn{
    margin-top:10px
  }
  .el-form{
    background-color: rgba(0,0,0,.1);
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0px 12px 30px 2px #000
  }

</style>
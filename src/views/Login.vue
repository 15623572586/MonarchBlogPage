<template>
  <div>
    <div class="ms-title">
        <h1>This is the login page.</h1>
    </div>
    <div class="ms-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px">
        <div class="ms-message">请输入用户和密码</div>
        <el-form-item prop="username">
            <el-input v-model="ruleForm.loginName" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="login()"></el-input>
        </el-form-item>
        <div class="login-btn">
            <el-button type="primary" @click="login()">登录</el-button>
        </div>
        <div class="login-btn">
            <el-button type="info" @click="sinUp()" style="margin-top:10px;">注册</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import fetch from '@/axiosConfig.js'

export default {
  data(){
    return {
      ruleForm: {
          loginName: '',
          password: ''
      },
      rules: {
          loginName: [
              { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
              { required: true, message: '请输入密码', trigger: 'blur' }
          ]
      }
    }
  },
  methods:{
    login(){
      const self = this;
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          var form={
            loginName:this.$md5(self.ruleForm.loginName),
            password:this.$md5(self.ruleForm.password)
          }
          fetch("POST","/login" ,form).then(result=>{
          }) 
        }
      });
    },
    sinUp(){
      this.$router.push("/sinup")
    }
  }

}
</script>

<style scoped> 
  .ms-title{
    margin-top: 10%;
    color: #317eac;
  }
    .ms-message{
        margin: 0px auto 40px auto;
        text-align: center;
        font-size:30px;
        color:#817b58;
        border: 1px solid #7ed0e5;
        background-color: #edebe1;
        line-height: 18px;
        font-size: 85%;
    }
    .ms-login{
        width:300px;
        height:250px;
        margin: auto;
        margin-top:40px;
        padding:40px;
        border-radius: 5px;
        background: #f5f5f5;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }

</style>

<template style="">
  <div class="page-background">
    <div class="ms-title">
        <h1>Welcome to simBlog.</h1>
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
            <el-button type="text" @click="getProvinces()">注册</el-button>
        </div>
      </el-form>
    </div>

    <div >
      <el-dialog title="用户注册" :visible.sync="dialogFormVisible" class="form">
        <el-form :model="sinupForm" class="sinup-background">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input
              v-model="sinupForm.userId"
              placeholder="请输入用户名"
              clearable
              class="input"
              size="small"
            ></el-input><i class="must">*</i>
          </el-form-item>
          <el-form-item label="昵称" :label-width="formLabelWidth">
            <el-input
              v-model="sinupForm.userName"
              placeholder="请输入昵称"
              clearable
              class="input"
              size="small"
            ></el-input><i class="must">*</i>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input
              v-model="sinupForm.userPassword"
              placeholder="请输入密码"
              show-password
              class="input"
              size="small"
            ></el-input><i class="must">*</i>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth">
            <el-input
              v-model="sinupForm.telNum"
              placeholder="请输入联系方式"
              clearable
              class="input"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" :label-width="formLabelWidth">
            <el-input
              v-model="sinupForm.realName"
              placeholder="请输入姓名"
              clearable
              class="input"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-radio-group v-model="sinupForm.userSex" class="input" style="margin-top:10px;">
              <el-radio :label="'男'">男</el-radio>
              <el-radio :label="'女'">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="生日" :label-width="formLabelWidth">
            <el-date-picker
              v-model="sinupForm.userBirthDate"
              type="date"
              value-format="yyyy-MM-dd"
              class="input"
              size="small"
              style="width:240px;"
              placeholder="选择生日"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="您所在的城市" :label-width="formLabelWidth">
            <el-select
              v-model="sinupForm.userAdrProv"
              size="small"
              style="width:120px;float:left;"
              @change="getCities(sinupForm.userAdrProv)"
            >
              <el-option v-for="(item,index) in Provinces" :key="index" :label="item.provinceName" :value="item.provinceId"></el-option>
            </el-select>
            <el-select
              v-model="sinupForm.userAdrCity"
              size="small"
              :disabled="citiesSeletDis"
              style="width:120px;float:left;"
            >
              <el-option v-for="(item,index) in Cities" :key="index" :label="item.cityName" :value="item.cityId"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="sinUp()">SinUp</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
  
</template>

<script>
import axios from '@/axiosConfig.js'
import Crypto from '@/crypto.js'
import store from '@/store.js'

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
      },
      dialogFormVisible: false,
      sinupForm: {
        userId: "",
        userPassword: "",
        userName: "",
        telNum: "",
        realName: "",
        userSex: "",
        userBirthDate: "",
        userAdrProv: "",
        userAdrCity: ""
      },
      Provinces: [],
      Cities: [],
      formLabelWidth: '120px',
      citiesSeletDis : false,
      notCityIds:["110000","120000","310000","500000","810000","820000"],
    }
  },
  methods:{
    login(){
      var self = this;
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          var loginData={
            loginName:Crypto.set(self.ruleForm.loginName),
            password:Crypto.set(self.ruleForm.password)
          }
          axios("POST","/login" ,loginData)
          .then(result=>{ 
            if(result.data.error==null){
              // store.commit("setUserStatus",result.data.userInfo);
              document.cookie ="userId:"+result.data.userInfo.userId;
              self.$router.push("/home");
            }else{
              self.open(result.data.error);
            }
          })
          .catch(error=>{
            self.$alert(error, "提示", {confirmButtonText: "确定"})
          }); 
        } else {
            // self.openMessage("请检查账号密码格式");
            return false;
        }
      });
    },
    getProvinces() {
      this.dialogFormVisible = true;
      axios("GET","/getProvinces",null)
      .then(result=>{
        if(result.data){
          this.Provinces = result.data;
          this.Cities = [];
        }
      })
      .catch(error=>{
        this.$alert(error, "提示", {confirmButtonText: "确定"})
      });
    },
    getCities(provinceId){
      if(this.notCityIds.indexOf(provinceId)==-1){
        this.Cities = [];
        this.sinupForm.userAdrCity = "";
        this.citiesSeletDis = false;
        var provinceIdData = {
          provinceId: provinceId,
        }
        axios("GET","/getCities",provinceIdData)
        .then(result=>{
          if(result.data){
            this.Cities = result.data;
          }
        })
        .catch(error=>{
          this.$alert(error, "提示", {confirmButtonText: "确定"})
        });
      }else{
        this.citiesSeletDis = true;
        this.Cities = [];
      }
    },
    sinUp(){
      if (this.sinupForm.userId == "") {
        this.open("用户名为必填项！");
        return;
      }
      if (this.sinupForm.userName == "") {
        this.open("昵称为必填项！");
        return;
      }
      if (this.sinupForm.userPassword == "") {
        this.open("密码为必填项，请输入密码！");
        return;
      }
      var formatData = {
        userId: this.sinupForm.userId,
        userPassword: this.sinupForm.userPassword,
        userName: this.sinupForm.userName,
        telNum: this.sinupForm.telNum,
        realName: this.sinupForm.realName,
        userSex: this.sinupForm.userSex,
        userBirthDate: this.sinupForm.userBirthDate,
        userAdrProv: this.sinupForm.userAdrProv,
        userAdrCity: this.sinupForm.userAdrCity,
        action: "sinup"
      };
      //加密注册
      formatData.userPassword = Crypto.set(formatData.userPassword);
      formatData.userId = Crypto.set(formatData.userId);
      axios("POST", "/sinup", formatData).then(result => {
        if (result.data=="0") {
          this.open("恭喜您，注册成功,请前往登录！");
          this.dialogFormVisible = false;
        }else{
          this.open(result.data);
        }
      }).catch(error=>{
        this.$alert(error, "提示", {confirmButtonText: "确定"})
      });
    },

    
    //弹窗提示内容
    open(msg) {
      this.$alert(msg, "提示", {
        confirmButtonText: "确定",
        // callback: action => {
        //   this.$message({});
        // }
      })
    }
  }

}
</script>

<style scoped> 
  .page-background{
    background: url("../assets/01.jpg");
    background-size: 100% 100%;
    height: 100%;
    position: fixed;
    width: 100%
  }

  .ms-title{
    margin-top: 10%;
    color: #FFFFFF;
    
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
      background: url("../assets/01.jpg");
  }
  .login-btn{
      text-align: center;
  }
  .login-btn button{
    width:100%;
    height:36px;
  }
  /* .sinup-background{
    background: url("../assets/02.jpg");
  } */
  .form{
    width: 1200px;
    margin-left: 350px; 
  }
  .input{
    width:240px;
    float: left;
  }
  .must{
    float:left;
    color:red;
  }
  
</style>

<template>
  <div>
    <div style="height:500px;width:700px;background:yellow">
      <div>
        <el-row type="flex" class="row-bg">
          <el-col :span="6">
            <div class="grid-content bg-purple" style="text-align:right;float:right;margin-top:5px;" >
							<i>用户名</i>
							<b style="color:red">*</b>
						</div>
          </el-col>
          <el-col :span="6">
						<div class="grid-content bg-purple">
            	<el-input v-model="sinupForm.userId" placeholder="请输入用户名" clearable class="input" size="small"></el-input>
						</div>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg" style="margin-top:10px;">
          <el-col :span="6">
            <div class="grid-content bg-purple" style="text-align:right;float:right;margin-top:5px;" >
							<i>昵称</i>
							<b style="color:red">*</b>
						</div>
          </el-col>
          <el-col :span="6">
            <el-input v-model="sinupForm.userName" placeholder="请输入昵称" clearable class="input" size="small"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg" style="margin-top:10px;">
          <el-col :span="6">
            <div class="grid-content bg-purple" style="text-align:right;float:right;margin-top:5px;">
							<i>密码</i>
							<b style="color:red;margin-left:2px;">*</b>
						</div>
          </el-col>
          <el-col :span="6">
            <el-input v-model="sinupForm.userPassword" placeholder="请输入密码"  show-password class="input" size="small"></el-input>
          </el-col>
        </el-row>
				
        <el-row type="flex" class="row-bg" style="margin-top:10px;">
          <el-col :span="6">
            <div class="grid-content bg-purple" style="text-align:right;float:right;margin-top:5px;" >
							<i>手机号</i>
						</div>
          </el-col>
          <el-col :span="6">
            <el-input v-model="sinupForm.telNum" placeholder="请输入手机号" clearable class="input" size="small"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" style="margin-top:10px;">
          <el-col :span="6">
            <div class="grid-content bg-purple" style="text-align:right;float:right;margin-top:5px;" >
							<i>真实姓名</i>
						</div>
          </el-col>
          <el-col :span="6">
            <el-input v-model="sinupForm.realName" placeholder="请输入姓名" clearable class="input" size="small"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" style="margin-top:10px;">
          <el-col :span="6">
            <div class="grid-content bg-purple" style="text-align:right;float:right;margin-top:5px;" >
							<i>请选择性别</i>
						</div>
          </el-col>
          <el-col :span="6">
						<el-radio-group v-model="sinupForm.userSex" class="input" style="margin-top:8px;">
							<el-radio :label="'男'">男</el-radio>
							<el-radio :label="'女'">女</el-radio>
						</el-radio-group>
          </el-col>
        </el-row>
				
        <el-row type="flex" class="row-bg" style="margin-top:10px;">
          <el-col :span="6">
            <div class="grid-content bg-purple" style="text-align:right;float:right;margin-top:5px;" >
							<i>请输入生日</i>
						</div>
          </el-col>
          <el-col :span="6">
						<el-date-picker v-model="sinupForm.userBirthDate" type="date" value-format="yyyy-MM-dd" class="input" size="small" placeholder="选择生日"> </el-date-picker>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg" style="margin-top:10px;">
          <el-col :span="6">
            <div class="grid-content bg-purple" style="text-align:right;float:right;margin-top:5px;" >
							<i>请选择您的省市</i>
						</div>
          </el-col>
          <el-col :span="4">
						<el-select v-model="sinupForm.userAdrProv" size="small" style="margin-left:20px;width:120px;">
							<el-option v-for="(item,index) in Provinces" :key="index" :label="item" :value="item"> </el-option>
						</el-select>
          </el-col>
          <el-col :span="5">
						<el-select v-model="sinupForm.userAdrCity" size="small" style="margin-left:20px;width:120px;">
							<el-option v-for="(item,index) in Cities" :key="index" :label="item" :value="item"> </el-option>
						</el-select>
          </el-col>
        </el-row>
				
				<el-row type="flex" class="row-bg" style="margin-top:40px;">
          <el-col :span="14">
            <div class="grid-content bg-purple" style="text-align:right;float:right;margin-top:5px;" >
							<el-button type="primary" size="small" class="button" @click="sinup()">注册</el-button>
						</div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>

import fetch from '@/axiosConfig.js'

export default {
	data(){
		return{
			sinupForm:{
				userId:"",
				userPassword:"",
				userName:"",
				telNum:"",
				realName:"",
				userSex:"",
				userBirthDate:"",
				userAdrProv:"",
				userAdrCity:"",
			},
			Provinces:["湖北","广东"],
			Cities:["武汉"],
		}
	},
	methods:{
		sinup(){
			if(this.sinupForm.userId==""){
				this.open("用户名为必填项！");
				return;
			}
			if(this.sinupForm.userName==""){
				this.open("昵称为必填项！");
				return;
			}
			if(this.sinupForm.userPassword==""){
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
				userAdrCity: this.sinupForm.userAdrCity
			}
			//加密注册
			formatData.userPassword = this.$md5(formatData.userPassword);
			formatData.userId = this.$md5(formatData.userId);
			fetch("POST","/sinup",formatData)
			.then(result=>{
				if(result.data){
					console.log(result.data)
				}
			})
		},

		//弹窗内容
		open(msg) {
        this.$alert(msg, '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
            });
          }
				});
		}
	}
}
</script>

<style scoped>
.input{
	width:240px;
	margin-left:20px;
}
.button{
	width: 200px;
}

</style>
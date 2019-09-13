<template>
  <div>
    <el-table
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      class="page-background"
      :data="userInfo"
      style="width: 1560px;"
			size="mini"
      :default-sort="{prop: 'createDate', order: 'descending'}"
    >
      <el-table-column prop="userId" label="用户名" width="150" class="table" style="background:red"></el-table-column>
      <el-table-column prop="userName" label="昵称"></el-table-column>
      <el-table-column prop="realName" label="姓名"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="createDate" sortable label="注册日期" ></el-table-column>
      <el-table-column prop="telNum" label="联系方式"></el-table-column>
      <el-table-column prop="city" label="所在城市"></el-table-column>
      <el-table-column prop="birthDate" label="生日"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="editUser(scope.row)"></el-button>
					<el-button type="danger" size="mini" @click="delUser(scope.row)" round>注销</el-button>
				</template>
			</el-table-column>
    </el-table>
    <div>
      <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible" class="form">
        <el-form :model="editForm" class="sinup-background">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input
              v-model="editForm.userId"
              placeholder="请输入用户名"
              clearable
              class="input"
              size="small"
              :disabled="true"
            ></el-input><i class="must">*</i>
          </el-form-item>
          <el-form-item label="昵称" :label-width="formLabelWidth">
            <el-input
              v-model="editForm.userName"
              placeholder="请输入昵称"
              clearable
              class="input"
              size="small"
            ></el-input><i class="must">*</i>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input
              v-model="editForm.userPassword"
              placeholder="请输入密码"
              show-password
              class="input"
              size="small"
              :disabled="true"
            ></el-input><i class="must">*</i>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth">
            <el-input
              v-model="editForm.telNum"
              placeholder="请输入联系方式"
              clearable
              class="input"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" :label-width="formLabelWidth">
            <el-input
              v-model="editForm.realName"
              placeholder="请输入姓名"
              clearable
              class="input"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-radio-group v-model="editForm.userSex" class="input" style="margin-top:10px;">
              <el-radio :label="'男'">男</el-radio>
              <el-radio :label="'女'">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="生日" :label-width="formLabelWidth">
            <el-date-picker
              v-model="editForm.userBirthDate"
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
              v-model="editForm.userAdrProv"
              size="small"
              style="width:120px;float:left;"
              @change="getCities(editForm.userAdrProv)"
            >
              <el-option v-for="(item,index) in Provinces" :key="index" :label="item.provinceName" :value="item.provinceId"></el-option>
            </el-select>
            <el-select
              v-model="editForm.userAdrCity"
              size="small"
              :disabled="citiesSeletDis"
              style="width:120px;float:left;"
            >
              <el-option v-for="(item,index) in Cities" :key="index" :label="item.cityName" :value="item.cityId"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="submit()">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from '@/axiosConfig.js'
import Crypto from '@/crypto.js'
export default {
  data(){
    return{
      userInfo:[], //当前分页信息
      allUserInfo:[], //所有数据
      dialogFormVisible: false,
      editForm: {
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
    getUserInfoList:function(){
      axios("GET","/getUserInfoList",null)
      .then(result=>{
        if(result.data.error!=null){
          this.$emit("open",result.data.error)
        }else{
          this.allUserInfo = result.data.allUserInfo;
          this.userInfo = result.data.allUserInfo;
          for (var index = 0; index < this.userInfo.length; index++) {
            this.userInfo[index].userId = Crypto.get(this.userInfo[index].userId)
          }
        }
      }).catch(error=>{
        this.$alert(error, "提示", {confirmButtonText: "确定"})
      });
    },
    editUser:function(row){
      this.editForm.userId = row.userId
      this.editForm.userName = row.userName
      this.editForm.telNum = row.telNum
      this.editForm.realName = row.realName
      this.editForm.userSex = row.sex
      this.editForm.userBirthDate = row.birthDate
      var userIdData={
        userId: Crypto.set(row.userId),
      }
      axios("GET","/getOneUserInfo",userIdData)
      .then(result=>{
        if(result.data.error!=null){
          this.$emit("open",result.data.error)
        }else{
          this.editForm.userAdrProv = result.data.province;
          this.editForm.userAdrCity = result.data.city;
          this.editForm.userPassword =  result.data.password;
          this.Provinces = result.data.Provinces;
        }
      }).catch(error=>{
        this.$alert(error, "提示", {confirmButtonText: "确定"})
      });
      this.dialogFormVisible = true;
    },
    
    getCities(provinceId){
      if(this.notCityIds.indexOf(provinceId)==-1){
        this.Cities = [];
        this.editForm.userAdrCity = "";
        this.citiesSeletDis = false;
        var provinceIdData = {
          provinceId: provinceId,
        }
        axios("GET","/getCities",provinceIdData)
        .then(result=>{
          if(result.data){
            this.Cities = result.data;
          }
        }).catch(error=>{
          this.$alert(error, "提示", {confirmButtonText: "确定"})
        });
      }else{
        this.citiesSeletDis = true;
        this.Cities = [];
      }
    },
    submit:function(){
      var formatData = this.editForm;
      formatData.userId = Crypto.set(formatData.userId);
      formatData.action = "edit";
      axios("POST", "/sinup", formatData).then(result => {
        if (result.data=="0") {
          this.$emit("open","该用户信息修改成功");
          this.dialogFormVisible = false;
          this.getUserInfoList();
        }else{
          this.$emit("open","该用户信息修改失败");
        }
      }).catch(error=>{
        this.$alert(error, "提示", {confirmButtonText: "确定"})
      });
    },
    delUser:function(row){
      this.$confirm('此操作将永久删除该用户信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var deleteData={
            userId : Crypto.set(row.userId),
          }
          axios("POST","/deleteUser",deleteData)
          .then(result=>{
            if(result.data=="0"){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }else if(result.data=="1"){
              this.$message({
                type: 'success',
                message: '删除失败，请重试!'
              });
            }
          }).catch(error=>{
            this.$alert(error, "提示", {confirmButtonText: "确定"})
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
  }
}
</script>

<style scoped>
  .el-table {
    background: rgba(255, 255, 255, 0.5);
  }
  .page-background {
    /* background: url("../assets/03.jpg"); */
    background: red;
    background: rgba(255, 255, 255, 0.5);
    /* background-size: 100% 100%;
    position: fixed;
    width: 100%; */
  }
  .form {
    width: 1200px;
    margin-left: 350px; 
  }
  .input {
    width:240px;
    float: left;
  }
  .must{
    float:left;
    color:red;
  }
</style>
<template>
  <div>
    <!-- :default-active="activeIndex2" 
    width="1920"-->
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="width:100%"
    >
      <el-menu-item index="博客中心" style="margin-left:40px;">随笔中心</el-menu-item>
      <!-- <el-menu-item index="消息中心">消息中心</el-menu-item> -->
      <!-- <el-menu-item index="发表文章">发表随笔</el-menu-item> -->
      <!-- <a href="# " target="_blank">订单管理</a> -->
      <i class="copy-right">Copyright© 2019 YunHu Yu AllRightsReserved.</i>
      <el-dropdown trigger="click" class="name">
        <span class="el-dropdown-link" style="color:white;">
          <i v-if="$store.state.userStatus.userName!=''">您好，{{$store.state.userStatus.userName}}</i>
          <i v-else>您好，请先登录</i>
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-if="$store.state.userStatus.userName==''"
            class="clearfix"
            @click.native="login()"
          >我要登录</el-dropdown-item>
          <div v-if="$store.state.userStatus.userName!=''">
            <el-dropdown-item class="clearfix" @click.native="getLoginUserInfo()">修改信息</el-dropdown-item>
            <el-dropdown-item class="clearfix" @click.native="getPersonalArticleList()">我的随笔</el-dropdown-item>
            <el-dropdown-item class="clearfix" @click.native="handleSelect('发表文章')">新建随笔</el-dropdown-item>
            <el-dropdown-item class="clearfix" @click.native="getUserInfoList()" v-if="$store.state.userStatus.userId=='Upg+Fey49QiH+fzrejvTZg=='">用户管理</el-dropdown-item>
            <el-dropdown-item class="clearfix" @click.native="logOut()">退出登录</el-dropdown-item>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>

    <el-dialog title="修改信息" append-to-body :visible.sync="dialogFormVisible" class="form">
      <el-form :model="personalInfo" class="sinup-background">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input
            v-model="personalInfo.userId"
            placeholder="请输入用户名"
            clearable
            class="input"
            size="small"
          ></el-input>
          <i class="must">*</i>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input
            v-model="personalInfo.userName"
            placeholder="请输入昵称"
            clearable
            class="input"
            size="small"
          ></el-input>
          <i class="must">*</i>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            v-model="personalInfo.userPassword"
            placeholder="请输入密码"
            show-password
            class="input"
            size="small"
          ></el-input>
          <i class="must">*</i>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input
            v-model="personalInfo.telNum"
            placeholder="请输入联系方式"
            clearable
            class="input"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" :label-width="formLabelWidth">
          <el-input
            v-model="personalInfo.realName"
            placeholder="请输入姓名"
            clearable
            class="input"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio-group v-model="personalInfo.userSex" class="input" style="margin-top:10px;">
            <el-radio :label="'男'">男</el-radio>
            <el-radio :label="'女'">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日" :label-width="formLabelWidth">
          <el-date-picker
            v-model="personalInfo.userBirthDate"
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
            v-model="personalInfo.userAdrProv.Id"
            size="small"
            style="width:120px;float:left;"
            @change="getCities(personalInfo.userAdrProv.Id)"
          >
            <el-option
              v-for="(item,index) in Provinces"
              :key="index"
              :label="item.provinceName"
              :value="item.provinceId"
            ></el-option>
          </el-select>
          <el-select
            v-model="personalInfo.userAdrCity.Name"
            size="small"
            :disabled="citiesSeletDis"
            style="width:120px;float:left;"
          >
            <el-option
              v-for="(item,index) in Cities"
              :key="index"
              :label="item.cityName"
              :value="item.cityName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submit()">Submit</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "@/axiosConfig.js";
import Crypto from "@/crypto.js";

export default {
  data() {
    return {
      activeIndex2: "博客中心",
      dialogFormVisible: false,
      personalInfo: {
        userId: "",
        userPassword: "",
        userName: "",
        telNum: "",
        realName: "",
        userSex: "",
        userBirthDate: "",
        userAdrProv: {
          Id: "",
          Name: ""
        },
        userAdrCity: {
          Id: "",
          Name: ""
        }
      },
      Provinces: [],
      Cities: [],
      formLabelWidth: "120px",
      citiesSeletDis: false,
      notCityIds: ["110000", "120000", "310000", "500000", "810000", "820000"]
    };
  },
  methods: {
    handleSelect(key) {
      // console.log(key, keyPath);
      this.$emit("showComponent", key);
    },
    login() {
      this.$router.push("/login");
    },
    getPersonalInfo() {
      this.$emit("getPersonalInfo");
    },
    getUserInfoList() {
      this.$emit("getUserInfoList");
    },
    logOut() {
      document.cookie = "userId" + "=;  expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      this.$router.push("/login");
    },
    setIndex() {
      this.activeIndex2 = "";
    },
    getLoginUserInfo() {
      var userId = this.$store.state.userStatus.userId;
      var userIdData = {
        userId: userId
      };
      axios("GET", "/getOneUserInfo", userIdData)
        .then(result => {
          if (result.data.error != null) {
            this.$emit("open", result.data.error);
          } else {
            this.personalInfo.userId = Crypto.get(result.data.userId);
            this.personalInfo.userName = result.data.userName;
            this.personalInfo.userPassword = Crypto.get(result.data.password);
            this.personalInfo.telNum = result.data.telNum;
            this.personalInfo.realName = result.data.realName;
            this.personalInfo.userSex = result.data.sex;
            this.personalInfo.userBirthDate = result.data.birthDate;
            this.personalInfo.userAdrProv = result.data.province;
            this.personalInfo.userAdrCity = result.data.city;
            this.Provinces = result.data.Provinces;
          }
        })
        .catch(error => {
          this.$alert(error, "提示", { confirmButtonText: "确定" });
        });
      this.dialogFormVisible = true;
    },
    getCities(provinceId) {
      this.personalInfo.userAdrCity = {
        Id: "",
        Name: ""
      };
      if (this.notCityIds.indexOf(provinceId) == -1) {
        this.Cities = [];
        this.citiesSeletDis = false;
        var provinceIdData = {
          provinceId: provinceId
        };
        axios("GET", "/getCities", provinceIdData)
          .then(result => {
            if (result.data) {
              this.Cities = result.data;
            }
          })
          .catch(error => {
            this.$alert(error, "提示", { confirmButtonText: "确定" });
          });
      } else {
        this.citiesSeletDis = true;
        this.Cities = [];
      }
    },
    submit() {
      if (this.personalInfo.userId == "") {
        this.open("用户名为必填项！");
        return;
      }
      if (this.personalInfo.userName == "") {
        this.open("昵称为必填项！");
        return;
      }
      if (this.personalInfo.userPassword == "") {
        this.open("密码为必填项，请输入密码！");
        return;
      }
      var formatData = {
        userId: this.personalInfo.userId,
        userPassword: this.personalInfo.userPassword,
        userName: this.personalInfo.userName,
        telNum: this.personalInfo.telNum,
        realName: this.personalInfo.realName,
        userSex: this.personalInfo.userSex,
        userBirthDate: this.personalInfo.userBirthDate,
        userAdrProv: this.personalInfo.userAdrProv,
        userAdrCity: this.personalInfo.userAdrCity,
        action: "modify"
      };
      formatData.userPassword = Crypto.set(formatData.userPassword);
      formatData.userId = Crypto.set(formatData.userId);
      var self = this;
      axios("POST", "/sinup", formatData)
        .then(result => {
          if (result.data == "0") {
            self.dialogFormVisible = false;
            self.open(
              "信息修改成功（由于个浏览器兼容性不一致，如果您的信息显示异常，请刷新重新加载页面！）"
            );
          } else {
            self.open(result.data);
          }
        })
        .catch(error => {
          self.$alert(error, "提示", { confirmButtonText: "确定" });
        });
    },
    getPersonalArticleList() {
      this.$emit("getPersonalArticleList");
    },
    open(msg) {
      this.$alert(msg, "提示", {
        confirmButtonText: "确定"
        // callback: action => {
        //   this.$message({});
        // }
      });
    }
  }
};
</script>

<style scoped>
.copy-right {
  display: block;
  color: black;
  font-size: 1px;
  width: 400px;
  height: 0px;
  text-align: center;
  padding: 20px 400px 0 850px;
}
.name {
  /* margin-top: 20px; */
  float: right;
  margin-right: 100px;
  cursor: pointer;
}
.sinup-btn {
  text-align: right;
}
.form {
  width: 1200px;
  margin-left: 350px;
}
.input {
  width: 240px;
  float: left;
}
.must {
  float: left;
  color: red;
}
</style>

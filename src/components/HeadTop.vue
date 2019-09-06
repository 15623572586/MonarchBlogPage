<template>
  <div>
      <!-- :default-active="activeIndex2" 
      width="1920"-->
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="width:100%"
    >
      <el-menu-item index="博客中心" style="margin-left:40px;">随笔中心</el-menu-item>
      <el-menu-item index="消息中心">消息中心</el-menu-item>
      <el-menu-item index="发表文章">发表随笔</el-menu-item>
        <!-- <a href="# " target="_blank">订单管理</a> -->

      <el-dropdown trigger="click" class="name">
        <span class="el-dropdown-link" style="color:white;">
          <i>您好，{{$store.state.userStatus.userName}}</i>
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item class="clearfix">个人中心</el-dropdown-item>
          <el-dropdown-item class="clearfix" @click.native="getUserInfoList()">用户管理</el-dropdown-item>
          <el-dropdown-item class="clearfix" @click.native="logOut()">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
  </div>
</template>

<script>

export default {
  data() {
    return {
      activeIndex2: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
      this.$emit("showComponent",key)
    },
    getUserInfoList(){
      this.$emit("getUserInfoList");
    },
    logOut(){
      document.cookie = 'userId' + '=;  expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      this.$router.push("/")
    }
  }
};
</script>

<style scoped>
.name {
  margin-top: 20px;
  float: right;
  margin-right: 100px;
  cursor: pointer;
}
</style>

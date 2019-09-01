<template>
  <div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1" style="margin-left:40px;">博客中心</el-menu-item>
      <el-menu-item index="3">消息中心</el-menu-item>
      <el-menu-item index="4">
        <a href="# " target="_blank">订单管理</a>
      </el-menu-item>

      <el-dropdown trigger="click" class="name">
        <span class="el-dropdown-link" style="color:white;">
          <i>您好，{{"张三"}}</i>
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item class="clearfix">个人中心</el-dropdown-item>
          <el-dropdown-item class="clearfix">用户管理</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
  </div>
</template>

<script>
import Login from "@/views/Login.vue";

export default {
  Login,
  data() {
    return {
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
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

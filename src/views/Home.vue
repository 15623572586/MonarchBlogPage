<template>
  <el-container class="page-background">
    <el-row type="flex" class="row-bg" justify="center" style="margin-left:200px;">
      <el-col :span="24">
        <div class="grid-content"></div>
        <el-header>
          <head-top
            ref="head"
            @getUserInfoList="getUserInfoList"
            @showComponent="showComponent"
            class="home"
          ></head-top>
        </el-header>
        <el-container>
          <el-aside width="350px">
            <!-- <i style="color:white">Aside</i> -->
            <calendar></calendar>
            <!-- <left-grid></left-grid> -->
            <left-grid-personal-info
              ref="leftGridPersonalInfo"
              @open="open"
              @showContent="showContent"
              v-show="leftGridPersonalInfoFlag"
            ></left-grid-personal-info>
          </el-aside>
          <el-main>
            <article-list
              ref="articleList"
              @open="open"
              @showContent="showContent"
              @getleftGridPersonalInfo="getleftGridPersonalInfo"
              v-show="articleListFlag"
            ></article-list>
            <article-content @open="open" ref="articleContent" v-show="articleContentFlag"></article-content>
            <quil-editor v-show="publishArticleFlag"></quil-editor>
            <user-management @open="open" ref="userManagement" v-show="userManagementFlag"></user-management>
          </el-main>
        </el-container>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import headTop from "@/components/HeadTop.vue";
import userManagement from "@/components/UserManagement.vue";
import articleList from "@/components/ArticleList.vue";
import articleContent from "@/components/ArticleContent.vue";
import quilEditor from "@/components/QuilEditor.vue";
import calendar from "@/components/Calendar.vue";
import leftGridPersonalInfo from "@/components/LeftGridPersonalInfo.vue";
import leftGrid from "@/components/LeftGrid.vue";

export default {
  components: {
    headTop,
    userManagement,
    articleList,
    articleContent,
    quilEditor,
    calendar,
    leftGridPersonalInfo,
    leftGrid
  },
  data() {
    return {
      articleListFlag: false,
      articleContentFlag: false,
      userManagementFlag: false,
      publishArticleFlag: false,
      leftGridPersonalInfoFlag: false
    };
  },
  methods: {
    getUserInfoList() {
      this.userManagementFlag = true;
      this.publishArticleFlag = this.articleListFlag = this.articleContentFlag = this.leftGridPersonalInfoFlag = false;
      this.$refs["head"].setIndex();
      setTimeout(() => {
        this.$refs.userManagement.getUserInfoList();
      }, 10);
    },
    showComponent(component) {
      if (component == "博客中心") {
        this.publishArticleFlag = this.userManagementFlag = this.leftGridPersonalInfoFlag = this.articleContentFlag = false;
        this.articleListFlag = true;
        this.$refs["articleList"].getArticleList();
      } else if (component == "消息中心") {
        this.publishArticleFlag = this.userManagementFlag = this.leftGridPersonalInfoFlag = this.articleContentFlag = this.articleListFlag = false;
      } else if (component == "发表文章") {
        this.publishArticleFlag = true;
        this.userManagementFlag = this.articleContentFlag = this.leftGridPersonalInfoFlag = this.articleListFlag = false;
      }
    },
    showContent(articleInfo) {
      this.articleContentFlag = this.leftGridPersonalInfoFlag = true;
      this.publishArticleFlag = this.userManagementFlag = this.articleListFlag = false;
      this.$refs["articleContent"].showArticleContent(articleInfo);
    },
    getleftGridPersonalInfo(userId) {
      this.$refs["leftGridPersonalInfo"].getPersonalInfo(userId);
    },

    //弹窗提示内容
    open(msg) {
      this.$alert(msg, "提示", {
        confirmButtonText: "确定"
        // callback: action => {
        //   this.$message({});
        // }
      });
    }
  },
  created: function() {}
};
</script>

<style scoped>
.home {
  width: 1910px;
  text-align: center;
}
.page-background {
  background: url("../assets/01.jpg");
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  /* position: absolute; */
  /* width: 1920px;; */
  width: 100%;
}
</style>
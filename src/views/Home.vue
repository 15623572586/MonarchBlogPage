<template>
  <el-container class="page-background">
    <el-row type="flex" class="row-bg" justify="center" style="margin: 0px auto 0px auto;">
    <!-- <el-row type="flex" class="row-bg" justify="center" style="margin-left:200px;"> -->
      <el-col :span="24">
        <div class="grid-content"></div>
        <el-header>
          <head-top
            ref="head"
            @open="open"
            @getUserInfoList="getUserInfoList"
            @getPersonalArticleList="getPersonalArticleList"
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
            <quil-editor v-show="publishArticleFlag" @showComponent="showComponent"></quil-editor>
            <user-management @open="open" ref="userManagement" v-show="userManagementFlag"></user-management>
          </el-main>
        </el-container>
      </el-col>
      <!-- <el-footer class="footer"><i>Copyright© 2019 YuYunHu AllRightsReserved.
        鄂 ICP备19023983号</i> </el-footer> -->
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

export default {
  components: {
    headTop,
    userManagement,
    articleList,
    articleContent,
    quilEditor,
    calendar,
    leftGridPersonalInfo,
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
  mounted: function() {
    this.showComponent("博客中心");
  },
  methods: {
    getPersonalArticleList() {
      this.flagToFalse();
      this.articleListFlag = true;
      this.$refs["articleList"].getPersonalArticleList();
    },
    getUserInfoList() {
      this.flagToFalse();
      this.userManagementFlag = true;
      this.$refs["head"].setIndex();
      setTimeout(() => {
        this.$refs.userManagement.getUserInfoList();
      }, 10);
    },
    showComponent(component) {
      if (component == "博客中心") {
        this.flagToFalse();
        this.articleListFlag = true;
        this.$refs["articleList"].getArticleList();
      } else if (component == "消息中心") {
        this.flagToFalse();
      } else if (component == "发表文章") {
        this.flagToFalse();
        this.publishArticleFlag = true;
      }
    },
    showContent(articleInfo) {
      this.flagToFalse();
      this.articleContentFlag = this.leftGridPersonalInfoFlag = true;
      this.$refs["articleContent"].showArticleContent(articleInfo);
    },
    getleftGridPersonalInfo(userId) {
      this.$refs["leftGridPersonalInfo"].getPersonalInfo(userId);
    },
    flagToFalse() {
      this.articleListFlag = false;
      this.articleContentFlag = false;
      this.userManagementFlag = false;
      this.publishArticleFlag = false;
      this.leftGridPersonalInfoFlag = false;
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
  }
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
  margin: 0px auto 0px auto;
  /* margin: auto; */
}
.footer{
  color: white;
  float: left;
  position: absolute;
  margin-top: 1160px;
}
</style>
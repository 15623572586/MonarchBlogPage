<template>
  <div>
    <div class="article-list">
      <div class="list">
        <div v-for="(item,index) in articleList" :key="index">
          <div class="link">
            <el-link @click="showContent(item)">
              <li class="link-i">{{item.title}}</li>
            </el-link>
          </div>
          <div class="date-label">
            <i class="date-show">{{item.createTime}}</i>
          </div>
          <div class="read-log">
            <i class="read-show">阅读:{{item.readCount+" "}}点赞:{{item.surportCount+" "}}</i>
          </div>
        </div>
      </div>

      <div class="page">
        <label style="color:white;float:left;">共 {{total}} 条</label>
        <el-pagination
          style="float:left;"
          background
          layout="prev, pager, next"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          :total="total"
          @current-change="currentPageChange()"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axiosConfig.js";
export default {
  data: function() {
    return {
      articleList: [],
      totalArticleList: [],
      currentPage: 1,
      pageSize: 20,
      total: 0
    };
  },
  methods: {
    currentPageChange() {
      this.displayList();
    },
    displayList() {
      this.articleList = [];
      var start = (this.currentPage - 1) * this.pageSize;
      var end = start + this.pageSize;
      for (
        let index = start;
        index < end && this.totalArticleList[index] != null;
        index++
      ) {
        this.articleList.push(this.totalArticleList[index]);
      }
    },
    getArticleList() {
      axios("GET", "/getArticleList", null)
        .then(result => {
          if (result.data.error != null || result.data.error != undefined) {
            this.$emit("open", result.data.error);
          } else {
            // this.articleList = result.data.articleList;
            this.totalArticleList = result.data.articleList;
            this.total = result.data.total;
            this.displayList();
          }
        })
        .catch(error => {
          this.$emit("open", error);
        });
    },
    getPersonalArticleList() {
      var userId = this.$store.state.userStatus.userId;
      axios("GET", "/getArticleList", { userId: userId })
        .then(result => {
          if (result.data.error != null || result.data.error != undefined) {
            this.$emit("open", result.data.error);
          } else {
            this.articleList = result.data.articleList;
            this.total = result.data.total;
          }
        })
        .catch(error => {
          this.$emit("open", error);
        });
    },
    showContent(articleInfo) {
      axios("POST", "/modifyReadCount", articleInfo)
        .then(result => {
          if (result.data.status == "0") {
            articleInfo.readCount = result.data.readCount;
            this.$emit("showContent", articleInfo);
            this.$emit("getleftGridPersonalInfo", articleInfo.userId);
          } else {
            this.$emit("open", result.data.msg);
            console.log(result.data.msg);
          }
        })
        .catch(error => {
          this.$emit("open","查看文章时出错："+error);
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.article-list {
  background: url("../assets/05.jpg");
  background: rgba(255, 255, 255, 0.2);
  padding: 100px 20px 0 20px;
  width: 1520px;
  height: 1000px;
  line-height: 40px;
}
.list {
  height: 820px;
  width: 1500px;
  /* background-color: darkgrey */
}
.link {
  width: 1200px;
  float: left;
  text-align: left;
}
.link-i {
  color: white;
  font-size: 20px;
  width: 1200px;
  float: left;
}
.date-label {
  width: 180px;
  float: left;
}
.date-show {
  width: 180px;
  color: white;
}
.read-log {
  width: 120px;
  float: left;
}
.read-show {
  font-size: 6px;
  color: white;
}
.page {
  float: left;
  padding-top: 50px;
  padding-left: 620px;
}
</style>
<template>
  <div>
    <div class="article-content">
      <div class="content">
        <div class="content-head">
          <b class="content-title">{{title}}</b>
          <i class="content-i">{{"作者:"+author+" 阅读:"+readCount+" 点赞:"+surportCount+" "+createTime}}</i>
        </div>
        <div class="content-main">
          <div class="ql-container ql-snow">
            <div class="ql-editor" v-html="content" style="color:white">
              <!-- <Xqs class="details_box" > </Xqs> -->
            </div>
          </div>
        </div>
        <div class="content-foot">
          <div class="surport" @click="surport()">
            <i>顶一下</i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axiosConfig.js";
export default {
  data: function() {
    return {
      articleId: "",
      title: "",
      content: "",
      author: "",
      createTime: "",
      readCount: "0",
      surportCount: "30"
    };
  },
  methods: {
    showArticleContent(articleInfo) {
      this.articleId = articleInfo.articleId;
      this.title = articleInfo.title;
      this.content = articleInfo.content;
      this.createTime = articleInfo.createTime;
      this.readCount = articleInfo.readCount;
      // this.surportCount = articleInfo.surportCount;
      if (articleInfo.userId != "" && articleInfo.userId != null) {
        var userIdData = {
          userId: articleInfo.userId
        };
        axios("GET", "/getOneUserInfo", userIdData)
          .then(result => {
            if (result.data.error != null || result.data.error != undefined) {
              this.$emit("open", result.data.error);
            } else {
              this.author = result.data.userName;
            }
          })
          .catch(error => {
            this.$emit("open", error.data);
          });
      }
    },
    surport(){
      let surportMap = {
        userId : "Upg+Fey49QiH+fzrejvTZg==",
        // userId : this.$store.state.userStatus.userId,
        articleId : this.articleId,
      }
      axios("POST","/surportArticle",surportMap)
      .then(result=>{
        let res = result.data;
        if(res.status=="0"){
          this.$message("点赞成功！");
        }else{
          this.$message(res.msg);
        }
      })
      .catch(error=>{
        this.$emit("open",error.data);
      })
    }
  }
};
</script>

<style scoped>
.article-content {
  background: url("../assets/05.jpg");
  background: rgba(255, 255, 255, 0.2);
  padding: 10px 20px 0 20px;
  width: 1520px;
  height: 1100px;
  line-height: 40px;
}
.content {
  height: 820px;
  /* background: yellow; */
}
.content-head {
  line-height: 50px;
  /* background: yellowgreen; */
}
.content-title {
  text-align: center;
  font-size: 24px;
  color: aliceblue;
}
.content-i {
  font-size: 6px;
  float: right;
  color: wheat;
}
.content-main {
  height: 920px;
  text-align: left;
  /* background-color: darkgray; */
}
.content-text {
  color: white;
  font-size: 20px;
}
.content-foot{
  height: 95px;
  padding: 6px 30px;
  /* background-color: silver; */
}
.content-foot .surport{
  /* background-color: brown; */
  cursor: pointer;
  float: left;
  color: aqua;
}
</style>
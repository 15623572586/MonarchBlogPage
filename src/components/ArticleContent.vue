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
    <el-dialog title="用户登录" append-to-body :visible.sync="loginDialog" class="dialog">
      <el-form :model="loginForm">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input
            class="login-input"
            v-model="loginForm.userId"
            autocomplete="off"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input class="login-input" v-model="loginForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="loginDialog = false">取 消</el-button>
        <el-button type="primary" @click="login()">登 录</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "@/axiosConfig.js";
import Crypto from "@/crypto.js";
import store from "@/store.js";
export default {
  data: function() {
    return {
      articleId: "",
      title: "",
      content: "",
      author: "",
      createTime: "",
      readCount: "0",
      surportCount: "0",
      loginDialog: false,
      loginForm: {
        userId: "",
        password: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    showArticleContent(articleInfo) {
      this.articleId = articleInfo.articleId;
      this.title = articleInfo.title;
      this.content = articleInfo.content;
      this.createTime = articleInfo.createTime;
      this.readCount = articleInfo.readCount;
      this.surportCount = articleInfo.surportCount;
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
    surport() {
      let loginStatus = this.$store.state.loginStatus;
      if (!loginStatus) {
        this.loginDialog = true;
      } else {
        let surportMap = {
          // userId : "Upg+Fey49QiH+fzrejvTZg==",
          userId: this.$store.state.userStatus.userId,
          articleId: this.articleId
        };
        axios("POST", "/surportArticle", surportMap)
          .then(result => {
            let res = result.data;
            if (res.status == "0") {
              this.surportCount = res.surportCount;
              this.$message("点赞成功！");
            } else {
              this.$message(res.msg);
            }
          })
          .catch(error => {
            this.$emit("open", error.data);
          });
      }
    },
    login() {
      var self = this;
      var loginData = {
        loginName: Crypto.set(self.loginForm.userId),
        password: Crypto.set(self.loginForm.password)
      };
      axios("POST", "/login", loginData)
        .then(result => {
          if (result.data.error == null) {
            store.commit("setUserStatus", result.data.userInfo);
            document.cookie = "userId=" + Crypto.get(result.data.userInfo.userId);
            this.loginDialog = false;
          } else {
            self.$emit("open",result.data.error);
          }
        })
        .catch(error => {
          self.$alert(error, "提示", { confirmButtonText: "确定" });
        });
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
.content-foot {
  height: 95px;
  padding: 6px 30px;
  /* background-color: silver; */
}
.content-foot .surport {
  /* background-color: brown; */
  cursor: pointer;
  float: left;
  color: aqua;
  font-size: 24px;
}
.dialog {
  width: 900px;
  margin-left: 700px;
  margin-top: 200px;
  /* background-color: blanchedalmond; */
}
.dialog el-form {
  background-color: aquamarine;
}
.login-input {
  width: 240px;
}
</style>
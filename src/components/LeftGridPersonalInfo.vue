<template>
  <div class="info-out">
    <div class="info-in">
      <div class="personal-info">
        <div class="title-X">
          <label>-------------【 了解笔者 】---------------</label>
        </div>
        <div class="info">
          <i>博主：{{personalInfo.userName}}</i>
        </div>
        <div class="info">
          <i>博龄：{{personalInfo.blogAge}}年</i>
        </div>
        <div class="info">
          <i>生日：{{personalInfo.birthDay}}</i>
        </div>
        <div class="info">
          <i>随笔：{{personalInfo.blogCount}}篇</i>
        </div>
      </div>
      <div class="article-list">
        <div class="title-X">
          <label>-------------【 他的随笔 】---------------</label>
        </div>
        <div v-for="(item,index) in displayList" :key="index">
        <!-- <div v-for="(item,index) in personalInfo.articleList" :key="index"> -->
          <el-link @click="showContent(item)" :underline="false">
            <li class="title">{{item.title}}</li>
          </el-link>
        </div>
      </div>
			<div class="pager-back" v-show="total>20">
				<el-pagination
					small
          background
					layout="prev, pager, next"
					:current-page.sync="currentPage"
          :page-size="pageSize"
					:total="total"
					@current-change="currentPageChange()"
					class="pager"
					>
				</el-pagination>
			</div>
    </div>
  </div>
</template>
<script>
import axios from "@/axiosConfig.js";
export default {
  data: function() {
    return {
      personalInfo: {
        userName: "",
        blogAge: "",
        birthDay: "",
        blogCount: "",
        articleList: [],
      },
			displayList:[],
			currentPage:1,
			pageSize:20,
			total: 0
    };
  },
  methods: {
		currentPageChange(){
			this.setDisplayList();
		},
		setDisplayList(){
			this.total = this.personalInfo.articleList.length;
			this.displayList = [];
			var start = (this.currentPage-1)*this.pageSize;
			var end = start+this.pageSize;
			for (let index = start; index < end && this.personalInfo.articleList[index]!=null; index++) {
				this.displayList.push(this.personalInfo.articleList[index]);
			}
		},
    getPersonalInfo(userId) {
      axios("GET", "/getUserInfoAndArticle", { userId: userId })
        .then(res => {
          if (res.data.error == null) {
						this.personalInfo = res.data;
						this.setDisplayList();
          } else {
            this.$emit("open", res.data.error);
          }
        })
        .catch(error => {
          this.$emit("open", "获取笔者信息和文章列表时出错！");
        });
    },
    showContent(articleInfo) {
      this.$emit("showContent", articleInfo);
    }
  }
};
</script>
<style scoped>
.info-out {
  padding: 20px;
}
.info-in {
  padding: 10px;
  color: aquamarine;
  background: rgba(255, 255, 255, 0.1);
  text-align: left;
	height: 770px;
  line-height: 26px;
}
.title {
  color: aquamarine;
}
.title-X {
  color: aqua;
}
.personal-info {
	height: 130px;
  width: 100%;
}
.article-list{
	height: 560px;
  width: 100%;
}
.info {
  margin-left: 20px;
}
.pager-back{
	height: 86px;
  width: 100%;
}
.pager{
	padding: 20px 0 0 50px;
}
</style>
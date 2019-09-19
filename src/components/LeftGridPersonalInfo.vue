<template>
  <div class="info-out">
    <div class="info-in">
      <div class="personal-info">
				<div class="title-X">
					<label>----------------【 了解笔者 】------------------</label>
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
					<label >----------------【 他的随笔 】------------------</label>
				</div>
				<div v-for="(item,index) in personalInfo.articleList" :key="index">
					<el-link @click="showContent(item)" :underline="false">
						<li class="title">{{item.title}}</li>
					</el-link>
				</div>
			</div>
    </div>
  </div>
</template>
<script>
import axios from "@/axiosConfig.js";
export default {
  data: function() {
		return{
			personalInfo:{
				userName:"",
				blogAge:"",
				birthDay:"",
				blogCount:"",
				articleList:[],
			}
		}
	},
	methods:{
		getPersonalInfo(userId){
			axios("GET","/getUserInfoAndArticle",{userId:userId})
			.then(res=>{
				if(res.data.error==null){
					this.personalInfo = res.data;
				}else{
					this.$emit("open",res.data.error);
				}
			})
			.catch(error=>{
				this.$emit("open","获取笔者信息和文章列表时出错！");
			})
		},
		showContent(articleInfo){
			this.$emit("showContent",articleInfo);
			// this.$emit("getleftGridPersonalInfo",articleInfo.userId);
		},
	}

};
</script>
<style scoped>
.info-out {
  padding: 20px;
}
.info-in {
  padding: 10px;
  /* background:skyblue; */
  color: aquamarine;
  background: rgba(255, 255, 255, 0.1);
  text-align: left;
  max-height: 770px;
  line-height: 26px;
}
.title {
	color: aquamarine;
}
.title-X{
	color: aqua
}
.personal-info {
  width: 100%;
}
.info{
	margin-left: 20px;
}
</style>
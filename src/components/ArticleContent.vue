<template>
  <div>
		<div class="article-content">
			<div class="content">
				<div class="content-head">
					<b class="content-title">{{title}}</b>
					<i class="content-i">{{"作者:"+author+" 阅读:"+readCount+" 点赞:"+surportCount+" "+createTime}} </i>
				</div>
				<div class="content-main">
					<div class="ql-container ql-snow">
						<div class="ql-editor" v-html="content" style="color:white">
							<!-- <Xqs class="details_box" > </Xqs> -->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "@/axiosConfig.js"
export default {
  data: function() {
    return {
			title:"",
			content:"",
			author:"",
			createTime:"",
			readCount:"20",
			surportCount:"30",
		};
	},
	methods:{
		showArticleContent(articleInfo){
			this.title = articleInfo.title;
			this.content = articleInfo.content;
			this.createTime = articleInfo.createTime
			// this.readCount = articleInfo.readCount;
			// this.surportCount = articleInfo.surportCount;
			if(articleInfo.userId!="" && articleInfo.userId!=null){
				var userIdData = {
					userId : articleInfo.userId,
				}
				axios("GET","/getOneUserInfo",userIdData)
				.then(result=>{
					if(result.data.error!=null || result.data.error!=undefined){
						this.$emit("open",result.data.error);
					}else{
						this.author = result.data.userName;
					}
				})
				.catch(error=>{
					this.$emit("open",error.data)
				})
			}
		},
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
.content{
	height: 820px;
	/* background: yellow; */
}
.content-head{
	line-height: 50px;
	/* background: yellowgreen; */
}
.content-title{
	text-align: center;
	font-size: 24px;
	color: aliceblue
}
.content-i{
	font-size: 6px;
	float: right;
	color: wheat
}
.content-main{
	height: 920px;
	text-align: left;
	/* background: yellow; */
}
.content-text{
	color: white;
	font-size: 20px;
}
</style>
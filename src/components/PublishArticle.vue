<template>
  <div style="">
		<el-row>
			<el-col :span="18">
				<div class="grid-content bg-purple-dark"></div>
				<el-card class="box-card" style="">
					<div slot="header" class="clearfix">
						<!-- <span style="float:left">文章标题</span> -->
						<el-input v-model="article.title" placeholder="请输入文章标题" clearable class="title-input"></el-input>
						<el-button style="float: right; padding: 3px 0" type="text" @click="cleanContent()">内容清空</el-button>
					</div>
					<div class="content">
						<el-input v-model="article.content" type="textarea" :rows="33" placeholder="请输入内容" clearable class="content-input"> </el-input>
					</div>
					<el-button type="primary" round @click="saveContent()">提交</el-button>
				</el-card>
			</el-col>
		</el-row>
    
  </div>
</template>

<script>
import axios from '@/axiosConfig.js'
export default {
	data:function(){
		return {
			article:{
				title:"",
				content:"",
				label:[],
			},
		}
	},
	methods:{
		cleanContent(){
			this.article.content = "";
		},
		saveContent(){
			var articleData = {
				userId : this.$store.state.userStatus.userId,
				title : this.article.title,
				content : this.article.content,
			};
			axios("POST","/saveArticle",articleData)
			.then(result=>{
				if(result.data=="0"){
					this.$message('文章发表成功！');
				}else if(result.data=="1"){
					this.$message('文章发表失败！');
				}
			})
			.catch(error=>{
				this.$emit("open","来自发表文章时的错误:"+error);
			})
		}
	}
}
</script>

<style scoped>
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.clearfix{
	height: 40px;
}
.clearfix:after {
  clear: both;
}
.box-card {
  width: 1520px;
  background: url("../assets/03.jpg");
}
.title-input{
	width:500px;
}
.content{
	height: 900px;
}
.content-input{
	height: 850px;
	/* color:#000000;
	font-size: 20px; */
}
</style>
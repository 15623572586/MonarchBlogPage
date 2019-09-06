<template>
	<el-container class="page-background">
		<el-row type="flex" class="row-bg" justify="center" style="margin-left:200px;">
			<el-col :span="24"><div class="grid-content"></div>
				<el-header>
					<head-top class="home" @getUserInfoList="getUserInfoList" @showComponent="showComponent"></head-top>
				</el-header>
				<el-container>
					<el-aside width="340px"><i style="color:white">Aside</i></el-aside>
					<el-main>
						<article-list @open="open" @showContent="showContent" ref="articleList" v-show="articleListFlag"></article-list>
						<article-content  @open="open" ref="articleContent" v-show="articleContentFlag" ></article-content>
						<publish-article @open="open" ref="publishArticle" v-show="publishArticleFlag"></publish-article>
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
import publishArticle from "@/components/PublishArticle.vue"
import articleList from "@/components/ArticleList.vue"
import articleContent from "@/components/ArticleContent.vue"

export default {
	components:{
		headTop,
		userManagement,
		publishArticle,
		articleList,
		articleContent,
	},
	data(){
		return{
			articleListFlag:false,
			articleContentFlag:false,
			userManagementFlag:false,
			publishArticleFlag:false,
		}
	},
	methods:{
		getUserInfoList(){
			this.userManagementFlag = true;
			this.publishArticleFlag = this.articleListFlag = this.articleContentFlag = false;
			setTimeout(() => {
				this.$refs.userManagement.getUserInfoList();
			}, 10);
		},
		showComponent(component){
			if(component=="博客中心"){
				this.publishArticleFlag = this.userManagementFlag = this.articleContentFlag = false;
				this.articleListFlag = true;
				this.$refs["articleList"].getArticleList();
			}else if(component=="消息中心"){
				this.publishArticleFlag = this.userManagementFlag = this.articleContentFlag = this.articleListFlag = false;
			}else if(component=="发表文章"){
				this.publishArticleFlag = true;
				this.userManagementFlag = this.articleContentFlag = this.articleListFlag = false;
			}
		},
		showContent(articleInfo){
			this.articleContentFlag = true;
			this.publishArticleFlag = this.userManagementFlag = this.articleListFlag = false;
			this.$refs["articleContent"].showArticleContent(articleInfo);
		},
		
		//弹窗提示内容
		open(msg) {
			this.$alert(msg, "提示", {
				confirmButtonText: "确定",
				// callback: action => {
				//   this.$message({});
				// }
			})
		}
	},
	created:function(){
		
	}
};
</script>

<style scoped>
.home{
	width:1910px;
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
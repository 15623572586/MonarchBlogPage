<template>
  <div>
    <div class="article-list">
			<div class="list">
				<!-- <div v-for="index in 20 " :key="index">
					<div class="link">
						<el-link>
							<li class="link-i">item.title</li>
						</el-link>
					</div>
				</div> -->
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
						<i class="read-show">阅读:{{"20 "}}评论:{{"30"}}</i>
					</div>
				</div>
			</div>
      
      <div class="page">
        <label style="color:white;float:left;">共 {{total}} 条</label>
        <el-pagination
          style="float:left;"
          background
          layout="prev, pager, next"
          :page-size="20"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axiosConfig.js"
export default {
  data: function() {
    return {
			articleList: [],
			total: 0,

		};
  },
  methods: {
		getArticleList(){
			axios("GET","/getArticleList",null)
			.then(result=>{
				if(result.data.error!=null || result.data.error!=undefined){
					this.$emit("open",result.data.error)
				}else{
					this.articleList = result.data.articleList;
					this.total = result.data.total;	
				}
			})
			.catch(error=>{
				this.$emit("open",error.data);
			})
		},
		showContent(articleInfo){
			this.$emit("showContent",articleInfo);
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
.list{
	height: 820px;
	/* background: yellow; */
}
.link {
  width: 1200px;
  float: left;
  text-align: left;
}
.link-i {
  color: white;
  font-size: 20px;
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
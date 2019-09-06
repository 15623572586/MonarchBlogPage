<template>
	<div>
		<div class="article-list">
			<div v-for="i in 20" :key="i">
				<div class="link">
					<el-link>
						<li class="link-i">有下划线有下划线有下划线有下划线有下划线有下划线有下划线有下划线有下划线</li>
					</el-link>
				</div>
				<div class="date-label">
					<i class="date-show">2019-02-25 19:26</i>
				</div>
				<div class="read-log">
					<i class="read-show">阅读:{{"20 "}}评论:{{"30"}}</i>
				</div>
			</div>
			<div class="page" >
				<label style="color:white;float:left;">共 100 条 </label>
				<el-pagination style="float:left;" background layout="prev, pager, next" :page-size="20" :total="100"></el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  data: function() {
		return{

		}
	},
  methods: {}
};
</script>

<style scoped>
.article-list{
  background: url("../assets/05.jpg");
	background:rgba(255,255,255,0.2);
	padding: 100px 20px 0 20px;
  width: 1520px;
	height: 1000px;
	line-height: 40px;
}
.link{
	width: 1200px;
	float:left;
	text-align: left;	
}
.link-i{
	color:white;
	font-size:20px;
	float:left;
}
.date-label{
	width: 180px;
	float: left;
}
.date-show{
	width: 180px;
	color: white;
}
.read-log{
	width: 120px;	
	float: left;
}
.read-show{
	font-size: 6px;
	color: white
}
.page{
	float: left;
	padding-top: 100px;
	padding-left: 380px;
}
</style>
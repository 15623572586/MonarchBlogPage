<template>
	<el-container class="page-background">
		<el-header>
			<home class="home"></home>
		</el-header>
		<el-container>
			<el-aside width="340px">Aside</el-aside>
			<el-main>
				<user-management></user-management>
			</el-main>
		</el-container>
	</el-container>
  <!-- <div>
    <div class="page-background">
			<home class="home"></home>
			<user-management></user-management>
		</div>
  </div> -->
</template>

<script>
import home from "@/components/HeadTop.vue";
import userManagement from "@/components/UserManagement.vue";

export default {
	components:{
		home,
		userManagement,
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
  width: 100%;
}
</style>
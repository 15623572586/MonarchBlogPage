<template>
	<el-container class="page-background">
		<el-row type="flex" class="row-bg" justify="center">
			<el-col :span="18"><div class="grid-content"></div>
				<el-header>
					<head-top class="home" @getUserInfoList="getUserInfoList"></head-top>
				</el-header>
				<el-container>
					<el-aside width="340px"><i style="color:white">Aside</i></el-aside>
					<el-main>
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

export default {
	components:{
		headTop,
		userManagement,
	},
	data(){
		return{
			userManagementFlag:false,
		}
	},
	methods:{
		getUserInfoList(){
			this.userManagementFlag = true;
			setTimeout(() => {
				this.$refs.userManagement.getUserInfoList();
			}, 10)
			
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
  /* width: 1920px;; */
  width: 100%;
}
</style>
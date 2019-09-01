<template>
  <div >
    <el-table  class="page-background"
      :data="userInfo"
      style="width: 80%;text-align:center;"
			size="mini"
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column prop="date" label="用户名" width="140" style="text-align:center;width:120px;"></el-table-column>
      <el-table-column prop="name" label="昵称" ></el-table-column>
      <el-table-column prop="address" label="姓名" ></el-table-column>
      <el-table-column prop="address" sortable label="注册日期" ></el-table-column>
      <el-table-column prop="address" label="联系方式" ></el-table-column>
      <el-table-column prop="address" label="所在城市" ></el-table-column>
      <el-table-column prop="address" label="生日"></el-table-column>
			<el-table-column prop="address" label="操作">
				<template>
				<!-- <template slot-scope="scope"> -->
					<el-button
						type="text"
						size="small">
						移除
					</el-button>
				</template>
			</el-table-column>
    </el-table>
  </div>
</template>

<style scoped>

.page-background {
  background: url("../assets/03.jpg");
  background-size: 100% 100%;
  position: fixed;
  width: 100%;
}
</style>
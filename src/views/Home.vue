<template>
  <el-container style="height: 100%">
    <!--  头部  -->
    <el-header style="background-color: #B3C0D1">
      <el-row :gutter="10">
        <el-col :span="4"  style="display: flex; align-items: center; justify-content: space-between">
          <img alt="" src="../assets/dormitory.png" height="30">
          <h3 style="font-weight: 500; font-family: 'Avenir', Helvetica, Arial, sans-serif">宿舍信息管理系统</h3>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!--  侧边栏   -->
      <el-aside width="200px" style="background-color: #D3DCE6">
        <el-menu class="el-menu-demo" style="background-color: #D3DCE6" :default-active="this.$route.path" router>
          <el-menu-item index="/home/dormManagement"><i class="el-icon-monitor" style="margin-right: 10px"></i>宿舍管理</el-menu-item>
          <el-menu-item index="/home/dormInfo"><i class="el-icon-message" style="margin-right: 10px"></i>宿舍信息</el-menu-item>
          <el-menu-item index="/home/systemConfig"><i class="el-icon-setting" style="margin-right: 10px"></i>系统设置</el-menu-item>
        </el-menu>
        <el-button type="primary" @click="logOut()" style="margin-top: 20px; margin-left: 20px; background-color: #70a1ff">退出登录</el-button>
      </el-aside>
      <!--   主题区域   -->
      <el-main style="background-color: #eee">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    logOut () {
      this.$confirm('该操作将退出登录，是否确定？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('token')
        this.$router.push('/')
      })
    }
  }
}
</script>

<style>

</style>

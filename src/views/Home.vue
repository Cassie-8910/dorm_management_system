<template>
  <el-container style="height: 100%">
    <!--  头部  -->
    <el-header style="background-color: #B3C0D1">
      <el-row :gutter="10">
        <el-col :span="10"  style="display: flex; align-items: center; justify-content: space-around">
          <img src="../assets/dormitory.png" height="30">
          <h3 style="font-weight: 500; font-family: 'Avenir', Helvetica, Arial, sans-serif">宿舍信息管理系统</h3>
          <el-input v-model="searchStr" placeholder="查询学生信息" style="width: 50%">
            <el-button type="primary" slot="append" icon="el-icon-search">查询</el-button>
          </el-input>
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
  data () {
    return {
      searchStr: ''
    }
  },
  methods: {

  }
}
</script>

<style>

</style>

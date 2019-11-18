<template>
  <div id="app">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :router="true">
            <el-submenu :index="v.name" v-for="(v,i) in userList" :key="i" >
              <template slot="title">
                <i class="el-icon-s-unfold"></i>
                {{v.name}}
              </template>
              <el-menu-item :index="v1.router" v-for="(v1,i1) in v.childs" :key="i1" >
                <i class="el-icon-s-promotion"></i>
                {{v1.names}}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userList:[]
    }
  },
  methods: {
    getUserList(){
      this.$axios.get("/getUserList").then(res=>{
        console.log(res);
        this.userList = res.data
      })
    }
  },
  created() {
    this.getUserList()
  },
}
</script>
<style>
</style>

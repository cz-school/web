<template>
  <div class="userList">
    <el-row>
         <el-col :span="3">
        <el-input v-model.number="addRouter.username" placeholder="人员名字"></el-input>
      </el-col>
      <el-col :span="3">
        <el-input v-model.number="addRouter.childs" placeholder="路由名字"></el-input>
      </el-col>
      <el-col :span="3">
        <el-input v-model.number="addRouter.router" placeholder="路由地址"></el-input>
      </el-col>
      <el-col :span="3">
          <el-button @click="addRouters">添加</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column>
        <template scope="solt">
          <el-tag
            :key="i"
            v-for="(v,i) in solt.row.childs"
            closable
            :disable-transitions="false"
            @close="delTag(v.id)"
          >{{v}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      inputVisible: false,
      inputValue: "",
      addRouter: {
          username:"",
          childs:"",
          router:""
      }
    };
  },
  methods: {
    getList() {
      this.$axios.get("/getUserList").then(res => {
        this.tableData = res.data;
      });
    },
    delTag(id){
         this.$confirm('此操作将永久删除此路由?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$axios.delete('/getUserList/'+id).then(res=>{
                if(res.data.code == 200){
                this.getList()
                }
            })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    addRouters(){
        this.$axios.post("/getUserList",this.addRouter).then(res=>{
            console.log(res);
            
            if(res.data.code == 200){
                this.$message.success("添加成功")
                this.getList()
            }
        })
    }
  },
  created() {
    this.getList();
  }
};
</script>
<style>
    .userList .el-tag{
        margin-right: 5px;
    }
</style>
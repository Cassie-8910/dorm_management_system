<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = !dialogFormVisible" style="margin-bottom: 10px; background-color: #70a1ff">添加学生信息</el-button>
    <!--  添加学生信息弹窗  -->
    <el-dialog title="添加学生" :visible.sync="dialogFormVisible">
      <el-form :model="newStuForm" label-width="80px" :rules="rules">
        <el-form-item label="学号" prop="stuNum">
          <el-input v-model="newStuForm.stuNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="newStuForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="newStuForm.gender" placeholder="请选择性别">
            <el-option label="女" value="女"></el-option>
            <el-option label="男" value="男"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="宿舍号" prop="dormNum">
          <el-input v-model="newStuForm.dormNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学院" prop="academy" placeholder="请输入学院简写">
          <el-input v-model="newStuForm.academy" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="major" placeholder="请输入专业">
          <el-input v-model="newStuForm.major" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="className" aria-placeholder="请输入班级名">
          <el-input v-model="newStuForm.className" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewStudent">添 加</el-button>
      </div>
    </el-dialog>
    <!-- 学生宿舍信息表格   -->
    <el-table
      :data="tableData"
      border
      stripe="true"
      style="width: 100%">
      <el-table-column
        prop="stuNum"
        label="学号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="gender"
        label="性别"
        width="120">
      </el-table-column>
      <el-table-column
        prop="dormNum"
        label="宿舍号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="academy"
        label="学院"
        width="120">
      </el-table-column>
      <el-table-column
        prop="major"
        label="专业"
        width="160">
      </el-table-column>
      <el-table-column
        prop="className"
        label="班级"
        width="120">
      </el-table-column>
      <el-table-column
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'DormManagement',
  data () {
    const validateDormNum = (rule, value, cb) => {
      console.log('进入验证宿舍号')
      const regularVal = /^(\d{1,2}-\d{3})$/
      if (value === '') {
        cb(new Error('请输入宿舍号'))
      } else if (!regularVal.test(value)) {
        cb(new Error('宿舍号必须是xx-xxx的形式'))
      } else {
        cb()
      }
    }
    return {
      dialogFormVisible: false,
      tableData: [],
      newStuForm: {
        stuNum: '',
        name: '',
        gender: '',
        dormNum: '',
        academy: '',
        major: '',
        className: ''
      },
      rules: {
        stuNum: [
          {
            required: true,
            message: '请输入学号',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }
        ],
        gender: [
          {
            required: true,
            message: '请选择性别',
            trigger: 'change'
          }
        ],
        dormNum: [
          {
            validator: validateDormNum,
            trigger: 'blur'
          }
        ],
        academy: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入学院简写'
          }
        ],
        major: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入专业'
          }
        ],
        className: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入班级'
          }
        ]
      }
    }
  },
  mounted () {
    //
  },
  methods: {
    addNewStudent () {
      if (this.newStuForm.stuNum && this.newStuForm.name && this.newStuForm.gender && this.newStuForm.dormNum && this.newStuForm.academy && this.newStuForm.major && this.newStuForm.className) {
        this.$confirm('该操作将添加一个学生数据，是否确定？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          //  const url = http://localhost:8080/DormManagementSystem/addNewStu
          const url = 'http://localhost:8080/DormManagementSystem/addNewStu'
          fetch(url, {
            method: 'post',
            mode: 'no-cors',
            body: `stuNum=${this.newStuForm.stuNum}&${this.newStuForm.name}&${this.newStuForm.gender}&${this.newStuForm.dormNum}&${this.newStuForm.academy}&${this.newStuForm.major}${this.newStuForm.className}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          }).then(rs => {
            if (rs.status === 200) {
              // 响应成功 json() 方法返回Promise对象 其值被下一个 then 方法接受
              console.log(rs)
              return rs.json()
            } else {
              console.error(rs.status)
            }
          }).then(rs => {
            window.console.log('rs:', rs)
            // this.tableData = rs.data.data
            this.$message.success('添加成功')
          })
        })
        this.dialogFormVisible = false
      } else {
        this.$message.warning('信息不全，请完善后再添加')
      }
    }
  }
}
</script>

<style>

</style>

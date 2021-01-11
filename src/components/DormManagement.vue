<template>
  <div>
    <el-button type="primary" @click="addDialogFormVisible = !addDialogFormVisible"
               style="margin-bottom: 10px; margin-right: 20px; background-color: #70a1ff">添加学生信息
    </el-button>
    <el-dropdown @command="handleCommand">
      <el-button type="primary" style="background-color: #70a1ff">
        {{queryMethod}}<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="stuNum">学号</el-dropdown-item>
        <el-dropdown-item command="name">姓名</el-dropdown-item>
        <el-dropdown-item command="dormNum">宿舍号</el-dropdown-item>
        <el-dropdown-item command="className">班级</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-input v-model="searchStr" placeholder="查询学生信息" style="width: 50%">
      <el-button type="primary" slot="append" icon="el-icon-search" @click="queryInfo()">查询</el-button>
    </el-input>
    <!--  添加学生信息弹窗  -->
    <el-dialog title="添加学生" :visible.sync="addDialogFormVisible">
      <el-form :model="newStuForm" label-width="80px" :rules="rules">
        <el-form-item label="学号" prop="stuNum">
          <el-input v-model="newStuForm.stuNum" autocomplete="off" placeholder="请输入学号"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="newStuForm.name" autocomplete="off" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="newStuForm.gender" placeholder="请选择性别">
            <el-option label="女" value="女"></el-option>
            <el-option label="男" value="男"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="宿舍号" prop="dormNum">
          <el-input v-model="newStuForm.dormNum" autocomplete="off" placeholder="例：1b-223/11-223"></el-input>
        </el-form-item>
        <el-form-item label="学院" prop="academy">
          <el-input v-model="newStuForm.academy" autocomplete="off" placeholder="请输入学院简写，例：电智"></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-input v-model="newStuForm.major" autocomplete="off" placeholder="请输入专业"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="className">
          <el-input v-model="newStuForm.className" autocomplete="off" placeholder="请输入班级名"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewStudent">添 加</el-button>
      </div>
    </el-dialog>
    <!--  修改学生信息弹窗  -->
    <el-dialog title="修改学生" :visible.sync="updateDialogFormVisible">
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="学号" prop="stuNum">
          <el-input v-model="editForm.stuNum" autocomplete="off" placeholder="请输入学号" readonly></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="editForm.gender">
            <el-option label="女" value="女"></el-option>
            <el-option label="男" value="男"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="宿舍号" prop="dormNum">
          <el-input v-model="editForm.dormNum" autocomplete="off" placeholder="例：1b-223/11-223"></el-input>
        </el-form-item>
        <el-form-item label="学院" prop="academy">
          <el-input v-model="editForm.academy" autocomplete="off" placeholder="请输入学院简写，例：电智"></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-input v-model="editForm.major" autocomplete="off" placeholder="请输入专业"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="className">
          <el-input v-model="editForm.className" autocomplete="off" placeholder="请输入班级名"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateStu">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 学生宿舍信息表格   -->
    <el-table
      :data="tableData"
      border
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
          <el-button @click="handleUpdate(scope.row)" type="text" size="small">修改</el-button>
          <el-button type="text" size="small" @click="handleDelete(scope.row, scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
import baseApiUrl from '../../config.default'

export default {
  name: 'DormManagement',
  data: function () {
    // const validateDormNum = (rule, value, cb) => {
    //   console.log('进入验证宿舍号')
    //   const regularVal = /^(\d{1,2}-\d{3})$/
    //   if (value === '') {
    //     cb(new Error('请输入宿舍号'))
    //   } else if (!regularVal.test(value)) {
    //     cb(new Error('宿舍号必须是xxx-xxx的形式'))
    //   } else {
    //     cb()
    //   }
    // }
    const validateStuNum = (rule, value, cb) => {
      console.log('进入验证学号')
      const regularVal = /^(\d{12})$/
      if (value === '') {
        cb(new Error('请输入学号'))
      } else if (!regularVal.test(value)) {
        cb(new Error('学号必须是是12位'))
      } else {
        cb()
      }
    }
    return {
      addDialogFormVisible: false,
      updateDialogFormVisible: false,
      tableData: [],
      searchStr: '',
      newStuForm: {
        stuNum: '',
        name: '',
        gender: '',
        dormNum: '',
        academy: '',
        major: '',
        className: ''
      },
      editForm: {
        stuNum: '',
        name: '',
        gender: '',
        dormNum: '',
        academy: '',
        major: '',
        className: ''
      },
      queryMethod: '学号',
      queryCol: 'stuNum',
      rules: {
        stuNum: [
          {
            required: true,
            validator: validateStuNum,
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
            // validator: validateDormNum,
            required: true,
            trigger: 'blur',
            message: '请输入宿舍号'
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
    this.selectAllStudent()
  },
  methods: {
    handleCommand (command) {
      this.queryCol = command
      switch (command) {
        case 'stuNum':
          this.queryMethod = '学号'
          break
        case 'name':
          this.queryMethod = '姓名'
          break
        case 'dormNum':
          this.queryMethod = '宿舍号'
          break
        case 'className':
          this.queryMethod = '班级'
          break
      }
    },
    selectAllStudent () {
      this.tableData = []
      const url = `${baseApiUrl}/student`
      // 获取数据库全部学生列表
      axios.get(url, {
        headers: {
          Authentication: localStorage.getItem('token')
        }
      }).then(rs => {
        if (rs.status === 200) {
          console.log('rs:' + rs.data.data.length)
          rs.data.data.forEach(item => { this.tableData.push(item) })
        }
      }).catch(error => {
        if (error.response.status === 401) {
          this.$message.error(error.response.data.message)
          this.$router.push('/')
        }
      })
    },
    addNewStudent: function () {
      if (this.newStuForm.name && this.newStuForm.gender && this.newStuForm.dormNum && this.newStuForm.academy && this.newStuForm.major) {
        this.$confirm('该操作将添加一个学生数据，是否确定？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // const formData = new FormData()
          // formData.append('stuNum', this.newStuForm.stuNum)
          // formData.append('name', this.newStuForm.name)
          // formData.append('gender', this.newStuForm.gender)
          // formData.append('dormNum', this.newStuForm.dormNum)
          // formData.append('academy', this.newStuForm.academy)
          // formData.append('major', this.newStuForm.major)
          // formData.append('className', this.newStuForm.className)
          let formData = 'stuNum=' + this.newStuForm.stuNum
          formData = formData.concat('&name=' + this.newStuForm.name)
          formData = formData.concat('&gender=' + this.newStuForm.gender)
          formData = formData.concat('&dormNum=' + this.newStuForm.dormNum)
          formData = formData.concat('&academy=' + this.newStuForm.academy)
          formData = formData.concat('&major=' + this.newStuForm.major)
          formData = formData.concat('&className=' + this.newStuForm.className)
          const url = `${baseApiUrl}/student`
          axios.post(url, formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
              Authentication: localStorage.getItem('token')
            }
          }).then(rs => {
            console.log('promise-rs:', rs)
            // this.tableData = rs.data.data
            this.$message.success('添加成功')
            this.selectAllStudent()
          }).catch(() => {
            this.$message.error('添加失败')
          })
          this.addDialogFormVisible = false
          this.newStuForm = {}
        })
      } else {
        this.$message.warning('信息不全，请完善后再添加')
      }
    },
    updateStu: function () {
      if (this.editForm.name && this.editForm.gender && this.editForm.dormNum && this.editForm.academy && this.editForm.major) {
        this.$confirm('该操作将修改一个学生数据，是否确定？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let formData = 'stuNum=' + this.editForm.stuNum
          formData = formData.concat('&name=' + this.editForm.name)
          formData = formData.concat('&gender=' + this.editForm.gender)
          formData = formData.concat('&dormNum=' + this.editForm.dormNum)
          formData = formData.concat('&academy=' + this.editForm.academy)
          formData = formData.concat('&major=' + this.editForm.major)
          formData = formData.concat('&className=' + this.editForm.className)
          const url = `${baseApiUrl}/student?` + formData
          axios.put(url, formData, {
            headers: {
              Authentication: localStorage.getItem('token')
              // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
          }).then(rs => {
            console.log('promise-rs:', rs)
            // this.tableData = rs.data.data
            this.$message.success('修改成功')
            this.selectAllStudent()
          }).catch(() => {
            this.$message.error('修改失败')
          })
          this.updateDialogFormVisible = false
        })
      } else {
        this.$message.warning('信息不全，请完善后再添加')
      }
    },
    queryInfo () {
      const queryData = this.queryCol + '=' + this.searchStr
      const url = `${baseApiUrl}/student/query?` + queryData
      console.log('url:' + url)
      axios.get(url, {
        headers: {
          Authentication: localStorage.getItem('token')
        }
      }).then((rs) => {
        this.tableData = []
        console.log(rs.data)
        rs.data.data.forEach(item => { this.tableData.push(item) })
      })
    },
    handleUpdate (row) {
      console.log('修改：' + row.stuNum)
      this.updateDialogFormVisible = true
      this.editForm.stuNum = row.stuNum
      this.editForm.name = row.name
      this.editForm.gender = row.gender
      this.editForm.dormNum = row.dormNum
      this.editForm.academy = row.academy
      this.editForm.major = row.major
      this.editForm.className = row.className
    },
    handleDelete: function (row, i) {
      this.$confirm('该操作将删除一个学生数据，是否确定？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('删除：' + row.stuNum)
        const formData = 'stuNum=' + row.stuNum
        const url = `${baseApiUrl}/student?` + formData
        axios.delete(url, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            Authentication: localStorage.getItem('token')
          }
        }).then(rs => {
          console.log('promise-rs:', rs)
          this.tableData.splice(i, 1)
          this.$message.success('删除成功')
        }).catch(() => {
          this.$message.error('删除失败')
        })
      })
    }
  }
}
</script>

<style>

</style>

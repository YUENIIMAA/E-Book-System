<template>
  <el-table v-loading="loading" :data="userinfo.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
    <el-table-column label="ID" prop="userid">
      <template slot-scope="scope">
        <el-tag type="info">{{scope.row.userid}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="Name" prop="username"></el-table-column>
    <el-table-column label="EMAIL" prop="useremail"></el-table-column>
    <el-table-column label="STATUS" prop="userstatus">
      <template slot-scope="scope">
        <el-tag type="success" v-show="scope.row.userstatus">{{transStatus(scope.row.userstatus)}}</el-tag>
        <el-tag type="danger" v-show="!scope.row.userstatus">{{transStatus(scope.row.userstatus)}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column align="right">
      <template slot="header" slot-scope="scope">
        <el-input v-model="search" size="mini" placeholder="Type to search"/>
      </template>
      <template slot-scope="scope">
        <el-button size="mini" @click="handleACTIVATE(scope.row)">ACTIVATE</el-button>
        <el-button size="mini" type="danger" @click="handleDISABLE(scope.row)">DISABLE</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  inject: ['reload', 'logout'],
  name: 'ManageUsers',
  created () {
    if (this.$store.getters.getUserStatus === 'user') {
      this.$message({
        showClose: true,
        message: 'PLEASE SIGN IN AS ADMIN, NOT USER',
        center: true,
        type: 'warning'
      })
      this.logout()
    } else if (this.$store.getters.getUserStatus !== 'admin') {
      this.$message({
        showClose: true,
        message: 'PLEASE SIGN IN FIRST',
        center: true,
        type: 'warning'
      })
      this.logout()
    }
  },
  mounted () {
    this.axios.get('http://localhost:1127/api/fetchuserinfo')
      .then(response => {
        this.userinfo = response.data
        console.log(this.userinfo)
        this.loading = false
      })
  },
  data () {
    return {
      loading: true,
      userinfo: [],
      search: ''
    }
  },
  methods: {
    transStatus (status) {
      if (status === 1) {
        return 'ACTIVE'
      } else {
        return 'DISABLED'
      }
    },
    handleACTIVATE (row) {
      console.log(row.username)
      if (row.userstatus === 1) {
        this.$message({
          showClose: true,
          message: 'USER ALREADY ACTIVATED',
          center: true,
          type: 'warning'
        })
      } else {
        var self = this
        this.axios.get('http://localhost:1127/api/activate?userid=' + row.userid)
          .then(response => {
            if (response.data.msgtype === 'SUCCESS') {
              row.userstatus = 1
              self.$message({
                showClose: true,
                message: 'USER ACTIVATED',
                center: true,
                type: 'success'
              })
            } else {
              self.$message({
                showClose: true,
                message: 'PLEASE FRESH THIS PAGE AND TRY AGAIN',
                center: true,
                type: 'error'
              })
            }
          })
      }
    },
    handleDISABLE (row) {
      console.log(row.username)
      if (row.userstatus === 0) {
        this.$message({
          showClose: true,
          message: 'USER ALREADY DISABLED',
          center: true,
          type: 'warning'
        })
      } else {
        var self = this
        this.axios.get('http://localhost:1127/api/disable?userid=' + row.userid)
          .then(response => {
            if (response.data.msgtype === 'SUCCESS') {
              row.userstatus = 0
              self.$message({
                showClose: true,
                message: 'USER DISABLED',
                center: true,
                type: 'success'
              })
            } else {
              self.$message({
                showClose: true,
                message: 'PLEASE FRESH THIS PAGE AND TRY AGAIN',
                center: true,
                type: 'error'
              })
            }
          })
      }
    }
  },
  computed: {
  }
}
</script>

<style scoped>

</style>

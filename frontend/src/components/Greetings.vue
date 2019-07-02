<template>
  <el-container direction="vertical">
    <el-header align="center">
      <h1>侬好呀</h1>
    </el-header>
    <el-main align="center">
      <h1>{{username}}</h1>
    </el-main>
  </el-container>
</template>

<script>
export default {
  inject: ['reload', 'logout'],
  name: 'Greetings',
  data () {
    return {
      fileList: []
    }
  },
  methods: {
    addImage () {
      if (this.$refs.newbookcover.files.length !== 0) {
        console.log(this.$refs.newbookcover.files[0])
        var formData = new FormData()
        formData.append('bookcover', this.$refs.newbookcover.files[0], '1')
        this.axios.post('http://localhost:1127/api/modifybookdetail', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
          console.log(response.data)
        })
      } else {
        this.$message({
          showClose: true,
          message: 'NO BOOK COVER FOUND',
          center: true,
          type: 'warning'
        })
      }
    }
  },
  created () {
    if (this.$store.getters.getUserStatus !== 'user' && this.$store.getters.getUserStatus !== 'admin') {
      this.$store.dispatch('setAllowLogin', true)
      this.$message({
        showClose: true,
        message: 'PLEASE SIGN IN FIRST',
        center: true,
        type: 'warning'
      })
      this.logout()
    }
  },
  computed: {
    userstatus: function () {
      return this.$store.getters.getUserStatus
    },
    userid: function () {
      return this.$store.getters.getUserID
    },
    username: function () {
      return this.$store.getters.getUsername
    }
  }
}
</script>

<style scoped>

</style>

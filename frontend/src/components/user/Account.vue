<template>
  <el-container direction="vertical">
    <el-row>
      <el-col :span="11" align="center">
        <el-date-picker type="date" placeholder="FROM..." v-model="date.from" value-format="yyyy-MM-dd"></el-date-picker>
      </el-col>
      <el-col :span="11" align="center">
        <el-date-picker type="date" placeholder="TO..." v-model="date.to" value-format="yyyy-MM-dd"></el-date-picker>
      </el-col>
      <el-col :span="2" align="center"><el-button @click="count">COUNT</el-button></el-col>
    </el-row>
    <el-table v-loading="loading" :data="results" style="width: 100%">
      <el-table-column label="BOOK ID" prop="id" width="100">
        <template slot-scope="scope">
          <el-tag type="info">{{scope.row.id}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="BOOK NAME" prop="name"></el-table-column>
      <el-table-column label="NUMBER" prop="number"></el-table-column>
      <el-table-column label="TOTAL COST" prop="total">
        <template slot-scope="scope">
          {{scope.row.total.toFixed(2)}}
        </template>
      </el-table-column>
    </el-table>
  </el-container>
</template>

<script>
export default {
  inject: ['reload', 'logout'],
  name: 'Account',
  data () {
    return {
      loading: false,
      date: {
        from: '',
        to: ''
      },
      results: []
    }
  },
  methods: {
    count () {
      console.log(this.date.from, this.date.to)
      if (this.date.from === '' || this.date.to === '') {
        this.$message({
          showClose: true,
          message: 'PLEASE CHOOSE THE DATE RANGE',
          center: true,
          type: 'warning'
        })
        return
      }
      if (this.date.from > this.date.to) {
        this.$message({
          showClose: true,
          message: 'DATE RANGE NOT VALID',
          center: true,
          type: 'warning'
        })
        return
      }
      this.loading = true
      let userid = this.$store.getters.getUserID
      this.axios.get('http://localhost:1127/api/analyzemypurchase?userid=' + userid + '&from=' + this.date.from + '&to=' + this.date.to)
        .then(response => {
          this.results = response.data
        })
      this.loading = false
    }
  },
  created () {
    if (this.$store.getters.getUserStatus === 'admin') {
      this.$message({
        showClose: true,
        message: 'PLEASE SIGN IN AS USER, NOT ADMIN',
        center: true,
        type: 'warning'
      })
      this.logout()
    } else if (this.$store.getters.getUserStatus !== 'user') {
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
  }
}
</script>

<style scoped>

</style>

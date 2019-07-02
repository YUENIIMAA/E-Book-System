<template>
  <el-container direction="vertical">
    <el-row>
      <el-col :span="5">
        <el-radio-group v-model="analyze">
          <el-radio-button label="BOOK"></el-radio-button>
          <el-radio-button label="USER"></el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="7" align="center">
        <el-input placeholder="Please input" v-model="keyword"></el-input>
      </el-col>
      <el-col :span="5" align="center">
        <el-date-picker type="date" placeholder="FROM..." v-model="date.from" value-format="yyyy-MM-dd"></el-date-picker>
      </el-col>
      <el-col :span="5" align="center">
        <el-date-picker type="date" placeholder="TO..." v-model="date.to" value-format="yyyy-MM-dd"></el-date-picker>
      </el-col>
      <el-col :span="2" align="center"><el-button @click="count">COUNT</el-button></el-col>
    </el-row>
    <el-table v-loading="loading" :data="filteredorders" style="width: 100%">
      <el-table-column label="ID" prop="id" width="100">
        <template slot-scope="scope">
          <el-tag type="info">{{scope.row.id}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="NAME" prop="name"></el-table-column>
      <el-table-column label="NUMBER" prop="number"></el-table-column>
      <el-table-column label="TOTAL" prop="total">
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
  name: 'Statistics',
  data () {
    return {
      keyword: '',
      analyze: 'USER',
      loading: false,
      date: {
        from: '',
        to: ''
      },
      results: []
    }
  },
  computed: {
    filteredorders: function () {
      var opt = []
      var i = 0
      for (i = 0; i < this.results.length; i++) {
        if (String(this.results[i].name).search(this.keyword) !== -1) { opt.push(this.results[i]) }
      }
      return opt
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
      if (this.analyze === 'BOOK') {
        this.axios.get('http://localhost:1127/api/analyzemypurchase?userid=0&from=' + this.date.from + '&to=' + this.date.to)
          .then(response => {
            this.results = response.data
          })
      } else {
        this.axios.get('http://localhost:1127/api/analyzeuser?from=' + this.date.from + '&to=' + this.date.to)
          .then(response => {
            this.results = response.data
          })
      }
      this.loading = false
    }
  },
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
  }
}
</script>

<style scoped>

</style>

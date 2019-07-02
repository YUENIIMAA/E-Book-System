<template>
  <el-table v-loading="loading" :data="orders" style="width: 100%">
    <el-table-column label="ORDER ID" prop="orderid" width="100">
      <template slot-scope="scope">
        <el-tag type="info">{{scope.row.orderid}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="DATE" prop="orderdate">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        {{scope.row.orderdate.substring(0,10)}}
      </template>
    </el-table-column>
    <el-table-column label="BOOK ID" prop="bookid"></el-table-column>
    <el-table-column label="NAME" prop="bookname"></el-table-column>
    <el-table-column label="PRICE" prop="bookprice"></el-table-column>
    <el-table-column label="NUMBER" prop="booknumber"></el-table-column>
    <el-table-column label="TOTAL">
      <template slot-scope="scope">
        {{calculateTOTAL(scope.row.bookprice, scope.row.booknumber).toFixed(2)}}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  inject: ['reload', 'logout'],
  name: 'Orders',
  data () {
    return {
      loading: true,
      orders: []
    }
  },
  methods: {
    calculateTOTAL (price, number) {
      let ret = price * number
      return ret
    }
  },
  mounted () {
    let userid = this.$store.getters.getUserID
    this.axios.get('http://localhost:1127/api/fetchorders?userid=' + userid)
      .then(response => {
        this.orders = response.data
        this.loading = false
      })
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
  }
}
</script>

<style scoped>

</style>

<template>
  <el-container direction="vertical">
    <el-row>
      <el-col :span="12">
        <el-radio-group v-model="searchby" size="mini">
          <el-radio-button label="ORDER ID"></el-radio-button>
          <el-radio-button label="USER NAME"></el-radio-button>
          <el-radio-button label="USER ID"></el-radio-button>
          <el-radio-button label="BOOK NAME"></el-radio-button>
          <el-radio-button label="BOOK ID"></el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="12">
        <el-input placeholder="Please input" v-model="keyword" size="mini"></el-input>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="filteredorders" style="width: 100%">
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
      <el-table-column label="USER ID" prop="userid"></el-table-column>
      <el-table-column label="USER NAME" prop="username"></el-table-column>
      <el-table-column label="BOOK ID" prop="bookid"></el-table-column>
      <el-table-column label="BOOK NAME" prop="bookname"></el-table-column>
      <el-table-column label="PRICE" prop="bookprice"></el-table-column>
      <el-table-column label="NUMBER" prop="booknumber"></el-table-column>
      <el-table-column label="TOTAL">
        <template slot-scope="scope">
          {{calculateTOTAL(scope.row.bookprice, scope.row.booknumber).toFixed(2)}}
        </template>
      </el-table-column>
    </el-table>
  </el-container>
</template>

<script>
export default {
  inject: ['reload', 'logout'],
  name: 'ManageOrders',
  data () {
    return {
      keyword: '',
      searchby: 'ORDER ID',
      loading: true,
      orders: []
    }
  },
  computed: {
    filteredorders: function () {
      var opt = []
      var i = 0
      if (this.searchby === 'USER NAME') {
        for (i = 0; i < this.orders.length; i++) {
          if (String(this.orders[i].username).toLowerCase().search(this.keyword.toLowerCase()) !== -1) { opt.push(this.orders[i]) }
        }
        return opt
      }
      if (this.searchby === 'BOOK NAME') {
        for (i = 0; i < this.orders.length; i++) {
          if (String(this.orders[i].bookname).toLowerCase().search(this.keyword.toLowerCase()) !== -1) { opt.push(this.orders[i]) }
        }
        return opt
      }
      if (this.searchby === 'USER ID') {
        for (i = 0; i < this.orders.length; i++) {
          if (String(this.orders[i].userid).toLowerCase().search(this.keyword.toLowerCase()) !== -1) { opt.push(this.orders[i]) }
        }
        return opt
      }
      if (this.searchby === 'BOOK ID') {
        for (i = 0; i < this.orders.length; i++) {
          if (String(this.orders[i].bookid).toLowerCase().search(this.keyword.toLowerCase()) !== -1) { opt.push(this.orders[i]) }
        }
        return opt
      }
      if (this.searchby === 'ORDER ID') {
        for (i = 0; i < this.orders.length; i++) {
          if (String(this.orders[i].orderid).toLowerCase().search(this.keyword.toLowerCase()) !== -1) { opt.push(this.orders[i]) }
        }
        return opt
      }
      return this.orders
    }
  },
  methods: {
    calculateTOTAL (price, number) {
      let ret = price * number
      return ret
    }
  },
  mounted () {
    this.axios.get('http://localhost:1127/api/fetchallorder')
      .then(response => {
        this.orders = response.data
        this.loading = false
      })
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

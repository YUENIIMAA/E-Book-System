<template>
  <el-table v-loading="loading" :data="shoppingcart" style="width: 100%">
    <el-table-column label="ISBN" prop="bookisbn">
      <template slot-scope="scope">
        <el-tag type="info">{{scope.row.book.bookisbn}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="Name" prop="book.bookname"></el-table-column>
    <el-table-column label="AUTHOR" prop="book.bookauthor"></el-table-column>
    <el-table-column label="STOCK" prop="book.bookstock"></el-table-column>
    <el-table-column label="PRICE" prop="book.bookprice"></el-table-column>
    <el-table-column label="NUMBER" prop="cartnumber">
      <template slot-scope="scope">
        <el-input-number v-model="scope.row.cartnumber" @change="changecart(scope.row)" :min="1" :max="scope.row.book.bookstock"></el-input-number>
      </template>
    </el-table-column>
    <el-table-column align="center">
      <template slot="header">
        <el-button size="mini" @click="checkout(shoppingcart)">CHECK OUT</el-button>
      </template>
      <template slot-scope="scope">
        <el-button type="danger" @click="deletebook(scope.$index, scope.row, shoppingcart)">DELETE</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  inject: ['reload', 'logout'],
  name: 'ShoppingCart',
  data () {
    return {
      loading: true,
      temp: '',
      shoppingcart: []
    }
  },
  methods: {
    checkout (rows) {
      if (rows.length === 0) {
        this.$message({
          showClose: true,
          message: 'YOU HAVE NOTHING TO CHECKOUT',
          center: true,
          type: 'warning'
        })
        return
      }
      for (var i = 0; i < rows.length; i++) {
        var cartid = rows[i].cartid
        console.log(cartid)
        this.axios.get('http://localhost:1127/api/checkout?cartid=' + cartid)
      }
      this.shoppingcart = []
      this.$message({
        showClose: true,
        message: 'ORDER PLACED SUCCESSFULLY',
        center: true,
        type: 'success'
      })
      this.loading = true
      const self = this
      setTimeout(function () {
        self.loading = false
        self.reload()
      }, 2000)
    },
    deletebook (index, row, rows) {
      console.log(row.cartid)
      let cartid = row.cartid
      let self = this
      this.axios.get('http://localhost:1127/api/deletecart?cartid=' + cartid)
        .then(response => {
          if (response.data.msgtype === 'SUCCESS') {
            rows.splice(index, 1)
            self.$message({
              showClose: true,
              message: row.book.bookname + ' REMOVED SUCCESSFULLY',
              center: true,
              type: 'success'
            })
          } else {
            self.$message({
              showClose: true,
              message: 'PLEASE TRY AGAIN LATTER',
              center: true,
              type: 'error'
            })
          }
        })
    },
    changecart (row) {
      console.log(row.cartid, row.cartnumber)
      let cartid = row.cartid
      let cartnumber = row.cartnumber
      let self = this
      this.axios.get('http://localhost:1127/api/modifycart?cartid=' + cartid + '&cartnumber=' + cartnumber)
        .then(response => {
          if (response.data.msgtype === 'SUCCESS') {
            self.$message({
              showClose: true,
              message: 'NUMBER OF ' + row.book.bookname + ' CHANGED TO ' + cartnumber,
              center: true,
              type: 'success'
            })
          } else {
            self.$message({
              showClose: true,
              message: 'PLEASE TRY AGAIN LATTER',
              center: true,
              type: 'error'
            })
          }
        })
    }
  },
  mounted () {
    let userid = this.$store.getters.getUserID
    let self = this
    this.axios.get('http://localhost:1127/api/fetchcart?userid=' + userid)
      .then(response => {
        self.shoppingcart = response.data
        console.log(this.shoppingcart)
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

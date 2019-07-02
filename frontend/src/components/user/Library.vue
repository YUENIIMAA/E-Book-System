<template>
  <el-container>
    <el-dialog title="BOOK DETAIL" :visible.sync="detaildialogVisible" width="50%">
      <el-row>
        <el-col :span="8" align="center">
          <div class="block" key="contain">
            <el-image
              style="width: 100px; height: 150px"
              :src="fetchcoverurl()"
              fit="contain"></el-image>
          </div>
        </el-col>
        <el-col :span="16">
          <p>NAME: {{this.bookdetail.bookname}}</p>
          <p>ISBN: {{this.bookdetail.bookisbn}}</p>
          <p>AUTHOR: {{this.bookdetail.bookauthor}}</p>
          <p>PRICE: {{this.bookdetail.bookprice}}</p>
          <p>STOCK: {{this.bookdetail.bookstock}}</p>
          <p>VIEWS: {{this.bookdetail.bookviews}}</p>
          <p>DESCRIPTION:</p>
          <p>{{this.bookdetail.bookdescription}}</p>
        </el-col>
      </el-row>
    </el-dialog>
    <el-table v-loading="loading" :default-sort = "{prop: 'bookname', order: 'ascending'}" :data="library.filter(data => !search || data.bookname.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
      <el-table-column label="ISBN" prop="bookisbn">
        <template slot-scope="scope">
          <el-tag type="info">{{scope.row.bookisbn}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Name" prop="bookname" sortable></el-table-column>
      <el-table-column label="AUTHOR" prop="bookauthor" sortable></el-table-column>
      <el-table-column label="STOCK" prop="bookstock" width="100"></el-table-column>
      <el-table-column label="VIEWS" prop="bookviews" width="100" sortable></el-table-column>
      <el-table-column label="SALES" prop="booksales" width="100" sortable></el-table-column>
      <el-table-column label="PRICE" prop="bookprice" width="100" sortable></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="Type to search"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="showDetail(scope.row)">VIEW</el-button>
          <el-button size="mini" type="danger" @click="addToCart(scope.row)">ADD TO CART</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-container>
</template>

<script>
export default {
  inject: ['reload', 'logout'],
  name: 'Library',
  data () {
    return {
      detaildialogVisible: false,
      loading: true,
      search: '',
      library: [],
      bookdetail: {
        bookid: '',
        bookisbn: '',
        bookname: '',
        bookauthor: '',
        bookprice: '',
        bookstock: '',
        bookviews: '',
        bookdescription: '',
        booksales: ''
      }
    }
  },
  methods: {
    showDetail (row) {
      const self = this
      this.axios.get('http://localhost:1127/api/addview?bookid=' + row.bookid)
        .then(response => {
          if (response.data.msgtype === 'SUCCESS') {
            console.log('+1')
            row.bookviews = row.bookviews + 1
          } else {
            console.log('+0')
          }
        })
      this.axios.get('http://localhost:1127/api/fetchdesc?bookid=' + row.bookid)
        .then(response => {
          console.log(response.data)
          if (response.data.msgtype === 'SUCCESS') {
            self.bookdetail.bookdescription = response.data.msgcontent
          } else {
            self.bookdetail.bookdescription = 'empty'
          }
          self.bookdetail.bookid = row.bookid
          self.bookdetail.bookisbn = row.bookisbn
          self.bookdetail.bookname = row.bookname
          self.bookdetail.bookauthor = row.bookauthor
          self.bookdetail.bookprice = row.bookprice
          self.bookdetail.bookstock = row.bookstock
          self.bookdetail.booksales = row.booksales
          self.bookdetail.bookviews = row.bookviews
          self.detaildialogVisible = true
        })
    },
    fetchcoverurl () {
      const bookid = this.bookdetail.bookid
      return 'http://localhost:1127/api/fetchcover?bookid=' + bookid
    },
    addToCart (row) {
      const userid = this.$store.getters.getUserID
      const bookid = row.bookid
      const self = this
      console.log(userid, bookid)
      this.axios.get('http://localhost:1127/api/addbook?userid=' + userid + '&bookid=' + bookid)
        .then(response => {
          if (response.data.msgtype === 'SUCCESS') {
            self.$message({
              showClose: true,
              message: 'BOOK ADDED',
              center: true,
              type: 'success'
            })
          } else if (response.data.msgcontent === 'duplicated') {
            self.$message({
              showClose: true,
              message: 'ALREADY IN YOUR SHOPPING CART',
              center: true,
              type: 'warning'
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
    this.axios.get('http://localhost:1127/api/fetchlibrary')
      .then(response => {
        this.library = response.data
        console.log(this.library)
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

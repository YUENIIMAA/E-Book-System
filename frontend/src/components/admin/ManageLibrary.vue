<template>
  <el-container>
    <el-dialog title="ADD A NEW BOOK" :visible.sync="adddialogVisible" width="50%" :before-close="handleClose">
      <el-form :model="newbook" :rules="newbookrules" ref="newbook" label-width="120px">
        <el-form-item label="ISBN" prop="bookisbn">
          <el-input v-model="newbook.bookisbn"></el-input>
        </el-form-item>
        <el-form-item label="NAME" prop="bookname">
          <el-input v-model="newbook.bookname"></el-input>
        </el-form-item>
        <el-form-item label="AUTHOR" prop="bookauthor">
          <el-input v-model="newbook.bookauthor"></el-input>
        </el-form-item>
        <el-form-item label="PRICE" prop="bookprice">
          <el-input v-model="newbook.bookprice"></el-input>
        </el-form-item>
        <el-form-item label="STOCK" prop="bookstock">
          <el-input v-model="newbook.bookstock"></el-input>
        </el-form-item>
        <el-form-item label="DESCRIPTION" prop="bookdescription">
          <el-input type="textarea" v-model="newbook.bookdescription"></el-input>
        </el-form-item>
        <el-form-item label="COVER">
          <input type="file" id="coveruploader" name="bookcover" accept="image/png" ref="newbookcover">
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="commitadd">SUBMIT</el-button>
          <el-button @click="resetadd">RESET</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="EDIT BOOK" :visible.sync="editdialogVisible" width="50%" :before-close="handleClose">
      <el-form :model="book" :rules="bookrules" ref="book" label-width="120px">
        <el-form-item label="ID" prop="bookid">
          <el-input v-model="book.bookid" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="ISBN" prop="bookisbn">
          <el-input v-model="book.bookisbn"></el-input>
        </el-form-item>
        <el-form-item label="NAME" prop="bookname">
          <el-input v-model="book.bookname"></el-input>
        </el-form-item>
        <el-form-item label="AUTHOR" prop="bookauthor">
          <el-input v-model="book.bookauthor"></el-input>
        </el-form-item>
        <el-form-item label="PRICE" prop="bookprice">
          <el-input v-model="book.bookprice"></el-input>
        </el-form-item>
        <el-form-item label="STOCK" prop="bookstock">
          <el-input v-model="book.bookstock"></el-input>
        </el-form-item>
        <el-form-item label="DESCRIPTION" prop="bookdescription">
          <el-input type="textarea" v-model="book.bookdescription"></el-input>
        </el-form-item>
        <el-form-item label="COVER">
          <input type="file" id="coveruploader2" name="bookcover" accept="image/png,image/gif,image/jpeg" ref="newbookcover">
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="commitedit">SUBMIT</el-button>
          <el-button @click="resetedit">RESET</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-table v-loading="loading" :default-sort = "{prop: 'bookname', order: 'ascending'}" :data="library.filter(data => !search || data.bookname.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
      <el-table-column label="ISBN" prop="bookisbn">
        <template slot="header" slot-scope="scope">
          <el-button size="mini" icon="el-icon-circle-plus-outline" @click="addbook(scope.row)">ADD</el-button>
        </template>
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
          <el-button size="mini" @click="editbook(scope.row)">EDIT</el-button>
          <el-button size="mini" type="danger" @click="deltebook(scope.row)">DELETE</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-container>
</template>

<script>
export default {
  inject: ['reload', 'logout'],
  name: 'ManageLibrary',
  data () {
    return {
      editdialogVisible: false,
      adddialogVisible: false,
      loading: true,
      search: '',
      library: [],
      book: {
        bookid: '',
        bookisbn: '',
        bookname: '',
        bookauthor: '',
        bookprice: '',
        bookstock: '',
        bookdescription: '',
        oldisbn: '',
        oldname: '',
        oldauthor: '',
        oldprice: '',
        oldstock: '',
        olddesc: ''
      },
      bookrules: {
        bookid: [
          { required: true, message: 'YOU CAN NOT CHANGE BOOKID', trigger: 'blur' }
        ],
        bookisbn: [
          { required: true, message: 'Please select Activity zone', trigger: 'blur' },
          { min: 13, max: 13, message: 'LENGTH OF ISBN SHOULD BE 13', trigger: 'blur' }
        ],
        bookname: [
          { required: true, message: 'PLEASE INPUT BOOK NAME', trigger: 'blur' }
        ],
        bookauthor: [
          { required: true, message: 'PLEASE INPUT BOOK AUTHOR', trigger: 'blur' }
        ],
        bookprice: [
          { required: true, message: 'PLEASE INPUT BOOK PRICE', trigger: 'blur' },
          { type: 'float', required: true, message: 'BOOK PRICE MUST BE A FLOAT', trigger: 'change' },
          { type: 'float', required: true, message: 'BOOK PRICE MUST BE A FLOAT', trigger: 'blur' }
        ],
        bookstock: [
          { required: true, message: 'PLEASE INPUT BOOK STOCK', trigger: 'blur' },
          { type: 'number', required: true, message: 'BOOK STOCK MUST BE A NUMBER', trigger: 'change' },
          { type: 'number', required: true, message: 'BOOK STOCK MUST BE A NUMBER', trigger: 'blur' }
        ]
      },
      newbook: {
        bookisbn: '',
        bookname: '',
        bookauthor: '',
        bookprice: '',
        bookstock: '',
        bookdescription: ''
      },
      newbookrules: {
        bookisbn: [
          { required: true, message: 'Please select Activity zone', trigger: 'blur' },
          { min: 13, max: 13, message: 'LENGTH OF ISBN SHOULD BE 13', trigger: 'blur' }
        ],
        bookname: [
          { required: true, message: 'PLEASE INPUT BOOK NAME', trigger: 'blur' }
        ],
        bookauthor: [
          { required: true, message: 'PLEASE INPUT BOOK AUTHOR', trigger: 'blur' }
        ],
        bookprice: [
          { required: true, message: 'PLEASE INPUT BOOK PRICE', trigger: 'blur' },
          { type: 'float', required: true, message: 'BOOK PRICE MUST BE A FLOAT', trigger: 'change' },
          { type: 'float', required: true, message: 'BOOK PRICE MUST BE A FLOAT', trigger: 'blur' }
        ],
        bookstock: [
          { required: true, message: 'PLEASE INPUT BOOK STOCK', trigger: 'blur' },
          { type: 'number', required: true, message: 'BOOK STOCK MUST BE A NUMBER', trigger: 'change' },
          { type: 'number', required: true, message: 'BOOK STOCK MUST BE A NUMBER', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    addbook (row) {
      this.adddialogVisible = true
    },
    resetadd () {
      this.newbook.bookisbn = ''
      this.newbook.bookname = ''
      this.newbook.bookauthor = ''
      this.newbook.bookprice = ''
      this.newbook.bookstock = ''
      this.newbook.bookdescription = ''
    },
    commitadd () {
      const self = this
      const newbookinfo = {
        'bookisbn': this.newbook.bookisbn,
        'bookname': this.newbook.bookname,
        'bookauthor': this.newbook.bookauthor,
        'bookprice': this.newbook.bookprice,
        'bookstock': this.newbook.bookstock
      }
      this.axios.post('http://localhost:1127/api/addbook', newbookinfo)
        .then(response => {
          if (response.data.msgtype === 'SUCCESS') {
            self.library = []
            self.$message({
              showClose: true,
              message: 'BOOK ADDED SUCCESSFULLY',
              center: true,
              type: 'success'
            })
            const retid = response.data.msgcontent
            if (self.$refs.newbookcover.files.length !== 0) {
              console.log(self.$refs.newbookcover.files[0])
              var formData = new FormData()
              formData.append('bookcover', self.$refs.newbookcover.files[0], retid)
              self.axios.post('http://localhost:1127/api/modifybookdetail', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }).then(response => {
                if (response.data.msgtype !== 'SUCCESS') {
                  self.$message({
                    showClose: true,
                    message: 'FAILED TO ADD BOOK COVER',
                    center: true,
                    type: 'warning'
                  })
                }
              })
            } else {
              self.$message({
                showClose: true,
                message: 'NO BOOK COVER FOUND',
                center: true,
                type: 'warning'
              })
            }
            if (self.newbook.bookdescription !== '') {
              let bookdesc = {
                'bookid': self.newbook.bookid,
                'bookdescription': self.newbook.bookdescription
              }
              self.axios.post('http://localhost:1127/api/modifybookdesc', bookdesc)
                .then(response => {
                  if (response.data.msgtype !== 'SUCCESS') {
                    self.$message({
                      showClose: true,
                      message: 'FAILED TO ADD BOOK DESCRIPTION',
                      center: true,
                      type: 'warning'
                    })
                  }
                })
            } else {
              self.$message({
                showClose: true,
                message: 'NO BOOK DESCRIPTION FOUND',
                center: true,
                type: 'warning'
              })
            }
            self.adddialogVisible = false
            self.loading = true
            setTimeout(function () {
              self.loading = false
              self.reload()
            }, 2000)
          } else if (response.data.msgcontent === 'isbn already exists') {
            self.$message({
              showClose: true,
              message: 'ISBN HAS BEEN USED',
              center: true,
              type: 'warning'
            })
          } else {
            self.$message({
              showClose: true,
              message: 'PLEASE TRY AGAIN',
              center: true,
              type: 'error'
            })
          }
        })
    },
    editbook (row) {
      this.editdialogVisible = true
      this.book.bookid = row.bookid
      this.book.bookisbn = row.bookisbn
      this.book.oldisbn = row.bookisbn
      this.book.bookname = row.bookname
      this.book.oldname = row.bookname
      this.book.bookauthor = row.bookauthor
      this.book.oldauthor = row.bookauthor
      this.book.bookprice = row.bookprice
      this.book.oldprice = row.bookprice
      this.book.bookstock = row.bookstock
      this.book.oldstock = row.bookstock
      this.axios.get('http://localhost:1127/api/fetchdesc?bookid=' + this.book.bookid)
        .then(response => {
          if (response.data.msgtype === 'SUCCESS') {
            this.book.bookdescription = response.data.msgcontent
            this.book.olddesc = this.book.bookdescription
          } else {
            this.book.bookdescription = ''
            this.book.olddesc = ''
          }
        })
    },
    resetedit () {
      this.book.bookisbn = this.book.oldisbn
      this.book.bookname = this.book.oldname
      this.book.bookauthor = this.book.oldauthor
      this.book.bookprice = this.book.oldprice
      this.book.bookstock = this.book.oldstock
    },
    commitedit () {
      const self = this
      const newbookinfo = {
        'bookid': this.book.bookid,
        'bookisbn': this.book.bookisbn,
        'bookname': this.book.bookname,
        'bookauthor': this.book.bookauthor,
        'bookprice': this.book.bookprice,
        'bookstock': this.book.bookstock
      }
      if (this.book.bookdescription !== '') {
        let bookdesc = {
          'bookid': this.book.bookid,
          'bookdescription': this.book.bookdescription
        }
        this.axios.post('http://localhost:1127/api/modifybookdesc', bookdesc)
          .then(response => {
            if (response.data.msgtype !== 'SUCCESS') {
              self.$message({
                showClose: true,
                message: 'FAILED TO ADD BOOK DESCRIPTION',
                center: true,
                type: 'warning'
              })
            }
          })
      } else {
        this.$message({
          showClose: true,
          message: 'NO BOOK DESCRIPTION FOUND',
          center: true,
          type: 'warning'
        })
      }
      if (this.$refs.newbookcover.files.length !== 0) {
        console.log(this.$refs.newbookcover.files[0])
        var formData = new FormData()
        formData.append('bookcover', this.$refs.newbookcover.files[0], this.book.bookid)
        this.axios.post('http://localhost:1127/api/modifybookdetail', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
          if (response.data.msgtype !== 'SUCCESS') {
            self.$message({
              showClose: true,
              message: 'FAILED TO ADD BOOK COVER',
              center: true,
              type: 'warning'
            })
          }
        })
      } else {
        this.$message({
          showClose: true,
          message: 'NO BOOK COVER FOUND',
          center: true,
          type: 'warning'
        })
      }
      this.axios.post('http://localhost:1127/api/modifybook', newbookinfo)
        .then(response => {
          if (response.data.msgtype === 'SUCCESS') {
            self.library = []
            self.$message({
              showClose: true,
              message: 'BOOK EDITED SUCCESSFULLY',
              center: true,
              type: 'success'
            })
            self.editdialogVisible = false
            self.loading = true
            setTimeout(function () {
              self.loading = false
              self.reload()
            }, 2000)
          } else if (response.data.msgcontent === 'isbn already exists') {
            self.$message({
              showClose: true,
              message: 'ISBN HAS BEEN USED',
              center: true,
              type: 'warning'
            })
          } else {
            self.$message({
              showClose: true,
              message: 'PLEASE TRY AGAIN',
              center: true,
              type: 'error'
            })
          }
        })
    },
    deltebook (row) {
      const bookid = row.bookid
      const self = this
      this.axios.get('http://localhost:1127/api/deletebook?bookid=' + bookid)
        .then(response => {
          console.log(response.data)
          if (response.data.msgtype === 'SUCCESS') {
            self.library = []
            self.$message({
              showClose: true,
              message: 'BOOK REMOVED SUCCESSFULLY',
              center: true,
              type: 'success'
            })
            self.loading = true
            setTimeout(function () {
              self.loading = false
              self.reload()
            }, 2000)
          } else {
            self.$message({
              showClose: true,
              message: 'PLEASE TRY AGAIN LATER',
              center: true,
              type: 'error'
            })
          }
        })
    },
    handleClose (done) {
      this.$confirm('ALL CHANGES WILL LOST, ARE YOU SURE TO QUIT?')
        .then(_ => {
          done()
        })
        .catch(_ => {})
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

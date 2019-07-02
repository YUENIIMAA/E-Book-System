<template>
  <div>
    <div class="login" v-show="showLogin">
      <el-form :model="userIdentity" :rules="loginRule" status-icon ref="userIdentity" label-position="left" label-width="0px" class="demo-ruleForm login-page">
        <div style="height: 40px"><h3>SIGN IN</h3></div>
        <el-form-item prop="username">
          <el-input type="text" v-model="userIdentity.username" auto-complete="off" placeholder="USERNAME"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="userIdentity.password" auto-complete="off" placeholder="PASSWORD"></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button type="primary" plain style="width: 100%" @click="handleSubmit">SUBMIT</el-button>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button plain style="width: 100%" @click="switchPannel">NOT A MEMBER YET? SIGN UP NOW!</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="login" v-show="showRegister">
      <el-form :model="newUserIdentity" :rules="registerRule" status-icon ref="userIdentity" label-position="left" label-width="0px" class="demo-ruleForm login-page">
        <div style="height: 40px"><h3>SIGN UP</h3></div>
        <el-form-item prop="username">
          <el-input type="text" v-model="newUserIdentity.username" auto-complete="off" placeholder="USERNAME"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input type="text" v-model="newUserIdentity.email" auto-complete="off" placeholder="EMAIL"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="newUserIdentity.password" auto-complete="off" placeholder="PASSWORD"></el-input>
        </el-form-item>
        <el-form-item prop="password2">
          <el-input type="password" v-model="newUserIdentity.password2" auto-complete="off" placeholder="COMFIRM PASSWORD"></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button type="primary" plain style="width: 100%" @click="handleSubmit">SUBMIT</el-button>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button plain style="width: 100%" @click="switchPannel">ALREADY REGISTERED? GO BACK!</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      showLogin: true,
      showRegister: false,
      userIdentity: {
        username: '',
        password: ''
      },
      loginRule: {
        username: [{required: true, message: 'please enter your account', trigger: 'blur'}],
        password: [{required: true, message: 'please enter your password', trigger: 'blur'}]
      },
      registerRule: {
        username: [{required: true, message: 'please enter your account', trigger: 'blur'}],
        password: [{required: true, message: 'please enter your password', trigger: 'blur'}],
        password2: [{required: true, message: 'please confirm your password', trigger: 'blur'}],
        email: [{required: true, message: 'please enter your email', trigger: 'blur'}]
      },
      newUserIdentity: {
        username: '',
        email: '',
        password: '',
        password2: ''
      }
    }
  },
  created () {
    if (this.$store.getters.getAllowLogin === false) {
      this.$message({
        showClose: true,
        message: 'PLEASE LOG OUT FIRST',
        center: true,
        type: 'warning'
      })
      this.$router.push({ path: '/' })
    }
  },
  methods: {
    switchPannel () {
      this.showLogin = !this.showLogin
      this.showRegister = !this.showRegister
    },
    handleSubmit (event) {
      let self = this
      if (this.showLogin === true) {
        let credentials = {'username': this.userIdentity.username, 'userpwd': this.userIdentity.password}
        this.axios.post('http://localhost:1127/api/login', credentials)
          .then(response => {
            console.log(response.data)
            if (response.data.msgtype === 'PASS') {
              if (response.data.msgcontent === 'admin') {
                self.$message({
                  showClose: true,
                  message: 'WELCOME BACK MY ADMINISTRATOR',
                  center: true,
                  type: 'success'
                })
                self.$store.dispatch('setActiveIndex', '1')
                self.$store.dispatch('setShowUserPanel', false)
                self.$store.dispatch('setShowAdminPanel', true)
                self.$store.dispatch('setAllowLogin', false)
                self.$store.dispatch('setUserstatus', 'admin')
                self.$store.dispatch('setUserid', '0')
                self.$store.dispatch('setUsername', self.userIdentity.username)
                self.$store.dispatch('setUserpwd', self.userIdentity.userpwd)
                self.$router.push({ path: '/' })
              } else {
                self.$message({
                  showClose: true,
                  message: 'WELCOME BACK MY FRIEND',
                  center: true,
                  type: 'success'
                })
                self.$store.dispatch('setActiveIndex', '1')
                self.$store.dispatch('setShowUserPanel', true)
                self.$store.dispatch('setShowAdminPanel', false)
                self.$store.dispatch('setAllowLogin', false)
                self.$store.dispatch('setUserstatus', 'user')
                self.$store.dispatch('setUserid', response.data.msgcontent)
                self.$store.dispatch('setUsername', self.userIdentity.username)
                self.$store.dispatch('setUserpwd', self.userIdentity.userpwd)
                self.$router.push({ path: '/' })
              }
            } else if (response.data.msgcontent === 'user disabled by admin') {
              self.$message({
                showClose: true,
                message: 'YOUR ACCOUNT HAS BEEN DISABLED',
                center: true,
                type: 'error'
              })
            } else {
              self.$message({
                showClose: true,
                message: 'YOUR CREDENTIALS ARE INVALID',
                center: true,
                type: 'error'
              })
            }
          })
      } else {
        let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if (!reg.test(this.newUserIdentity.email)) {
          self.$message({
            showClose: true,
            message: 'PLEASE CHECK YOUR EMAIL ADDRESS',
            center: true,
            type: 'error'
          })
          return
        }
        if (this.newUserIdentity.password !== this.newUserIdentity.password2) {
          self.$message({
            showClose: true,
            message: 'PLEASE CHECK YOUR PASSWORD',
            center: true,
            type: 'error'
          })
          return
        }
        this.axios.get('http://localhost:1127/api/checkusername?username=' + this.newUserIdentity.username)
          .then(response => {
            if (response.data.msgtype !== 'PASS') {
              self.$message({
                showClose: true,
                message: 'USERNAME NOT AVAILABLE',
                center: true,
                type: 'warning'
              })
            } else {
              const credentials = {'username': this.newUserIdentity.username, 'useremail': this.newUserIdentity.email, 'userpwd': this.newUserIdentity.password}
              this.axios.post('http://localhost:1127/api/register', credentials)
                .then(response => {
                  var msgcontent = response.data.msgcontent
                  if (response.data.msgtype === 'SUCCESS') {
                    self.$message({
                      showClose: true,
                      message: 'SUCCESS! ENJOY YOUR TIME HERE',
                      center: true,
                      type: 'success'
                    })
                    console.log(msgcontent)
                    self.$store.dispatch('setActiveIndex', '1')
                    self.$store.dispatch('setShowUserPanel', true)
                    self.$store.dispatch('setShowAdminPanel', false)
                    self.$store.dispatch('setAllowLogin', false)
                    self.$store.dispatch('setUserstatus', 'user')
                    self.$store.dispatch('setUserid', response.data.msgcontent)
                    self.$store.dispatch('setUsername', self.newUserIdentity.username)
                    self.$store.dispatch('setUserpwd', self.newUserIdentity.userpwd)
                    self.$router.push({ path: '/' })
                  } else {
                    self.$message({
                      showClose: true,
                      message: 'ERROR! PLEASE TRY AGAIN LATRER',
                      center: true,
                      type: 'error'
                    })
                  }
                })
            }
          })
      }
    }
  }
}
</script>

<style scoped>
  .login {
    width: 100%;
    height: 100%;
  }
  .login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 100px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
</style>

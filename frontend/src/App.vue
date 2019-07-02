<template>
  <el-container>
    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1" v-show="showUserPanel || showAdminPanel">HOME</el-menu-item>
        <el-menu-item index="2" v-show="showUserPanel">LIBRARY</el-menu-item>
        <el-menu-item index="3" v-show="showUserPanel">SHOPPING CART</el-menu-item>
        <el-menu-item index="4" v-show="showUserPanel">ORDERS</el-menu-item>
        <el-menu-item index="5" v-show="showUserPanel">ACCOUNT</el-menu-item>
        <el-menu-item index="6" v-show="allowLogin">LOG IN</el-menu-item>
        <el-menu-item index="7" v-show="showAdminPanel">MANAGE LIBRARY</el-menu-item>
        <el-menu-item index="8" v-show="showAdminPanel">MANAGE USERS</el-menu-item>
        <el-menu-item index="9" v-show="showAdminPanel">MANAGE ORDERS</el-menu-item>
        <el-menu-item index="10" v-show="showAdminPanel">STATISTICS</el-menu-item>
        <el-menu-item v-show="!allowLogin"><el-button plain @click="logout">SIGN OUT</el-button></el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view v-if="isRouterAlive"></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload,
      logout: this.forcelogout
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  created () {
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
    if (this.$store.getters.getUserStatus === 'user') {
      this.$store.dispatch('setActiveIndex', '1')
      this.$store.dispatch('setShowUserPanel', true)
      this.$store.dispatch('setShowAdminPanel', false)
      this.$store.dispatch('setAllowLogin', false)
    } else if (this.$store.getters.getUserStatus === 'admin') {
      this.$store.dispatch('setActiveIndex', '1')
      this.$store.dispatch('setShowUserPanel', false)
      this.$store.dispatch('setShowAdminPanel', true)
      this.$store.dispatch('setAllowLogin', false)
    } else {
      this.$store.dispatch('setActiveIndex', '6')
      this.$store.dispatch('setShowUserPanel', false)
      this.$store.dispatch('setShowAdminPanel', false)
      this.$store.dispatch('setAllowLogin', true)
      this.$router.push({ path: '/login' })
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
    forcelogout () {
      this.$store.dispatch('setActiveIndex', '6')
      this.$store.dispatch('setShowUserPanel', false)
      this.$store.dispatch('setShowAdminPanel', false)
      this.$store.dispatch('setAllowLogin', true)
      this.$store.dispatch('setUserstatus', 'guest')
      this.$store.dispatch('setUserid', '')
      this.$store.dispatch('setUsername', '')
      this.$store.dispatch('setUserpwd', '')
      this.$router.push({ path: '/login' })
    },
    logout () {
      this.$message({
        showClose: true,
        message: 'YOU HAVE BEEN LOGGED OUT',
        center: true,
        type: 'success'
      })
      this.$store.dispatch('setActiveIndex', '6')
      this.$store.dispatch('setShowUserPanel', false)
      this.$store.dispatch('setShowAdminPanel', false)
      this.$store.dispatch('setAllowLogin', true)
      this.$store.dispatch('setUserstatus', 'guest')
      this.$store.dispatch('setUserid', '')
      this.$store.dispatch('setUsername', '')
      this.$store.dispatch('setUserpwd', '')
      this.$router.push({ path: '/login' })
    },
    handleSelect (key, keyPath) {
      if (key === '1') { this.$router.push({ path: '/' }) }
      if (key === '2') { this.$router.push({ path: '/library' }) }
      if (key === '3') { this.$router.push({ path: '/shoppingcart' }) }
      if (key === '4') { this.$router.push({ path: '/orders' }) }
      if (key === '5') { this.$router.push({ path: '/account' }) }
      if (key === '6') { this.$router.push({ path: '/login' }) }
      if (key === '7') { this.$router.push({ path: '/managelibrary' }) }
      if (key === '8') { this.$router.push({ path: '/manageusers' }) }
      if (key === '9') { this.$router.push({ path: '/manageorders' }) }
      if (key === '10') { this.$router.push({ path: '/statistics' }) }
    }
  },
  computed: {
    activeIndex: function () {
      return this.$store.getters.getAI
    },
    showUserPanel: function () {
      return this.$store.getters.getSUP
    },
    showAdminPanel: function () {
      return this.$store.getters.getSAP
    },
    allowLogin: function () {
      return this.$store.getters.getAllowLogin
    }
  }
}
</script>

<style>
 * {
   font-family: 'Avenir', Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   margin: 0px;
 }
</style>

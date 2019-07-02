import Vue from 'vue'
import Router from 'vue-router'
// Shared Components
import Greetings from '@/components/Greetings'
import Login from '@/components/Login'
// User Components
import Library from '@/components/user/Library'
import ShoppingCart from '@/components/user/ShoppingCart'
import Orders from '@/components/user/Orders'
import Account from '@/components/user/Account'
// Admin Components
import ManageLibrary from '@/components/admin/ManageLibrary'
import ManageUsers from '@/components/admin/ManageUsers'
import ManageOrders from '@/components/admin/ManageOrders'
import Statistics from '@/components/admin/Statistics'
// import  from '@/components/'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'Greetings', component: Greetings},
    {path: '/login', name: 'Login', component: Login},
    {path: '/library', name: 'Library', component: Library},
    {path: '/shoppingcart', name: 'ShoppingCart', component: ShoppingCart},
    {path: '/orders', name: 'Orders', component: Orders},
    {path: '/account', name: 'Account', component: Account},
    {path: '/managelibrary', name: 'ManageLibrary', component: ManageLibrary},
    {path: '/manageusers', name: 'ManageUsers', component: ManageUsers},
    {path: '/manageorders', name: 'ManageOrders', component: ManageOrders},
    {path: '/statistics', name: 'Statistics', component: Statistics}
    // {path: '/', name: '', component: },
  ]
})

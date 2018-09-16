import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import WebStudy from '@/views/webStudy'
import Home from '@/views/Home'
import Chicken from '@/views/Chicken'
import Fenglin from '@/views/Fenglin'
import Admin from '@/views/Admin'
import Users from '@/views/Admin/Users'
import Sort from '@/views/Admin/Sort'
import Article from '@/views/Admin/Article'
import Details from '@/components/Details'
Vue.use(Router)

export default new Router({
  mode : 'history',
  routes: [
    {
      path : '/',
      name : 'Index',
      component : Home,

    },
    {
      path : '/home',
      name : 'Home',
      component : Home
    },
    {
      path: '/study',
      name: 'WebStudy',
      component: WebStudy
    },
    {
      path : '/chicken',
      name : 'Chicken',
      component : Chicken
    },
    {
      path : '/fenglin',
      name : 'Fenglin',
      component : Fenglin
    },
    {
      path : '/admin',
      name : 'Admin',
      component : Admin,
      children : [
        {
          path : '/',
          name : 'Users',
          component : Users
        },
        {
          path : 'users',
          name : 'Users',
          component : Users
        },
        {
          path : 'sort',
          name : 'Sort',
          component : Sort
        },
        {
          path : 'article',
          name : 'Article',
          component : Article
        }

      ]
    },
    {
      path : '/details',
      name : 'Details',
      component : Details
    }
  ]
})

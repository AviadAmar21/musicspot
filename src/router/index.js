import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/views/Login";
import Register from "@/views/Register";
import SignIn from "@/views/SignIn";

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },

  {
    path: '/',
    name: 'Login',
    component: Login
  },

  {
    path: '/register',
    name: 'Register',
    component: Register
  },

  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },


  {
    path: '/edit/profile/:id',
    name: 'EditProfile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/EditProfile.vue')
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

  {
    path: '/admin',
    name: 'AdminManage',
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminManage.vue')


  },

  {
    path: '/profile/:id',
    name: 'ShowProfile',
    component: () => import(/* webpackChunkName: "about" */ '../views/ShowProfile.vue')
  }


]

const router = new VueRouter({
  routes
})

export default router

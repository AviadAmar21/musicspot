import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/views/Login";
import Register from "@/views/Register";
import SignIn from "@/views/SignIn";
import firebaseInstance from '../middleware/firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta : {authNotRequired: false}
  },

  {
    path: '/',
    name: 'Login',
    component: Login,
    meta : {authNotRequired: true}

  },


  {
    path: '/edit/profile/:id',
    name: 'EditProfile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/EditProfile.vue'),
    meta : {authNotRequired: false}
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta : {authNotRequired: true}

  },

  {
    path: '/admin',
    name: 'AdminManage',
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminManage.vue'),
    meta : {authNotRequired: false}

  },

  {
    path: '/feed',
    name: 'Feed',
    component: () => import(/* webpackChunkName: "about" */ '../views/Feed.vue'),
    meta : {authNotRequired: false}

  },

  {
    path: '/upload-post',
    name: 'uploadPost',
    component: () => import(/* webpackChunkName: "about" */ '../views/uploadPost.vue'),
    meta : {authNotRequired: false}

  },

  {
    path: '/scraper',
    name: 'scraper',
    component: () => import('../views/scraper'),
    meta : {authNotRequired: false}

  },

  {
    path: '/profile/:id',
    name: 'ShowProfile',
    component: () => import(/* webpackChunkName: "about" */ '../views/ShowProfile.vue'),
    meta : {authNotRequired: false}

  }


]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next) => {
  const user = firebaseInstance.firebase.auth().currentUser;
  if (user && to.meta.authNotRequired || !user && !to.meta.authNotRequired) {
    const path = !user ? '/' : `/home`;
    return next(path);
  }
  next();
})


export default router

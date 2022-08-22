import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'LoginForm',
    meta: {layout: 'empty'},
    component: () => import('../views/LoginForm.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {layout: 'empty'},
    component: () => import('../views/RegisterForm.vue')
  },
  {
    path: '/',
    name: 'home',
    meta: {layout: 'main', auth: true},
     component: () => import('../views/HomeFin.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {layout: 'main', auth: true},
     component: () => import('../views/CategoriesFin.vue')
  },
  {
    path: '/detailrecord/:id',
    name: 'detailrecord',
    meta: {layout: 'main', auth: true},
     component: () => import('../views/DetailRecord.vue')
  },
  {
    path: '/history',
    name: 'history',
    meta: {layout: 'main', auth: true},
     component: () => import('../views/HistoryFin.vue')
  },
  {
    path: '/planning',
    name: 'planning',
    meta: {layout: 'main', auth: true},
     component: () => import('../views/PlanningFin.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {layout: 'main', auth: true},
     component: () => import('../views/ProfileFin.vue')
  },
  {
    path: '/record',
    name: 'record',
    meta: {layout: 'main', auth: true},
     component: () => import('../views/RecordFin.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next)=> {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)
  if(requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router

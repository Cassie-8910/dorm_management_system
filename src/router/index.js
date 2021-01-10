import Vue from 'vue'
import VueRouter from 'vue-router'
import DormManagement from '../components/DormManagement'
import DormInfo from '../components/DormInfo'
import SystemConfig from '../components/SystemConfig'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/Login')
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/home/dormManagement',
    component: () => import('../views/Home'),
    children: [
      {
        path: '/home/dormManagement',
        name: 'dormManagement',
        component: DormManagement
      },
      {
        path: '/home/dormInfo',
        name: 'dormInfo',
        component: DormInfo
      },
      {
        path: '/home/systemConfig',
        name: 'systemConfig',
        component: SystemConfig
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

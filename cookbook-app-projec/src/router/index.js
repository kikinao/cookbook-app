import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FavoriteView from '../views/FavoriteView.vue'
import UserView from '../views/UserView.vue'
import RegisterView from '../views/RegisterView.vue'
import RecommendView from '../views/HomeChildren/RecommendView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    redirect: '/home/recommend',
    children: [
      {
        path: 'recommend',
        name: 'recommend',
        component: RecommendView
      },
      {
        path: 'note',
        name: 'note',
        component: () => import('../views/HomeChildren/NoteView.vue')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('../views/HomeChildren/VideoView.vue')
      },
      {
        path: 'activity',
        name: 'activity',
        component: () => import('../views/HomeChildren/ActivityView.vue')
      },
      {
        path: 'attention',
        name: 'attention',
        component: () => import('../views/HomeChildren/AttentionView.vue')
      },
    ]
  },
  {
    path: '/favorite',
    name: 'favorite',
    component: FavoriteView
  },
  {
    path: '/user',
    name: 'user',
    component: UserView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/cookmenu',
    name: 'cookmenu',
    component: () => import('../views/CookMenuView.vue'),
    children: [
      {
        props: true,
        path: 'menulist/id=:id',
        name: 'menulist',
        component: () => import('../views/CookMenuChildren/MenuListView.vue')
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'router-active',
  linkExactActiveClass: 'router-exact-active',
  routes
})

export default router

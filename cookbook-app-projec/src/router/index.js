import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FavoriteView from '../views/FavoriteView.vue'
import UserView from '../views/UserView.vue'
import AuthorizationView from '../views/AuthorizationView.vue'
import RecommendView from '../views/HomeChildren/RecommendView.vue'
import SearchView from '../views/SearchView.vue'
import SearchResult from '../views/SearchChildren/SearchResult.vue'
import CookDetailsView from '../views/CookDetailsView.vue'

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
    component: FavoriteView,
    children: [
      {
        path: 'setfavorite',
        name: 'setfavorite',
        component: () => import('../views/FavoriteChildren/SetFavoriteView.vue')
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: UserView
  },
  {
    path: '/authorization',
    name: 'authorization',
    component: AuthorizationView,
    // redirect: '/authorization/login',
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('../views/AuthorizationChildren/LoginView.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('../views/AuthorizationChildren/RegisterView.vue')
      }
    ]
  },
  {
    path: '/cookmenu',
    name: 'cookmenu',
    component: () => import('../views/CookMenuView.vue'),
    redirect: '/cookmenu/menulist/1',
    children: [
      {
        props: true,
        path: 'menulist/:id',
        name: 'menulist',
        component: () => import('../views/CookMenuChildren/MenuListView.vue')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView,
    children: [
      {
        props: true,
        path: 'searchresult:kw',
        name: 'searchresult',
        component: SearchResult,
        redirect: '/search/searchresult:kw/resultshow0',
        children: [
          {
            props: true,
            path: 'resultshow:order',
            name: 'resultshow',
            component: () => import('../views/SearchChildren/ResultShowView.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/cookdetails:id',
    props: true,
    name: 'cookdetails',
    component: CookDetailsView,
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

router.beforeEach((to, from, next) => {
  const { name } = to;

  if (name == 'favorite' || name == 'user') {
    let token = localStorage.token;

    if (token) {
      next();
    } else {
      next({ name: 'authorization', params: to })
    }

  } else {
    next();
  }

})

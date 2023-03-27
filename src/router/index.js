import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'
// 下面是路由配置
const router = createRouter({
  // 这是vue3.0的新特性，可以直接使用import.meta.env.BASE_URL
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'Home',
          component: () => import('../views/Home.vue'),
          meta: {
            transitionName: 'bottom-rising',
          },
        },
        {
          path: '/playlist',
          name: 'Playlist',
          component: () => import('../views/Playlist.vue'),
          meta: {
            transitionName: 'top-bottom',
          },
        },
        {
          path: '/search',
          name: 'Search',
          component: () => import('../views/Search.vue'),
          meta: {
            transitionName: 'rightToLeft',
          },
        },
        {
          path: '/user',
          name: 'User',
          // 这里是路由守卫，如果用户没有登录，就跳转到登录页面
          beforeEnter: (to, from, next) => {
            const user = useUserStore()
            if (user.isLogin) {
              next()
            } else {
              next('/login')
            }
          },
          component: () => import('../views/User.vue'),
        },
        {
          path: '/login',
          name: 'Login',
          component: () => import('../views/Login.vue'),
          meta: {
            transitionName: 'bottom-rising',
          },
        },
      ],
    },
  ],
})

export default router

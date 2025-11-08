import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/posts',
      name: 'posts',
      component: () => import('@/views/PostsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/posts/create',
      name: 'create-post',
      component: () => import('@/views/CreatePostView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/posts/:id/edit',
      name: 'edit-post',
      component: () => import('@/views/EditPostView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  console.log('Navigation from:', from.path, 'to:', to.path)
  console.log('Is authenticated:', authStore.isAuthenticated)

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    console.log('Redirecting to login')
    next('/login')
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    console.log('Redirecting to posts')
    next('/posts')
  } else {
    console.log('Allowing navigation')
    next()
  }
})
export default router

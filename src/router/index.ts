import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user.store.ts'
import AuthAPI from '@/api/AuthAPI.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { requiresAuth: true },
      component: () => import('@/modules/home/views/HomeView.vue'),
    },
    {
      path: '/:id',
      redirect: { name: 'fixed' },
      meta: { requiresAuth: true },
      component: () => import('@/modules/expenses/layouts/AppLayout.vue'),
      children: [
        {
          path: 'fixed',
          name: 'fixed',
          component: () => import('@/modules/expenses/views/FixedExpensesView.vue'),
        },
        {
          path: 'variable',
          name: 'variable',
          component: () => import('@/modules/expenses/views/VariableExpensesView.vue'),
        },
        {
          path: 'cash',
          name: 'cash',
          component: () => import('@/modules/expenses/views/CashExpensesView.vue'),
        },
        {
          path: 'income',
          name: 'income',
          component: () => import('@/modules/expenses/views/IncomeView.vue'),
        },
        {
          path: 'summary',
          name: 'summary',
          component: () => import('@/modules/expenses/views/SummaryView.vue'),
        },
      ],
    },
    {
      path: '/auth',
      name: 'auth',
      redirect: { name: 'login' },
      component: () => import('@/modules/auth/layouts/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/modules/auth/views/LoginView.vue'),
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/modules/auth/views/RegisterView.vue'),
        },
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  if (requiresAuth) {
    try {
      await AuthAPI.auth()
      if (!userStore.user) {
        await userStore.initUser()
      }
      next()
    } catch (error) {
      console.log(error)
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router

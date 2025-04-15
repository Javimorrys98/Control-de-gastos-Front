import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/:id',
      redirect: { name: 'fixed' },
      component: () => import('@/layouts/AppLayout.vue'),
      children: [
        {
          path: 'fixed',
          name: 'fixed',
          component: () => import('@/views/FixedExpensesView.vue')
        },
        {
          path: 'variable',
          name: 'variable',
          component: () => import('@/views/VariableExpensesView.vue')
        },
        {
          path: 'cash',
          name: 'cash',
          component: () => import('@/views/CashExpensesView.vue')
        },
        {
          path: 'income',
          name: 'income',
          component: () => import('@/views/IncomeView.vue')
        },
        {
          path: 'summary',
          name: 'summary',
          component: () => import('@/views/SummaryView.vue')
        }
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      redirect: { name: 'login' },
      component: () => import('@/layouts/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/LoginView.vue')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/RegisterView.vue')
        }
      ]
    }
  ],
})

export default router

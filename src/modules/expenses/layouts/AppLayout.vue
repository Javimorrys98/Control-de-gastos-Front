<script setup lang="ts">
import SideMenu from '@/modules/expenses/components/SideMenu.vue'
import TopMenu from '@/modules/expenses/components/TopMenu.vue'
import { useUserStore } from '@/stores/user.store'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const userStore = useUserStore()
</script>

<template>
  <div class="flex flex-col">
    <!-- Top menu -->
    <TopMenu @logout="userStore.logout" />
    <main class="flex flex-row">
      <!-- Side menu -->
      <SideMenu />
      <!-- RouterView -->
      <RouterView :key="$route.fullPath" />
    </main>
  </div>
</template>

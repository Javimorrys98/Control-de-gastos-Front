<script setup lang="ts">
import SideMenu from '@/modules/expenses/components/SideMenu.vue'
import TopMenu from '@/modules/expenses/components/TopMenu.vue'
import { useUserStore } from '@/stores/user.store'

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
      <RouterView />
    </main>
  </div>
</template>

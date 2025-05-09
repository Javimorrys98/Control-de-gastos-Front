<script setup lang="ts">
import HomeTopBar from '../components/HomeTopBar.vue'
import { useUserStore } from '@/stores/user.store'

const userStore = useUserStore()
</script>

<template>
  <div class="flex flex-col">
    <!-- Top menu -->
    <HomeTopBar @logout="userStore.logout" />
    <main>
      <!-- RouterView -->
      <RouterView />
    </main>
  </div>
</template>

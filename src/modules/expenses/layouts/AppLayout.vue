<script setup lang="ts">
import SideMenu from '@/modules/expenses/components/SideMenu.vue'
import TopMenu from '@/modules/expenses/components/TopMenu.vue'
</script>

<template>
  <div class="flex flex-col">
    <!-- Top menu -->
    <TopMenu />
    <main class="flex flex-row">
      <!-- Side menu -->
      <SideMenu />
      <!-- RouterView -->
      <RouterView />
    </main>
  </div>
</template>

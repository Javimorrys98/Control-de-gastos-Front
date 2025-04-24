<script setup lang="ts">
import SideMenu from '@/components/SideMenu.vue'
import TopMenu from '@/components/TopMenu.vue'
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

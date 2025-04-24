<script lang="ts" setup></script>

<template>
  <div class="bg-gray-100 flex justify-center items-center h-screen">
    <div class="w-1/2 h-screen hidden lg:block">
      <img class="object-cover w-full h-full" src="../../../assets/1.png" alt="" />
    </div>
    <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import CNav from '@/components/Nav/index.vue'
import CUserBar from '@/components/UserBar/index.vue'
</script>

<template>
  <nav>
    <c-nav></c-nav>
    <c-user-bar></c-user-bar>
  </nav>
  <main>
    <router-view></router-view>
  </main>
</template>

<style scoped>
nav {
  position: relative;
  display: flex;
  padding: 1em 2em;
  justify-content: center;
  align-items: center;
}
</style>

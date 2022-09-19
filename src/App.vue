<script setup lang="ts">
import Layout from '@/layout/index.vue'
import CNav from '@/components/Nav/index.vue'
import CWallet from '@/components/Wallet/index.vue'
</script>

<template>
  <nav>
    <c-nav></c-nav>
    <c-wallet></c-wallet>
  </nav>
  <main>
    <layout></layout>
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

<!-- 
  本文件中并无太多需要赘述的逻辑
  导入了两个自定义组件，使用 router-view 渲染子组件
 -->

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

<!-- 接下来请阅读 ./components/* -->

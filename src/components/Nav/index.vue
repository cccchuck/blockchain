<script setup lang="ts">
import { useRouter, RouteRecordRaw } from 'vue-router'

const router = useRouter()

const isActive = (route: RouteRecordRaw) => {
  return route.path === router.currentRoute.value.fullPath
}

const generateNavList = () => {
  let result: RouteRecordRaw[] = []
  const routes = router.getRoutes()
  routes.forEach((e) => {
    if (e.children.length > 0) {
      result = e.children.filter((item) => {
        if (item.meta) return !item.meta.hidden
      })
    }
  })
  return result
}

const navList: RouteRecordRaw[] = generateNavList()
</script>

<template>
  <div class="c-nav-menu">
    <div
      v-for="item in navList"
      :key="item.path"
      @click="router.push(item.path)"
      class="c-nav-menu-item"
      :class="{ active: isActive(item) }"
    >
      {{ item.meta?.title }}
    </div>
  </div>
</template>

<style scoped>
.c-nav-menu {
  display: flex;
}

.c-nav-menu .c-nav-menu-item {
  margin: 0 0.5em;
  padding: 0.5em 0;
  width: 5em;
  text-align: center;
  border-radius: 0.5em;
}

.c-nav-menu .c-nav-menu-item:hover {
  font-weight: bold;
  background-color: var(--color-bg-light);
  cursor: pointer;
}

.c-nav-menu .c-nav-menu-item.active {
  font-weight: bold;
  background-color: var(--color-bg-normal);
}
</style>

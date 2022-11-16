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
  font-size: 1.2em;
  padding: 0 1em;
  background-color: #ffffff;
  border-radius: 2em;
}

.c-nav-menu .c-nav-menu-item {
  width: 5em;
  padding: 0.8em 0;
  font-weight: bold;
  text-align: center;
  transition: all 200ms linear;
}

.c-nav-menu .c-nav-menu-item:hover {
  transform: scale(1.1);
  cursor: pointer;
}

.c-nav-menu .c-nav-menu-item.active {
  font-weight: bold;
  color: #156dff;
}
</style>

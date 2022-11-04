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
  padding: 0 1em;
  background-color: #ffffff;
  border-radius: 1em;
  box-shadow: 0 1px 10px 0 rgba(255, 255, 255, 0.6);
}

.c-nav-menu .c-nav-menu-item {
  padding: 1em 0;
  width: 5em;
  text-align: center;
  border-radius: 0.5em;
  transition: all 200ms linear;
}

.c-nav-menu .c-nav-menu-item:hover {
  font-weight: bold;
  cursor: pointer;
}

.c-nav-menu .c-nav-menu-item.active {
  font-weight: bold;
  color: #156dff;
}
</style>

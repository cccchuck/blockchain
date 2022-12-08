<!-- 该组件为自定义导航组件 -->
<script setup lang="ts">
import { useRouter, RouteRecordRaw } from 'vue-router'

// 获取到在 @/router/index.ts 中定义的 router 对象
const router = useRouter()

// 判断当前传入的路由路径是否与当前页面路由路径相等
// 主要用于在路径相等时，切换某个 nav-item 为选中状态
const isActive = (route: RouteRecordRaw) => {
  return route.path === router.currentRoute.value.fullPath
}

// 遍历所有路由，找到需要在导航栏显示的路由，并在下面渲染
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

// 所有需要渲染在导航栏的路由
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

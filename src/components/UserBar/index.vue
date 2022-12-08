<!-- 
  该组件为导航栏旁边的用户组件，负责登录、注册、退出等
 -->
<script setup lang="ts">
// 引入在 @/router/index.ts 中定义的路由
import router from '@/router'
// 引入 mounted 生命周期钩子
import { onMounted } from 'vue'

// 引入获取用户信息 API
import { APIGetUserInfo } from '@/api/users'
// 引入 pinia 全局状态管理库和 user store
import pinia, { useUserStore } from '@/store'
// 引入工具函数 getAuthToken 和 getUID
import { getAuthToken, getUID } from '@/utils/auth'

// 获取 user store
const userStore = useUserStore(pinia)

// 获取 user store 中的用户信息，userStore 为响应式对象
const userInfo = userStore.userInfo

// 在组件被挂载时，执行下面函数去获取用户信息
// 如果用户登录没过期，则直接拉取用户信息
onMounted(async () => {
  if (!userStore.userInfo.token) {
    if (getAuthToken() !== '' && getUID() !== null) {
      const userInfo: any = await APIGetUserInfo({ uid: getUID() as number })
      if (userInfo)
        userStore.login(userInfo.username, userInfo.uid, getAuthToken())
    }
  }
})
</script>

<template>
  <div class="c-user-bar">
    <div v-show="userInfo.token !== ''" class="c-user-bar__item">
      <div class="c-user-bar__info">
        <p class="c-user-bar__username">{{ userInfo.username }}</p>

        <span class="c-user-bar__logout" @click="userStore.logout()"
          ><img src="@/assets/icon/logout.svg" alt="logout"
        /></span>
      </div>
    </div>
    <div v-show="userInfo.token === ''">
      <div class="c-user-bar__login">
        <a-button
          type="primary"
          shape="round"
          size="large"
          @click="router.push('/sign-in')"
          >Log in</a-button
        >
      </div>
    </div>
  </div>
</template>

<style>
.c-user-bar {
  position: absolute;
  right: 2em;
  display: flex;
  align-items: center;
}

.c-user-bar .c-user-bar__item {
  display: flex;
  font-size: 1.2em;
  padding: 0.8em 2em;
  border-radius: 2em;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}

.c-user-bar .c-user-bar__info {
  display: flex;
  align-items: center;
  transition: all 200ms linear;
}
.c-user-bar .c-user-bar__info .c-user-bar__wallet,
.c-user-bar .c-user-bar__info .c-user-bar__logout {
  width: 1.25em;
  height: 1.25em;
}

.c-user-bar .c-user-bar__info .c-user-bar__wallet img,
.c-user-bar .c-user-bar__info .c-user-bar__logout img {
  width: 1.25em;
  height: 1.25em;
  transition: all 200ms linear;
}

.c-user-bar .c-user-bar__info .c-user-bar__wallet img:hover,
.c-user-bar .c-user-bar__info .c-user-bar__logout img:hover {
  cursor: pointer;
  transform: translateY(-2px);
}

.c-user-bar .c-user-bar__info .c-user-bar__username {
  font-weight: bold;
}

.c-user-bar .c-user-bar__info * + * {
  margin-left: 1em;
}
</style>

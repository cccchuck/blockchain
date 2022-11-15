<script setup lang="ts">
import { APIGetUserInfo } from '@/api/users'
import router from '@/router'
import pinia, { useUserStore } from '@/store'
import { getAuthToken, getUID } from '@/utils/auth'
import { onMounted } from 'vue'

const userStore = useUserStore(pinia)

const userInfo = userStore.userInfo

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
    <a-popover position="br">
      <div v-show="userInfo.token !== ''" class="c-user-bar__item">
        <div class="c-user-bar__info">
          <p>{{ userInfo.username }}</p>
          <span>
            <icon-caret-down />
          </span>
        </div>
      </div>
      <template #content>
        <p class="c-user-bar__pop-item">Wallet</p>
        <a-button type="primary" shape="round" status="danger"
          >Log Out</a-button
        >
      </template>
    </a-popover>

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
  padding: 1em;
  border-radius: 1em;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}

.c-user-bar .c-user-bar__info {
  display: flex;
  align-items: center;
  transition: all 200ms linear;
}

.c-user-bar .c-user-bar__info:hover {
  cursor: pointer;
}

.c-user-bar .c-user-bar__info:hover p {
  font-weight: bold;
}
.c-user-bar .c-user-bar__info:hover span {
  rotate: -180deg;
}

/* .c-user-bar .c-user-bar__info:hover */

.c-user-bar .c-user-bar__info p {
  width: 4em;
  color: #888888;
  text-align: center;
  font-size: 16px;
  transition: all 200ms linear;
}

.c-user-bar .c-user-bar__info span {
  color: #888888;
  font-size: 18px;
  transition: all 200ms linear;
}

.c-user-bar .c-user-bar__info * + * {
  margin-left: 0.5em;
}
</style>

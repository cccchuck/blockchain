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

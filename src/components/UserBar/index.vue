<script setup lang="ts">
import { getAuthToken } from '@/utils/auth'
import { ref } from 'vue'

const isLogin = getAuthToken() !== ''

const userInfo = ref({
  username: 'Chuck',
  avatar: '',
  notice: [],
})
</script>

<template>
  <div class="c-user-bar">
    <div v-if="isLogin" class="flex flex-x-center flex-y-center">
      <div class="c-user-bar__notice">
        <icon-notification />
      </div>
      <div class="c-user-bar__info">
        <a-avatar
          :style="{ backgroundColor: '#156DFF' }"
          v-if="!userInfo.avatar"
          >{{ userInfo.username }}</a-avatar
        >
        <a-avatar v-else>
          <img alt="avatar" :src="userInfo.avatar" />
        </a-avatar>
        <p>{{ userInfo.username }}</p>
        <icon-caret-down />
      </div>
    </div>
    <div v-else>
      <div class="c-user-bar__login">
        <a-button type="primary" shape="round" size="large">Log in</a-button>
      </div>
    </div>
  </div>
</template>

<style>
.flex {
  display: flex;
}

.flex-x-center {
  justify-content: center;
}

.flex-y-center {
  align-items: center;
}

.c-user-bar {
  position: absolute;
  right: 2em;
  display: flex;
  align-items: center;
}

.c-user-bar .c-user-bar__info {
  display: flex;
}
</style>

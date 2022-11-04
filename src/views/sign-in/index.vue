<script lang="ts" setup>
import { Message, Notification } from '@arco-design/web-vue'
import { ref } from 'vue'
import Loading from '@/components/Loading/index.vue'
import router from '@/router'
import { setAuthToken } from '@/utils/auth'

const loading = ref(false)

const form = ref({
  username: '',
  password: '',
})

const validator = () => {
  if (form.value.username.length === 0) {
    Notification.warning("Username can't be empty.")
    return false
  }

  if (form.value.password.length === 0) {
    Notification.warning("Password can't be empty.")
    return false
  }

  return true
}

const handleSignIn = () => {
  if (!validator()) return

  loading.value = true

  setTimeout(() => {
    loading.value = false
    Message.success('Login Successfully, will redirect...')
    setAuthToken('Test Token')
    router.push('/')
  }, 2000)
}
</script>

<template>
  <div class="sign-in-page">
    <loading :loading="loading"></loading>

    <div class="sign-in fade-in-bottom">
      <h1 class="text-center">Sign In</h1>
      <a-form :model="form" layout="vertical">
        <a-form-item field="name" label="Username">
          <a-input
            v-model="form.username"
            placeholder="please enter your username..."
          />
        </a-form-item>
        <a-form-item field="post" label="Password">
          <a-input-password
            v-model="form.password"
            placeholder="please enter your password..."
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" long @click="handleSignIn">Sign In</a-button>
        </a-form-item>
      </a-form>
      <p class="text-center tip-text">
        Forget password ?
        <a-link @click="$router.push('/reset-pwd')">Reset Password</a-link>
      </p>
      <p class="text-center tip-text">
        Not have an account ?
        <a-link @click="$router.push('/sign-up')">Create Account</a-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.sign-in-page {
  padding-top: 20vh;
  width: 100vw;
  height: 100vh;
}

.sign-in {
  margin: 0 auto;
  padding: 2em;
  padding-top: 1.33em;
  width: 30vw;
  border-radius: 1em;
  background-color: #fff;
}
</style>

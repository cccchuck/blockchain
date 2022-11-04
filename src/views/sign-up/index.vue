<script lang="ts" setup>
import { Message, Notification } from '@arco-design/web-vue'
import { ref } from 'vue'

import Loading from '@/components/Loading/index.vue'

const loading = ref(false)
const form = ref({
  username: '',
  password: '',
  email: '',
})

const validateUsername = () => {
  return form.value.username.length >= 5
}

const validatePassword = () => {
  const reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,16}$/
  return reg.test(form.value.password)
}

const validateEmail = () => {
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return reg.test(form.value.email)
}

const validator = () => {
  if (!validateUsername()) {
    Notification.warning({
      title: 'Username format error',
      content: 'Username length should greater than 5',
    })
    return false
  }

  if (!validatePassword()) {
    Notification.warning({
      title: 'Password format error',
      content:
        'Password should include A-Z, a-z, 0-9, (.!@#$%^&*) and length greater than 8 and less than 10',
      duration: 5000,
    })
    return false
  }

  if (!validateEmail()) {
    Notification.warning('Email format error')
    return false
  }

  return true
}

const handleSignUp = () => {
  if (!validator()) return

  loading.value = true

  setTimeout(() => {
    loading.value = false
    Message.success('Sign Up Success')
  }, 2000)
}
</script>

<template>
  <div class="sign-up-page">
    <loading :loading="loading"></loading>
    <div class="sign-up fade-in-bottom">
      <div class="sign-up__side-left">
        <h1>Create Account</h1>
        <a-form :model="form" layout="vertical">
          <a-form-item
            field="name"
            label="Username"
            extra="username length should greater or equal 5"
          >
            <a-input
              v-model="form.username"
              placeholder="please enter your username..."
            />
          </a-form-item>
          <a-form-item
            field="post"
            label="Password"
            extra="password should includes A-Z, a-z, 0-9 and one of (.!@#$%^&*)"
          >
            <a-input-password
              v-model="form.password"
              placeholder="please enter your password..."
            />
          </a-form-item>
          <a-form-item field="post" label="Email">
            <a-input
              v-model="form.email"
              placeholder="please enter your email..."
            />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" long @click="handleSignUp"
              >Sign Up</a-button
            >
          </a-form-item>
        </a-form>
        <p class="text-center tip-text">
          Already has account ?
          <a-link @click="$router.push('/sign-in')">Sign in</a-link>
        </p>
      </div>
      <div class="sign-up__side-right">
        <img src="@/assets/sign-up.png" alt="Sign Up" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.sign-up-page {
  padding-top: 20vh;
  width: 100vw;
  height: 100vh;
}

.sign-up {
  margin: 0 auto;
  display: flex;
  width: 50vw;
  border-radius: 1em;
  background-color: #fff;
}

.sign-up__side-left {
  padding: 2em;
  padding-top: 1.33em;
  flex: 1;
}

.sign-up__side-right {
  padding: 5em 2em;
  border-top-right-radius: 1em;
  border-bottom-right-radius: 1em;
  background-color: #165dff;
}

.sign-up__side-right img {
  width: 300px;
}
</style>

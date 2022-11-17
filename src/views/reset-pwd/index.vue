<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { computed } from '@vue/reactivity'
import { Message, Notification } from '@arco-design/web-vue'

import { APIResetPwd, APISendCode } from '@/api'
import Loading from '@/components/Loading/index.vue'

const router = useRouter()

const loading = ref(false)
const isWaitCode = ref(false)
const waitSecs = ref(60)

const form = ref({
  code: '',
  email: '',
  username: '',
  password: '',
})

const getBtnText = computed(() => {
  if (isWaitCode.value) {
    return `Wait ${waitSecs.value} s`
  } else {
    return 'Send Code'
  }
})

const validateEmail = () => {
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return reg.test(form.value.email)
}

const validatePassword = () => {
  const reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,16}$/
  return reg.test(form.value.password)
}

const validatorForSendCode = () => {
  if (!validateEmail()) {
    Notification.warning('Email format error')
    return false
  }

  return true
}

const validatorForReset = () => {
  if (!validateEmail()) {
    Notification.warning('Email format error')
    return false
  }

  if (form.value.code.length === 0 || form.value.code.length !== 6) {
    Notification.warning('Security Code format error')
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

  return true
}

const updateWaitStatus = async () => {
  isWaitCode.value = true
  const intervalID = setInterval(() => {
    if (waitSecs.value > 0) {
      waitSecs.value = waitSecs.value - 1
    } else {
      isWaitCode.value = false
      waitSecs.value = 60
      clearInterval(intervalID)
    }
  }, 1000)
}

const handleSendCode = async () => {
  if (!validatorForSendCode()) return

  const msg = Message.loading('Sending Security Code')

  const result = await APISendCode({
    username: form.value.username,
    email: form.value.email,
  })

  msg.close()
  if (result !== null) {
    Message.success('Check Security Code in your box')
    updateWaitStatus()
  }
}

const handleResetPassword = async () => {
  if (!validatorForReset()) return

  loading.value = true

  const result = await APIResetPwd({
    username: form.value.username,
    password: form.value.password,
    code: form.value.code,
  })

  loading.value = false
  if (result !== null) {
    Message.success('Reset password successfully')
    router.push({ path: '/sign-in' })
  }
}
</script>

<template>
  <div class="sign-in-page">
    <loading :loading="loading"></loading>

    <div class="sign-in fade-in-bottom">
      <h1 class="text-center">Reset Password</h1>
      <a-form :model="form" layout="vertical">
        <a-form-item label="Username">
          <a-input
            v-model="form.username"
            placeholder="please enter your username..."
          />
        </a-form-item>
        <a-form-item label="Email">
          <a-input
            v-model="form.email"
            placeholder="please enter your email address..."
          />
        </a-form-item>
        <a-form-item label="Security Code">
          <a-input-search
            search-button
            v-model="form.code"
            placeholder="Please enter verify code"
            :button-text="getBtnText"
            :button-props="{ disabled: isWaitCode }"
            @search="handleSendCode"
          />
        </a-form-item>
        <a-form-item label="New Password">
          <a-input-password
            v-model="form.password"
            placeholder="please enter your new password..."
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" long @click="handleResetPassword()"
            >Reset</a-button
          >
        </a-form-item>
      </a-form>
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

<script lang="ts" setup>
import { ref, Ref, onMounted } from 'vue'
import pinia, { useTokenStore } from '@/store'

import { getAuthToken, getUID } from '@/utils/auth'
import { Notification } from '@arco-design/web-vue'

import type { IToken } from './types'
import { APIGetTokenBalance } from '@/api'

const tokenStore = useTokenStore(pinia)

const props = defineProps({
  forbidden: Boolean,
  token: Object,
})
const emit = defineEmits(['enter-token', 'enter-number'])

const tokenList: Ref<IToken[]> = ref([])

const tokenInfo = ref({
  id: props.token?.id,
  logo: props.token?.logo,
  name: props.token?.name,
  balance: 0.0,
})

const swapNumber = ref(0.0)

const modalVisible = ref(false)

const getTokenBalance = async () => {
  const result = await APIGetTokenBalance({
    uid: getUID() as number,
    tokenId: tokenInfo.value.id,
  })
  if (result) {
    tokenInfo.value.balance = (result as any).balance
  }
}

const handleModalOk = () => {
  modalVisible.value = false
}

const handleModalCancel = () => {
  modalVisible.value = false
}

const handleSelectClick = () => {
  if (!getAuthToken()) {
    Notification.error({
      title: 'Error',
      content: 'Should Login First',
    })
  } else {
    tokenList.value = tokenStore.tokenList
    modalVisible.value = true
  }
}

const handleSelectToken = async (token: IToken) => {
  tokenInfo.value.id = token.id
  tokenInfo.value.name = token.name
  tokenInfo.value.logo = token.logo
  modalVisible.value = false
  await getTokenBalance()
  emit(
    'enter-token',
    tokenInfo.value.id,
    tokenInfo.value.name,
    tokenInfo.value.logo
  )
}

const handleMax = () => {
  swapNumber.value = tokenInfo.value.balance
  emit('enter-number', tokenInfo.value.id, swapNumber.value)
}

const handleBlur = () => {
  emit('enter-number', tokenInfo.value.id, swapNumber.value)
}

onMounted(async () => {
  await getTokenBalance()
})
</script>

<template>
  <div class="c-token-form">
    <div class="c-token-form__form">
      <div class="c-token-form__select" @click="handleSelectClick">
        <img class="token_logo" :src="tokenInfo.logo" :alt="tokenInfo.name" />
        <span class="token_name">{{ tokenInfo.name }}</span>
        <img
          class="token_select"
          src="@/assets/icon/arrow-down.svg"
          alt="select"
        />
      </div>
      <input
        class="c-token-form__input"
        type="number"
        placeholder="Token Number"
        :disabled="props.forbidden"
        v-model="swapNumber"
        @blur="handleBlur"
      />
      <div
        class="c-token-form__max"
        @click="handleMax"
        v-show="!props.forbidden"
      >
        Max
      </div>
    </div>
    <div class="c-token-form__balance">
      {{ tokenInfo.name }} Balance: {{ tokenInfo.balance }}
    </div>
  </div>

  <a-modal
    :simple="true"
    :footer="false"
    v-model:visible="modalVisible"
    @ok="handleModalOk"
    @cancel="handleModalCancel"
  >
    <template #title>
      Select Token
    </template>
    <div
      v-for="token in tokenList"
      :key="token.id"
      class="token-item"
      :class="{ active: token.id === tokenInfo.id }"
      @click="handleSelectToken(token)"
    >
      <img :src="token.logo" :alt="token.name" />
      <span>{{ token.name }}</span>
    </div>
  </a-modal>
</template>

<style scoped>
.c-token-form {
  margin-top: 1em;
}

.c-token-form__form {
  display: flex;
  align-items: center;
  border: 1px solid #eee;
  border-radius: 1em;
}

.c-token-form__form .c-token-form__select {
  display: flex;
  align-items: center;
  padding: 0.8em 1em;
  border-radius: 1em;
  transition: all 200ms linear;
}

.c-token-form__form .c-token-form__select:hover {
  background-color: #eee;
  cursor: pointer;
}

.c-token-form__form .c-token-form__select .token_logo {
  width: 2em;
  height: 2em;
  border-radius: 50%;
  vertical-align: bottom;
}

.c-token-form__form .c-token-form__select .token_name {
  width: 4em;
  text-align: center;
  margin-left: 0.5em;
  font-weight: bold;
}

.c-token-form__form .c-token-form__select .token_select {
  margin-left: 0.5em;
  width: 1em;
  height: 1em;
  vertical-align: bottom;
}

.c-token-form__form .c-token-form__input {
  flex: 1;
  padding: 0 1em;
  border: none;
  outline: none;
  font-weight: bold;
  font-size: 1.2em;
}

.c-token-form__form .c-token-form__input[disabled] {
  background-color: #ffffff;
}

.c-token-form__form .c-token-form__max {
  margin: 0 1em;
  color: #156eff;
  font-weight: bold;
  transition: all 200ms linear;
}

.c-token-form__form .c-token-form__max:hover {
  cursor: pointer;
  transform: translateY(-2px);
}

.c-token-form__balance {
  margin-top: 1em;
  text-align: right;
}

.token-item {
  display: flex;
  align-items: center;
  margin: 1em 0;
  padding: 0.5em 1em;
  border-radius: 10px;
  transition: all 200ms linear;
}

.token-item.active {
  background-color: rgba(0, 0, 0, 0.1);
}

.token-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
  cursor: pointer;
}

.token-item img {
  margin-right: 1em;
  width: 2em;
  height: 2em;
  vertical-align: bottom;
  border-radius: 50%;
}

.token-item span {
  font-weight: bold;
}
</style>

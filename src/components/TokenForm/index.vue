<!-- 
  该组件较之之前的组件来说，略显复杂
  主要用于在 swap 页面，用作代币选择表单
 -->
<script lang="ts" setup>
// 引入 ref 、watch 函数，引入 Ref 类型
import { ref, Ref, watch } from 'vue'
// 引入 pinia 全局存储，引入 token store
import pinia, { useTokenStore } from '@/store'

// 引入工具类函数 getAuthToken
import { getAuthToken } from '@/utils/auth'
// 引入 Notification 组件，用于给用户反馈信息
import { Notification } from '@arco-design/web-vue'

// 引入自定义类型 IToken
import type { IToken } from './types'

// 获取 token store
const tokenStore = useTokenStore(pinia)

// 定义组件需要的参数
// - forbidden 控制组件是否可用
// - swapNumber 控制代币 swap 时的金额
// - tokenBalance 控制用户代币余额
// - token 控制用户 swap 的代币
const props = defineProps({
  forbidden: Boolean,
  swapNumber: Number,
  tokenBalance: Number,
  token: Object,
})

// 定义组件会抛出的事件
// 这两个事件主要用于告诉父组件，用户选中了什么代币，用户输入代币的数量
const emit = defineEmits(['enter-token', 'enter-number'])

// 用户 swap 代币的数量的响应式对象
const swapNumber = ref(props.swapNumber)

// 当用户在 fromToken 组件中输入了一个代币数量，fromToken 组件会抛出 enter-number 事件
// 父组件捕获到用户 fromToken 的数量后会调用接口请求能够兑换 toToken 的数量
// 然后再更新 swapNumber 参数，因为 props 不是响应式的，因此在此我们需要用 watch 来 fake 一个响应式系统
watch(
  () => props.swapNumber,
  (newValue, oldValue) => {
    swapNumber.value = newValue
  }
)

// 用户代币余额的响应式对象
const balance = ref(props.tokenBalance)

// 与上述 props.swapNumber 同理
watch(
  () => props.tokenBalance,
  (newValue, oldValue) => {
    balance.value = newValue
  }
)

// 代币列表，会在代币选择的 modal 里面渲染
const tokenList: Ref<IToken[]> = ref([])

// 控制代币选择 modal 是否显示
const modalVisible = ref(false)

const handleModalOk = () => {
  modalVisible.value = false
}

const handleModalCancel = () => {
  modalVisible.value = false
}

// 用户点击选择代币时触发的事件
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

// 用户选择代币之后触发的事件
const handleSelectToken = async (token: IToken) => {
  modalVisible.value = false
  emit('enter-token', token.id, token.name, token.logo)
}

const handleMax = () => {
  emit('enter-number', props.tokenBalance)
}

const handleBlur = () => {
  emit('enter-number', swapNumber.value)
}
</script>

<template>
  <div class="c-token-form">
    <div class="c-token-form__form">
      <div class="c-token-form__select" @click="handleSelectClick">
        <img
          class="token_logo"
          :src="props.token?.logo"
          :alt="props.token?.name"
        />
        <span class="token_name">{{ props.token?.name }}</span>
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
      {{ props.token?.name }} Balance: {{ balance?.toFixed(6) }}
    </div>
  </div>

  <a-modal
    :simple="true"
    :footer="false"
    v-model:visible="modalVisible"
    @ok="handleModalOk"
    @cancel="handleModalCancel"
  >
    <template #title> Select Token </template>
    <div
      v-for="token in tokenList"
      :key="token.id"
      class="token-item"
      :class="{ active: token.id === props.token?.id }"
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

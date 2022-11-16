<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import { APIGetTokenList, APIPreSwap } from '@/api/token'
import pinia, { useTokenStore } from '@/store'
import TokenForm from '@/components/TokenForm/index.vue'
import { getAuthToken, getUID } from '@/utils/auth'
import { computed } from '@vue/reactivity'

const tokenStore = useTokenStore(pinia)

const fromToken = ref({
  id: 1,
  name: 'BTC',
  logo: 'https://tva1.sinaimg.cn/large/008vxvgGly1h82vy3v5h1j301s01sq2p.jpg',
})

const toToken = ref({
  id: 3,
  name: 'USDT',
  logo: 'https://tva1.sinaimg.cn/large/008vxvgGly1h82w08uskjj301s01st8h.jpg',
})

const rate = ref(18000)

const swapData = {
  fromTokenId: 1,
  fromTokenNumber: 1,
  toTokenId: 3,
}

const getRateTip = computed(() => {
  return `1${fromToken.value.name} = ${rate.value}${toToken.value.name}`
})

const getRate = async (fromTokenNumebr?: number) => {
  const data = {
    uid: getUID() as number,
    fromTokenId: fromToken.value.id,
    fromTokenNumber: 1,
    toTokenId: toToken.value.id,
  }
  if (fromTokenNumebr) data.fromTokenNumber = fromTokenNumebr
  const result = await APIPreSwap(data)
  if (result) {
    rate.value = result.willReceiveTokenNumber / result.fromTokenNumber
  }
}

const handleFromEnterToken = async (id: number, name: string, logo: string) => {
  fromToken.value.id = id
  fromToken.value.name = name
  fromToken.value.logo = logo
  await getRate()
}

const handleToEnterToken = async (id: number, name: string, logo: string) => {
  toToken.value.id = id
  toToken.value.name = name
  toToken.value.logo = logo
  await getRate()
}

const handleEnterFromNumber = async (id: number, number: number) => {
  swapData.fromTokenId = id
  swapData.fromTokenNumber = number
  await getRate(number)
}

const handleSwap = async () => {
  console.log(swapData)
}

onMounted(async () => {
  if (getAuthToken()) {
    const tokenList = await APIGetTokenList({ uid: getUID() as number })
    if (tokenList !== null) tokenStore.setTokenList(tokenList)
  }
})
</script>

<template>
  <div class="swap-page">
    <div class="swap">
      <h2 class="swap__from">From</h2>
      <token-form
        :token="fromToken"
        @enter-token="handleFromEnterToken"
        @enter-number="handleEnterFromNumber"
      ></token-form>
      <h2 class="swap__to">To</h2>
      <token-form
        :forbidden="true"
        :token="toToken"
        @enter-token="handleToEnterToken"
        @enter-number="(id) => (swapData.toTokenId = id)"
      ></token-form>
      <div class="swap__tip">
        <img src="@/assets/icon/tip.svg" alt="tip" />
        <span>{{ getRateTip }}</span>
      </div>
      <div class="swap__btn">
        <a-button long type="primary" size="large" @click="handleSwap">
          Swap
        </a-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.swap-page .swap {
  width: 40vw;
  margin: 5em auto;
  padding: 2em;
  border-radius: 2em;
  background-color: #ffffff;
}

.swap-page .swap .swap__to {
  margin-top: 1em;
}

.swap-page .swap .swap__tip {
  margin-top: 1em;
  display: flex;
  align-items: center;
}

.swap-page .swap .swap__tip {
  color: #666666;
}

.swap-page .swap .swap__tip img {
  margin-right: 0.5em;
  width: 1.5em;
  height: 1.5em;
  vertical-align: bottom;
}

.swap-page .swap .swap__btn {
  margin-top: 1em;
}
</style>

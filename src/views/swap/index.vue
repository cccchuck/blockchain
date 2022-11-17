<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { computed } from '@vue/reactivity'
import { Message, Notification } from '@arco-design/web-vue'

import pinia, { useTokenStore } from '@/store'
import TokenForm from '@/components/TokenForm/index.vue'
import { getAuthToken, getUID } from '@/utils/auth'
import {
  APIGetTokenBalance,
  APIGetTokenList,
  APIPreSwap,
  APISwap,
} from '@/api/token'

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

const swapNumber = ref(0)
const swapBalance = ref(0)
const swapToNumber = ref(0)
const swapToBalance = ref(0)

const rate = ref(18000)
const isPair = ref(true)

const getRateTip = computed(() => {
  if (isPair.value) {
    return `1${fromToken.value.name} = ${rate.value}${toToken.value.name}`
  } else {
    return `This pair have not liquidity pool.`
  }
})

const getRate = async (fromTokenNumebr?: number) => {
  if (!getUID() || !getAuthToken()) {
    Message.error('Should Login First')
    return
  }

  const data = {
    uid: getUID() as number,
    fromTokenId: fromToken.value.id,
    fromTokenNumber: 1,
    toTokenId: toToken.value.id,
  }
  if (fromTokenNumebr) data.fromTokenNumber = fromTokenNumebr
  const result = await APIPreSwap(data)
  if (result) {
    isPair.value = true
    rate.value = result.willReceiveTokenNumber / result.fromTokenNumber
  } else {
    isPair.value = false
  }
}

const updateTokenList = async () => {
  const uid: number = getUID() as number
  const tokenList = await APIGetTokenList({ uid })
  if (tokenList !== null) tokenStore.setTokenList(tokenList)
}

const updateBalance = async () => {
  const uid: number = getUID() as number
  const fromBalance = await APIGetTokenBalance({
    uid,
    tokenId: fromToken.value.id,
  })
  const toBalance = await APIGetTokenBalance({
    uid,
    tokenId: toToken.value.id,
  })
  if (fromBalance) swapBalance.value = fromBalance.balance
  if (toBalance) swapToBalance.value = toBalance.balance
}

const handleFromEnterToken = async (id: number, name: string, logo: string) => {
  const uid: number = getUID() as number
  fromToken.value.id = id
  fromToken.value.name = name
  fromToken.value.logo = logo

  const result = await APIGetTokenBalance({
    uid,
    tokenId: fromToken.value.id,
  })
  if (result) swapBalance.value = result.balance

  await getRate()
}

const handleToEnterToken = async (id: number, name: string, logo: string) => {
  const uid: number = getUID() as number
  toToken.value.id = id
  toToken.value.name = name
  toToken.value.logo = logo

  const result = await APIGetTokenBalance({
    uid,
    tokenId: toToken.value.id,
  })

  if (result) swapToBalance.value = result.balance
  await getRate()
}

const handleEnterFromNumber = async (number: number) => {
  swapNumber.value = number
  await getRate(number)
  swapToNumber.value = swapNumber.value * rate.value
}

const handleSwap = async () => {
  if (!getUID() || !getAuthToken()) {
    Message.error('Should Login First')
    return
  }

  const result = await APISwap({
    uid: getUID() as number,
    fromTokenId: fromToken.value.id,
    fromTokenNumber: swapNumber.value,
    toTokenId: toToken.value.id,
  })
  if (result !== null) {
    Notification.success({
      title: 'Success',
      content: `Swap ${swapNumber.value}${fromToken.value.name} to ${(
        swapNumber.value * rate.value
      ).toFixed(6)}${toToken.value.name}`,
    })
    await updateBalance()
  }
}

onMounted(async () => {
  if (getUID() && getAuthToken()) {
    await updateTokenList()
    await updateBalance()
  }
})
</script>

<template>
  <div class="swap-page">
    <div class="swap">
      <h2 class="swap__from">From</h2>
      <token-form
        :token="fromToken"
        :token-balance="swapBalance"
        :swap-number="swapNumber"
        @enter-token="handleFromEnterToken"
        @enter-number="handleEnterFromNumber"
      ></token-form>
      <h2 class="swap__to">To</h2>
      <token-form
        :forbidden="true"
        :token="toToken"
        :token-balance="swapToBalance"
        :swap-number="swapToNumber"
        @enter-token="handleToEnterToken"
        @enter-number="(id) => (toToken.id = id)"
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
  margin-top: 1em;
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

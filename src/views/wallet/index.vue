<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import { getUID } from '@/utils/auth'
import { APIGetBalance } from '@/api'

import type { Ref } from 'vue'
import type { IToken } from './types'
const uid = getUID() as number
const tokenList: Ref<IToken> = ref([])

const getTokenList = async () => {
  const result = await APIGetBalance({ uid })
  if (result) tokenList.value = result
}

const columns = [
  {
    title: '',
    dataIndex: 'tokenLogo',
    slotName: 'logo',
  },
  {
    title: 'Name',
    dataIndex: 'tokenName',
  },
  {
    title: 'Balance',
    dataIndex: 'tokenBalance',
  },
  {
    title: 'Price',
    dataIndex: 'tokenPrice',
  },
  {
    title: 'Total Value(USD)',
    slotName: 'total',
  },
]

onMounted(async () => {
  await getTokenList()
})
</script>

<template>
  <div class="wallet-page">
    <div class="wallet">
      <h2>Your Wallet</h2>
      <a-table :columns="columns" :data="tokenList" :pagination="false">
        <template #logo="{ record }">
          <img
            :src="record.tokenLogo"
            :alt="record.tokenName"
            style="width: 2em; height: 2em; border-radius: 50%;"
          />
        </template>
        <template #total="{ record }">
          {{ (record.tokenBalance * record.tokenPrice).toFixed(6) }}
        </template>
      </a-table>
    </div>
  </div>
</template>

<style scoped>
.wallet {
  width: 50vw;
  margin: 0 auto;
  padding: 1em;
  border-radius: 1em;
  background-color: #ffffff;
}

.wallet > * {
  margin-bottom: 1em;
}

.token-item {
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
}

.token-item .token-logo {
  width: 2em;
  height: 2em;
  border-radius: 50%;
  vertical-align: bottom;
}

.token-item span {
  margin-left: 1em;
  color: #333333;
  font-weight: bold;
  width: 15em;
}
</style>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import {
  APIGetStaked,
  APIGetStake,
  APIGetTokenBalance,
  APIStake,
  APIUnstake,
} from '@/api'
import { getUID } from '@/utils/auth'
import type { Ref } from 'vue'
import type { IStakeToken, IStakedToken } from './types'
import { Notification } from '@arco-design/web-vue'

const uid = getUID() as number
const stakeTokenList: Ref<IStakeToken> = ref([])
const stakedTokenList: Ref<IStakedToken> = ref([])

const modalVisible = ref(false)
const stakeTokenName = ref('')
const stakeTokenId = ref(0)
const tokenBalance = ref(0)
const tokenNumber = ref(0)
const stakeLoading = ref(false)
const unstakeLoading = ref(false)

const getStakeTokenList = async () => {
  const stakeToken = await APIGetStake({ uid })
  if (stakeToken) stakeTokenList.value = stakeToken
}

const getStakedTokenList = async () => {
  const stakedToken = await APIGetStaked({ uid })
  if (stakedToken) stakedTokenList.value = stakedToken
}

const handleStake = async (tokenId: number, tokenName: string) => {
  modalVisible.value = true
  stakeTokenId.value = tokenId
  stakeTokenName.value = tokenName
  const result = await APIGetTokenBalance({ uid, tokenId: stakeTokenId.value })
  if (result) tokenBalance.value = result.balance
}

const handleEnterStake = async () => {
  stakeLoading.value = true
  const result = await APIStake({
    uid,
    tokenId: stakeTokenId.value,
    tokenNumber: tokenNumber.value,
  })
  if (result !== null) {
    Notification.success({
      title: 'Stake Success',
      content: `Stake ${stakeTokenName.value} ${tokenNumber.value}`,
    })
    stakeLoading.value = false
    modalVisible.value = false
    tokenNumber.value = 0
    await getStakedTokenList()
  }
}

const handleUnstake = async (stakeId: number) => {
  unstakeLoading.value = true
  const result = await APIUnstake({ uid, stakeId })
  if (result !== null) {
    Notification.success('Unstake Success')
    unstakeLoading.value = false
    await getStakedTokenList()
  }
}

onMounted(async () => {
  await getStakeTokenList()
  await getStakedTokenList()
})
</script>

<template>
  <div class="stake-app">
    <div class="stake">
      <h2 class="stake__title">Stake Token</h2>
      <div class="stake__stake-token">
        <div
          v-for="token in stakeTokenList"
          :key="token.tokenId"
          class="stake__stake-token-item"
        >
          <img
            :src="token.tokenLogo"
            :alt="token.tokenName"
            class="stake__stake-token-logo"
          />
          <span class="stake__stake-token-name">{{ token.tokenName }}</span>
          <span class="stake__stake-token-apy">{{ token.APY.toFixed(6) }}</span>
          <a-button
            type="primary"
            shape="round"
            @click="handleStake(token.tokenId, token.tokenName)"
            >Stake</a-button
          >
        </div>
      </div>

      <h2 class="stake__title">Your Staked</h2>
      <div v-show="stakedTokenList.length" class="stake__your-staked">
        <div
          v-for="token in stakedTokenList"
          :key="token.stakeId"
          class="stake__staked-token-item"
        >
          <img :src="token.tokenLogo" :alt="token.tokenName" />
          <span>{{ token.tokenName }}</span>
          <span>{{ token.tokenNum.toFixed(6) }}</span>
          <span>{{ token.APY.toFixed(6) }}</span>
          <span>{{ new Date(token.stakeTime).toLocaleString() }}</span>
          <a-popconfirm
            content="Are you sure want to unstake?"
            ok-text="Yes"
            cancel-text="No"
            @ok="handleUnstake(token.stakeId)"
          >
            <a-button type="primary" shape="round" :loading="unstakeLoading"
              >Unstake</a-button
            >
          </a-popconfirm>
        </div>
      </div>

      <div v-show="!stakedTokenList.length" class="stake__none">
        <a-empty description="No Staked" />
      </div>
    </div>
  </div>

  <a-modal :simple="true" :footer="false" v-model:visible="modalVisible">
    <div class="stake-token">
      <h4 class="title">Stake Token Number</h4>
      <div class="form">
        <input type="number" v-model="tokenNumber" />
        <span @click="tokenNumber = tokenBalance">Max</span>
      </div>
      <p class="balance">{{ stakeTokenName }} Balance: {{ tokenBalance }}</p>
      <div class="btn">
        <a-button
          type="primary"
          long
          @click="handleEnterStake"
          :loading="stakeLoading"
          >Stake</a-button
        >
      </div>
    </div>
  </a-modal>
</template>

<style scoped>
.stake {
  width: 50vw;
  margin: 0 auto;
}

.stake > * {
  margin-bottom: 1em;
}

.stake .stake__title {
  color: #333333;
}

.stake .stake__your-staked,
.stake .stake__stake-token {
  padding: 2em;
  border-radius: 1em;
  background-color: #ffffff;
}

.stake .stake__your-staked .stake__staked-token-item,
.stake .stake__stake-token .stake__stake-token-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 2em;
  border-radius: 0.5em;
  transition: all 200ms linear;
}

.stake .stake__your-staked .stake__staked-token-item:hover,
.stake .stake__stake-token .stake__stake-token-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
  cursor: pointer;
}

.stake .stake__your-staked .stake__staked-token-item img,
.stake .stake__stake-token .stake__stake-token-item img {
  width: 2em;
  height: 2em;
  border-radius: 50%;
  vertical-align: bottom;
}

.stake .stake__your-staked .stake__staked-token-item span,
.stake .stake__stake-token .stake__stake-token-item span {
  color: #333333;
  font-weight: bold;
}

.stake .stake__none {
  padding: 2em;
  border-radius: 1em;
  background-color: #ffffff;
}

.stake-token > * {
  margin-bottom: 1em;
}

.form {
  display: flex;
  align-items: center;
  padding: 0.5em 1em;
  border: 1px solid #eee;
  border-radius: 0.5em;
}

.form input {
  border: none;
  outline: none;
  flex: 1;
}

.form span {
  color: #156eff;
  font-weight: bold;
  transition: all 200ms linear;
}

.form span:hover {
  transform: translateY(-2px);
  cursor: pointer;
}

.balance {
  color: #666666;
  text-align: right;
}
</style>

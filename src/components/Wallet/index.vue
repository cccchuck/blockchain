<script setup lang="ts">
import { login, logout, getAddr, getFullAddr } from '@/utils/web3'
import { Message } from '@arco-design/web-vue'
import { ref, onMounted } from 'vue'

const address = ref('')

async function init() {
  const addr = await getAddr()
  address.value = addr
}

async function copy() {
  const addr = await getFullAddr()
  if (navigator.clipboard) {
    navigator.clipboard.writeText(addr)
    Message.success('Copy address!')
  }
}

onMounted(init)
</script>

<template>
  <div class="c-wallet">
    <div class="c-wallet_login" v-if="address">
      <p @click="copy">{{ address }}</p>
      <a-button
        type="primary"
        size="small"
        shape="round"
        status="danger"
        @click="logout(init)"
      >
        Log Out
      </a-button>
    </div>
    <div class="c-wallet_logout" v-else>
      <a-button type="primary" size="large" shape="round" @click="login(init)">
        Connect Wallet
      </a-button>
    </div>
  </div>
</template>

<style scoped>
.c-wallet {
  position: absolute;
  right: 1em;
}

.c-wallet .c-wallet_login {
  display: flex;
  align-items: center;
}

.c-wallet .c-wallet_login p {
  margin-right: 1em;
  font-weight: bold;
  color: var(--color-text-tip);
  transition: all 200ms linear;
}

.c-wallet .c-wallet_login p:hover {
  color: var(--color-text-normal);
  cursor: pointer;
}
</style>

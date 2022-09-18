import { Message } from '@arco-design/web-vue'
import { useUserStore } from '@/store'
import { ethers } from 'ethers'
import pinia from '@/store'

const provider = new ethers.providers.Web3Provider(window.ethereum)

let store = useUserStore(pinia)

async function login(hook: () => {}) {
  try {
    const accounts = await provider.send('eth_requestAccounts', [])
    store.login(accounts[0])
    Message.success(`Login Success`)
    hook()
  } catch (error) {
    Message.error((error as Error).message)
  }
}

async function logout(hook: () => {}) {
  store.logout()
  hook()
}

async function getChainID() {
  return store.chainID
}

async function getAddr() {
  const address = localStorage.getItem('address')
  if (address) store.login(address)
  return store.addr
}

async function getFullAddr() {
  return store.address
}

export { login, logout, getChainID, getAddr, getFullAddr }

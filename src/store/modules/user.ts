import { removeAuthToken, removeUID, setAuthToken, setUID } from '@/utils/auth'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: {
        uid: 0,
        token: '',
        username: '',
      },
    }
  },

  getters: {},

  actions: {
    login(username: string, uid: number, token: string) {
      this.userInfo.username = username
      this.userInfo.token = token
      this.userInfo.uid = uid
      setUID(uid)
      setAuthToken(token)
    },
    logout() {
      this.userInfo.username = ''
      this.userInfo.token = ''
      this.userInfo.uid = 0
      removeUID()
      removeAuthToken()
    },
  },
})

export default useUserStore

import { defineStore } from 'pinia'

interface IToken {
  id: number
  name: string
  logo: string
}

export const useTokenStore = defineStore('token', {
  state() {
    return {
      tokenList: [
        {
          id: 0,
          name: '',
          logo: '',
        },
      ],
    }
  },

  getters: {},

  actions: {
    setTokenList(tokenList: IToken[]) {
      this.tokenList = tokenList
    },
  },
})

export default useTokenStore

export interface IToken {
  id: number
  name: string
  logo: string
}

export interface ITokenBalance {
  tokenId: number
  tokenName: string
  tokenLogo: string
  tokenPrice: number
  tokenBalance: number
}

export interface IResponseData {
  code: number
  msg: string
  data?: unknown
}

export type IAPISignUp = IResponseData

export interface IAPISignIn {
  uid: number
  token: string
}

export type IAPISendCode = IResponseData

export type IAPIResetPwd = IResponseData

export type IAPIUpdatePwd = IResponseData

export interface IAPIGetUserInfo {
  uid: number
  username: string
}

export type IAPIGetTokenList = IToken[]

export interface IAPIPreSwap {
  time: number
  fromTokenNumber: number
  willReceiveTokenNumber: number
}

export type IAPISwap = IResponseData

export type IAPIStake = IResponseData

export type IAPIUnstake = IResponseData

export interface IAPIGetStaked {
  stakeId: number
  tokenId: number
  tokenName: string
  tokenLogo: string
  tokenNum: number
  stakeTime: Date
}

export interface IAPIGetTokenBalance {
  balance: number
}

export type IAPIGetBalance = ITokenBalance[]

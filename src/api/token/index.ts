import { get, post } from '../utils'

import type {
  IAPIGetBalance,
  IAPIGetStaked,
  IAPIGetTokenBalance,
  IAPIGetTokenList,
  IAPIPreSwap,
  IAPIStake,
  IAPISwap,
  IAPIUnstake,
} from '../utils/types'

const APIGetTokenList = async ({ uid }: { uid: number }) => {
  return await post<IAPIGetTokenList>({
    url: '/token/get-token-list',
    data: { uid },
  })
}

const APISwap = async ({
  uid,
  fromTokenId,
  fromTokenNumber,
  toTokenId,
}: {
  uid: number
  fromTokenId: number
  fromTokenNumber: number
  toTokenId: number
}) => {
  return await post<IAPISwap>({
    url: '/token/swap',
    data: {
      uid,
      fromTokenId,
      fromTokenNumber,
      toTokenId,
    },
  })
}

const APIPreSwap = async ({
  uid,
  fromTokenId,
  fromTokenNumber,
  toTokenId,
}: {
  uid: number
  fromTokenId: number
  fromTokenNumber: number
  toTokenId: number
}) => {
  return await post<IAPIPreSwap>({
    url: '/token/pre-swap',
    data: {
      uid,
      fromTokenId,
      fromTokenNumber,
      toTokenId,
    },
  })
}

const APIStake = async ({
  uid,
  tokenId,
  tokenNumber,
}: {
  uid: number
  tokenId: number
  tokenNumber: number
}) => {
  return await post<IAPIStake>({
    url: '/token/stake',
    data: {
      uid,
      tokenId,
      tokenNumber,
    },
  })
}

const APIUnstake = async ({
  uid,
  stakeId,
}: {
  uid: number
  stakeId: number
}) => {
  return await post<IAPIUnstake>({
    url: '/token/unstake',
    data: {
      uid,
      stakeId,
    },
  })
}

const APIGetStaked = async ({ uid }: { uid: number }) => {
  return await post<IAPIGetStaked>({
    url: '/token/get-staked',
    data: { uid },
  })
}

const APIGetBalance = async ({ uid }: { uid: number }) => {
  return await post<IAPIGetBalance>({
    url: '/token/get-balance',
    data: { uid },
  })
}

const APIGetTokenBalance = async ({
  uid,
  tokenId,
}: {
  uid: number
  tokenId: number
}) => {
  return await post<IAPIGetTokenBalance>({
    url: '/token/get-token-balance',
    data: { uid, tokenId },
  })
}

export {
  APISwap,
  APIPreSwap,
  APIStake,
  APIUnstake,
  APIGetStaked,
  APIGetBalance,
  APIGetTokenList,
  APIGetTokenBalance,
}

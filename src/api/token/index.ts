import { get, post } from '../utils'

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
  return await post({
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
  return await post({
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
  return await post({
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
  return await post({
    url: '/token/unstake',
    data: {
      uid,
      stakeId,
    },
  })
}

const APIGetStaked = async ({ uid }: { uid: number }) => {
  return await post({
    url: '/token/get-staked',
    data: { uid },
  })
}

const APIGetBalance = async ({ uid }: { uid: number }) => {
  return await post({
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
  return await post({
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
  APIGetTokenBalance,
}

import { post } from '../utils/index'

const APISignUp = async ({
  username,
  password,
  email,
}: {
  username: string
  password: string
  email: string
}) => {
  return await post({
    url: '/users/sign-up',
    data: { username, password, email },
  })
}

const APISignIn = async ({
  username,
  password,
}: {
  username: string
  password: string
}) => {
  return await post({
    url: '/users/sign-in',
    data: { username, password },
  })
}

const APISendCode = async ({
  username,
  email,
}: {
  username: string
  email: string
}) => {
  return await post({
    url: '/users/send-code',
    data: { username, email },
  })
}

const APIResetPwd = async ({
  username,
  password,
  code,
}: {
  username: string
  password: string
  code: string
}) => {
  return await post({
    url: '/users/reset-pwd',
    data: { username, password, code },
  })
}

const APIUpdatePwd = async ({
  uid,
  oldPassword,
  newPassword,
}: {
  uid: number
  oldPassword: string
  newPassword: string
}) => {
  return await post({
    url: '/users/update-pwd',
    data: { uid, oldPassword, newPassword },
  })
}

const APIGetUserInfo = async ({ uid }: { uid: number }) => {
  return await post({
    url: '/users/get-user-info',
    data: { uid },
  })
}

export {
  APISignUp,
  APISignIn,
  APISendCode,
  APIResetPwd,
  APIUpdatePwd,
  APIGetUserInfo,
}

import { message } from 'antd'

export const useMessageApi = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const api = {
    error: (val: string | object) => {
      messageApi.error(JSON.stringify(val))
    },
    info: (val: string | object) => {
      messageApi.info(JSON.stringify(val))
    },
  }

  return {
    api,
    contextHolder,
  }
}

export type messageApiType = {
  error: (obj: string | object) => void
  info: (obj: string | object) => void
}

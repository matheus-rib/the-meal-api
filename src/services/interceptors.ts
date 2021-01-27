/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-promise-reject-errors */
import { AxiosError } from 'axios'

type ApiError = {
  code: string
  message: string
  additionalProperties?: any
}

export const errorHandlerInterceptor = (errors: any = {}) => {
  return (error: AxiosError): Promise<ApiError> => {
    if (error.message === 'Network Error') {
      return Promise.reject({
        code: 'networkError',
        message: 'Falha na conexão',
      })
    }
    const e = {
      code: error.response?.data?.code,
      message: errors[error.response?.data?.code],
    }

    return Promise.reject(e)
  }
}

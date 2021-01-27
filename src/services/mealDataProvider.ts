import axios, { AxiosResponse } from 'axios'
import * as qs from 'qs'
import errors from './errors'
import { errorHandlerInterceptor } from './interceptors'

const api = axios.create({
  baseURL: process.env.DATA_PROVIDER_BASE_URL,
  paramsSerializer: qs.stringify,
})

api.interceptors.response.use(
  response => response,
  errorHandlerInterceptor(errors),
)

type QueryParams = string | qs.ParsedQs | string[] | qs.ParsedQs[]

export default {
  search (mealName: QueryParams): Promise<AxiosResponse> {
    return api.get('/search.php', {
      params: {
        s: mealName,
      },
    })
  },

  categoriesList (): Promise<AxiosResponse> {
    return api.get('/categories.php')
  },

  listByCategories (categoryName: QueryParams): Promise<AxiosResponse> {
    return api.get('/filter.php', {
      params: {
        c: categoryName,
      },
    })
  },

  show (mealId: QueryParams): Promise<AxiosResponse> {
    return api.get('/lookup.php', {
      params: {
        i: mealId,
      },
    })
  },

  random (): Promise<AxiosResponse> {
    return api.get('/random.php')
  },
}

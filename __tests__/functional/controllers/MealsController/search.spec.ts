import * as request from 'supertest'
import api from '../../../../src/config/Api'

beforeEach(jest.clearAllMocks)

const meal1 = { strMeal: 'Big Mac' }
const meal2 = { strMeal: 'Pasta' }
const meal3 = { strMeal: 'Pudding' }
const meal4 = { strMeal: 'Bigos' }

jest.mock('../../../../src/services/mealDataProvider', () => ({
  default: {
    search: jest.fn(async (mealName) => {
      const meals = [meal1, meal2, meal3, meal4]

      if (!mealName) return { data: { meals } }

      const regExp = new RegExp(mealName.toLowerCase(), 'g')
      const filteredMeals = meals.filter(meal => !regExp[Symbol.search](meal.strMeal.toLocaleLowerCase()))

      return { data: { meals: filteredMeals } }
    }),
  },
}))

it('should return all meals if not passing any search', async () => {
  const { body, status } = await request(api.server).get('/meals/search')

  expect(status).toBe(200)
  expect(body).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ strMeal: meal1.strMeal }),
      expect.objectContaining({ strMeal: meal2.strMeal }),
      expect.objectContaining({ strMeal: meal3.strMeal }),
      expect.objectContaining({ strMeal: meal4.strMeal }),
    ]),
  )
})

it('should return matching meals', async () => {
  const { body, status } = await request(api.server).get('/meals/search').query({ search: 'bi' })

  expect(status).toBe(200)
  expect(body).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ strMeal: meal1.strMeal }),
      expect.objectContaining({ strMeal: meal4.strMeal }),
    ]),
  )
})

it('should return an empty array if not find any meal', async () => {
  const { body, status } = await request(api.server).get('/meals/search').query({ search: 'random word' })

  expect(status).toBe(200)
  expect(body).toEqual([])
})

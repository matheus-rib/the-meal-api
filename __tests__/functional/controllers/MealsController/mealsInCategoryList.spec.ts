import * as request from 'supertest'
import * as faker from 'faker'
import api from '../../../../src/config/Api'

beforeEach(jest.clearAllMocks)

const meal1 = { strMeal: faker.name.title() }
const meal2 = { strMeal: faker.name.title() }
const meal3 = { strMeal: faker.name.title() }
const meal4 = { strMeal: faker.name.title() }

const categories = {
  seafood: { meals: [meal1, meal2] },
  beef: { meals: [meal3, meal4] },
}

jest.mock('../../../../src/services/mealDataProvider', () => ({
  default: {
    listByCategories: jest.fn(async (category) => {
      const dataCategory = categories[category] || []

      const data = {
        data: dataCategory,
      }

      return data
    }),
  },
}))

it('should return all meals from food category', async () => {
  const category = 'seafood'
  const { body, status } = await request(api.server).get(`/meals/categories/${category}`)

  expect(status).toBe(200)
  expect(body).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ strMeal: categories[category].meals[0].strMeal }),
      expect.objectContaining({ strMeal: categories[category].meals[1].strMeal }),
    ]),
  )
})

it('should return recordNotFound error if not passing a valid category', async () => {
  const { body, status } = await request(api.server).get('/meals/categories/random_category')

  expect(status).toBe(404)
  expect(body.code).toBe('recordNotFound')
})

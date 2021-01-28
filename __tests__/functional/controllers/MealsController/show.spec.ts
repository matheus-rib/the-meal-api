import * as request from 'supertest'
import * as faker from 'faker'
import api from '../../../../src/config/Api'

beforeEach(jest.clearAllMocks)

const meal = { idMeal: faker.random.uuid(), strMeal: faker.name.title() }

jest.mock('../../../../src/services/mealDataProvider', () => ({
  default: {
    show: jest.fn(async (mealId) => {
      const meals = meal.idMeal === mealId ? [meal] : null
      return { data: { meals } }
    }),
  },
}))

it('should return a meal from the id in route', async () => {
  const { body, status } = await request(api.server).get(`/meals/show/${meal.idMeal}`)

  expect(status).toBe(200)
  expect(body).toEqual(
    expect.objectContaining({ idMeal: meal.idMeal, strMeal: meal.strMeal }),
  )
})

it('should return recordNotFound error if not passing a valid id', async () => {
  const { body, status } = await request(api.server).get(`/meals/show/${meal.idMeal + 'abc'}`)

  expect(status).toBe(404)
  expect(body.code).toBe('recordNotFound')
})

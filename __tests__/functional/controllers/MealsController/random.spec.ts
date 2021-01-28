import * as request from 'supertest'
import * as faker from 'faker'
import api from '../../../../src/config/Api'

beforeEach(jest.clearAllMocks)

const meal = { idMeal: faker.random.uuid(), strMeal: faker.name.title() }

jest.mock('../../../../src/services/mealDataProvider', () => ({
  default: {
    random: jest.fn(async () => {
      return { data: { meals: [meal] } }
    }),
  },
}))

it('should return a random meal', async () => {
  const { body, status } = await request(api.server).get('/meals/random')

  expect(status).toBe(200)
  expect(body).toEqual(
    expect.objectContaining({ idMeal: meal.idMeal, strMeal: meal.strMeal }),
  )
})

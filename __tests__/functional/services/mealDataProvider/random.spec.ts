import * as faker from 'faker'
import mealDataProviderServices from '../../../../src/services/mealDataProvider'

beforeEach(jest.clearAllMocks)

const meal = { idMeal: faker.random.uuid(), strMeal: faker.name.title() }

jest.mock('axios', () => ({
  default: {
    create: jest.fn(() => ({
      interceptors: { response: { use: jest.fn() } },
      get: jest.fn(() => {
        return { data: { meals: [meal] } }
      }),
    })),
  },
}))

it('should return a meal', async () => {
  const { data } = await mealDataProviderServices.random()
  expect(data.meals.length).toBe(1)
  expect(data.meals[0]).toEqual(
    expect.objectContaining({ idMeal: meal.idMeal, strMeal: meal.strMeal }),
  )
})

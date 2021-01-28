import * as faker from 'faker'
import mealDataProviderServices from '../../../../src/services/mealDataProvider'

beforeEach(jest.clearAllMocks)

const meal = { idMeal: faker.random.uuid(), strMeal: faker.name.title() }

jest.mock('axios', () => ({
  default: {
    create: jest.fn(() => ({
      interceptors: { response: { use: jest.fn() } },
      get: jest.fn((url, options) => {
        const idMeal = options?.params?.i

        return idMeal === meal.idMeal ? { data: [meal] } : { data: [] }
      }),
    })),
  },
}))

it('should return a meal', async () => {
  const { data } = await mealDataProviderServices.show(meal.idMeal)
  expect(data.length).toBe(1)
  expect(data[0]).toEqual(
    expect.objectContaining({ idMeal: meal.idMeal, strMeal: meal.strMeal }),
  )
})

it('should return a null value if invalid mealId', async () => {
  const { data } = await mealDataProviderServices.show(meal.idMeal + 'abc')
  expect(data.length).toBe(0)
})

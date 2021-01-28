import * as faker from 'faker'
import mealDataProviderServices from '../../../../src/services/mealDataProvider'

beforeEach(jest.clearAllMocks)

const meal1 = { idMeal: faker.random.uuid(), strMeal: faker.name.title() }
const meal2 = { idMeal: faker.random.uuid(), strMeal: faker.name.title() }
const meal3 = { idMeal: faker.random.uuid(), strMeal: faker.name.title() }
const meals = [meal1, meal2, meal3]
const category = { name: faker.name.title(), meals }

jest.mock('axios', () => ({
  default: {
    create: jest.fn(() => ({
      interceptors: { response: { use: jest.fn() } },
      get: jest.fn((url, options) => {
        const categoryName = options?.params?.c

        const meals = categoryName === category.name ? category.meals : []
        return { data: { meals } }
      }),
    })),
  },
}))

it('should return all meals from the cateogry', async () => {
  const { data } = await mealDataProviderServices.listByCategories(category.name)
  expect(data.meals.length).toBe(3)
  expect(data.meals).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ idMeal: meal1.idMeal, strMeal: meal1.strMeal }),
      expect.objectContaining({ idMeal: meal2.idMeal, strMeal: meal2.strMeal }),
      expect.objectContaining({ idMeal: meal3.idMeal, strMeal: meal3.strMeal }),
    ]),
  )
})

it('should return empty array if not matching a category', async () => {
  const { data } = await mealDataProviderServices.listByCategories(category.name + 'abc')
  expect(data.meals.length).toBe(0)
  expect(data.meals).toEqual([])
})

import * as faker from 'faker'
import mealDataProviderServices from '../../../../src/services/mealDataProvider'

beforeEach(jest.clearAllMocks)

const category1 = { idMeal: faker.random.uuid(), strMeal: faker.name.title() }
const category2 = { idMeal: faker.random.uuid(), strMeal: faker.name.title() }
const category3 = { idMeal: faker.random.uuid(), strMeal: faker.name.title() }
const categories = [category1, category2, category3]

jest.mock('axios', () => ({
  default: {
    create: jest.fn(() => ({
      interceptors: { response: { use: jest.fn() } },
      get: jest.fn(() => {
        return { data: { categories } }
      }),
    })),
  },
}))

it('should return all categories with same pattern', async () => {
  const { data } = await mealDataProviderServices.categoriesList()
  expect(data.categories.length).toBe(categories.length)
  expect(data.categories).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ idMeal: category1.idMeal, strMeal: category1.strMeal }),
      expect.objectContaining({ idMeal: category2.idMeal, strMeal: category2.strMeal }),
      expect.objectContaining({ idMeal: category3.idMeal, strMeal: category3.strMeal }),
    ]),
  )
})

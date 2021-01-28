import * as faker from 'faker'
import mealDataProviderServices from '../../../../src/services/mealDataProvider'

beforeEach(jest.clearAllMocks)

const baseMealName = `abc ${faker.name.title()} def`
const meal1 = { idMeal: faker.random.uuid(), strMeal: `${baseMealName} ${faker.name.title()}` }
const meal2 = { idMeal: faker.random.uuid(), strMeal: `${baseMealName} ${faker.name.title()}` }
const meal3 = { idMeal: faker.random.uuid(), strMeal: faker.name.title() }
const meals = [meal1, meal2, meal3]

jest.mock('axios', () => ({
  default: {
    create: jest.fn(() => ({
      interceptors: { response: { use: jest.fn() } },
      get: jest.fn((url, options) => {
        const searchParam = options?.params?.s

        if (!searchParam) return { data: { meals } }

        const regExp = new RegExp(searchParam.toLowerCase(), 'g')
        const filteredMeals = meals.filter(meal => !regExp[Symbol.search](meal.strMeal.toLocaleLowerCase()))

        return { data: { meals: filteredMeals } }
      }),
    })),
  },
}))

it('should return all meals with same pattern', async () => {
  const { data } = await mealDataProviderServices.search(baseMealName)
  expect(data.meals.length).toBe(2)
  expect(data.meals).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ idMeal: meal1.idMeal, strMeal: meal1.strMeal }),
      expect.objectContaining({ idMeal: meal2.idMeal, strMeal: meal2.strMeal }),
    ]),
  )
})

it('should return all meals if no search query', async () => {
  const { data } = await mealDataProviderServices.search('')
  expect(data.meals.length).toBe(3)
  expect(data.meals).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ idMeal: meal1.idMeal, strMeal: meal1.strMeal }),
      expect.objectContaining({ idMeal: meal2.idMeal, strMeal: meal2.strMeal }),
      expect.objectContaining({ idMeal: meal3.idMeal, strMeal: meal3.strMeal }),
    ]),
  )
})

import * as request from 'supertest'
import api from '../../../../src/config/Api'

beforeEach(jest.clearAllMocks)

const category1 = { strCategory: 'Seafood' }
const category2 = { strCategory: 'Beef' }
const category3 = { strCategory: 'Chicken' }
const category4 = { strCategory: 'Lamb' }

jest.mock('../../../../src/services/mealDataProvider', () => ({
  default: {
    categoriesList: jest.fn(async () => {
      const categories = [category1, category2, category3, category4]

      return { data: { categories } }
    }),
  },
}))

it('should return all categories', async () => {
  const { body, status } = await request(api.server).get('/meals/categories')

  expect(status).toBe(200)
  expect(body).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ strCategory: category1.strCategory }),
      expect.objectContaining({ strCategory: category2.strCategory }),
      expect.objectContaining({ strCategory: category3.strCategory }),
      expect.objectContaining({ strCategory: category4.strCategory }),
    ]),
  )
})

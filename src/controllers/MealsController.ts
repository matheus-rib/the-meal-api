import { Request, Response } from 'express'
import ApiError from '../errors/ApiError'
import RecordNotFoundError from '../errors/RecordNotFoundError'
import mealDataProviderServices from '../services/mealDataProvider'

async function search (req: Request, res: Response): Promise<void> {
  const { search = '' } = req.query
  const { data } = await mealDataProviderServices.search(search)
  res.json(data.meals || [])
}

async function categoriesList (req: Request, res: Response): Promise<void> {
  const { data } = await mealDataProviderServices.categoriesList()
  res.json(data.categories)
}

async function mealsInCategoryList (req: Request, res: Response): Promise<void> {
  const { categoryName } = req.params
  const { data } = await mealDataProviderServices.listByCategories(categoryName)
  res.json(data.meals)
}

async function show (req: Request, res: Response): Promise<void> {
  const { mealId } = req.params
  const { data } = await mealDataProviderServices.show(mealId)
  const meal = data?.meals?.[0]
  if (!meal) throw new RecordNotFoundError('Meal', { id: mealId })
  res.json(meal)
}

async function random (req: Request, res: Response): Promise<void> {
  const { data } = await mealDataProviderServices.random()

  if (!data?.meals?.[0]) throw new ApiError({ code: 'FailedToFetchRandomMeal', message: 'Failed to fetch random meal' })
  res.json(data.meals[0])
}

export default {
  search,
  categoriesList,
  mealsInCategoryList,
  show,
  random,
}

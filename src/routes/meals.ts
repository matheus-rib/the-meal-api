import { Router } from 'express'
import requestHandler from '../utils/requestHandler'

// Controllers
import MealsController from '../controllers/MealsController'

const router = Router()

router.get('/categories', requestHandler(MealsController.categoriesList))
router.get('/categories/:categoryName', requestHandler(MealsController.mealsInCategoryList))
router.get('/show/:mealId', requestHandler(MealsController.show))
router.get('/search', requestHandler(MealsController.search))
router.get('/random', requestHandler(MealsController.random))

export default router

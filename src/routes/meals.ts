import { Router } from 'express'
import requestHandler from '../utils/requestHandler'

// Controllers
import MealsControllers from '../controllers/MealsControllers'

const router = Router()

router.get('/categories', requestHandler(MealsControllers.categoriesList))
router.get('/categories/:categoryName', requestHandler(MealsControllers.mealsInCategoryList))
router.get('/show/:mealId', requestHandler(MealsControllers.show))
router.get('/search', requestHandler(MealsControllers.search))
router.get('/random', requestHandler(MealsControllers.random))

export default router

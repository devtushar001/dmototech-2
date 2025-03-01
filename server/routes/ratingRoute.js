import express from 'express';
import { allRatingFetchController, ratingAddController } from '../controllers/ratingController.js';
import isAuth from '../middlewares/auth.js';

const ratingRoute = express.Router();

ratingRoute.post('/add', isAuth, ratingAddController)
ratingRoute.get('/get-all', allRatingFetchController)

export default ratingRoute;
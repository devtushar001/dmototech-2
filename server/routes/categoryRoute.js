import express from 'express';
import upload from '../middlewares/upload.js';
import {addCategory, deleteCategory, getAllCategories} from '../controllers/categoryController.js';
import { verifyToken } from '../middlewares/adminAuth.js';

const categoryRouter = express.Router()
categoryRouter.post('/add', verifyToken, addCategory);
categoryRouter.get('/get', getAllCategories);
categoryRouter.post('/delete', verifyToken, deleteCategory);

export default categoryRouter;
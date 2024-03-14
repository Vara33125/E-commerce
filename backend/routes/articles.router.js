import express from "express";
import { addArticle, deleteArticle, getArticles, getArticlesById, updateArticle } from "../controllers/articles.controller.js";

const router = express.Router();


router.get('/get' , getArticles)
router.get('/get/:id' , getArticlesById)
router.post('/add' , addArticle)
router.delete('/delete/:id' , deleteArticle)
router.put('/update/:id' , updateArticle)
export default router;
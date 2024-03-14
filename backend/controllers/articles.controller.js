import articlesModel from "../models/articles.model.js";

export const getArticles = async (req, res) => {
  try {
    const articles = await articlesModel.find();

    res.status(200).json(articles);
  } catch (error) {
    console.log(error);
  }
};

export const getArticlesById = async (req, res) => {
  checkId(req, res);
  try {
    const articles = await articlesModel.findById(req.params.id);

    res.status(200).json(articles);
  } catch (error) {
    console.log(error);
  }
};

export const addArticle = async (req, res) => {
  try {
    const newArticle = await articlesModel.create({ ...req.body });
    res.status(201).json({ message: "article created", newArticle });
  } catch (error) {
    console.log(error);
  }
};

export const deleteArticle = async (req, res) => {
  checkId(req, res);
  try {
    const articleDelete = await articlesModel.findByIdAndDelete(req.params.id);
    if (!articleDelete) return res.status(404).json("article not found");
    res.status(200).json(articleDelete);
  } catch (error) {
    console.log(error);
  }
};

export const updateArticle = async (req, res) => {
  checkId(req, res);
  try {
    const article = await articlesModel.findByIdAndUpdate(req.params.id, 
        { $set : req.body},
        {new : true}
    );
    if(!article) return res.status(404).json('article not found')
    res.status(200).json({
        message : `${req.body.name} has been updated successfully!`,
        article : article})
  } catch (error) {
    console.log(error);
  }
};

const checkId = (req, res) => {
  const lengthId = req.params.id.length;
  if (lengthId > 24 || lengthId < 24)
    return res.status(404).json("article not found !");
};

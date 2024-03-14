import express from "express"
import { env } from "./config/index.js";
import mongoose from "mongoose";
import cors from 'cors'
import cookieParser from "cookie-parser";
// ROUTES
import userRouter from './routes/users.router.js'
import articleRouter from './routes/articles.router.js'
// APP EXPRESS
 const app = express();

//PORT
const PORT = env.port || 8080
//DATABASE MONGOOSE

mongoose
  .connect(env.mongoURI , {dbName: 'canapPlus'})
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.log(error));

//MIDLLEWARE
app.use(express.json())
app.use(cors())
app.use(cookieParser())
// PREFIX ROUTES
app.use('/api/user' , userRouter)
app.use('/api/articles' , articleRouter)


//SERVER
app.listen( PORT , () => {
console.log( ` Vous etes connectés sur le port ${PORT}`);
})
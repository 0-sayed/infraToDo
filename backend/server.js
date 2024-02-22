import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDb from "./config/dp.js";
import taskRoute from "./routes/taskRoute.js";
import bodyParser from "body-parser";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();
connectToDb();

const app = express(); 
const port = process.env.PORT;

app.use(cors());
// for form data
app.use(bodyParser.urlencoded({ extended: false }));
// for postman testing with json
app.use(bodyParser.json());

app.use("/api/task/", taskRoute);

app.use(errorHandler);

app.listen(port, ()=>{
  console.log("listening on port",port)
});

import express from 'express';
import authRoutes from "./route/auth"
import todoRoutes from "./route/todo"
import databaseConnection from "./db/db";
import cors from "cors";
const app = express();

app.use(cors());


const port = 3000;
databaseConnection();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", todoRoutes);

app.get('/', function (req: any, res: any) {
  res.send('Hello World')
})

app.listen(port, () => {
  console.log("server running on localhost:3000");
});
import express from "express";
import userRouter from "./route/userRoute";
import cors from "cors"

const app = express()
const port: number = 5050

app.use(cors());
app.use(express.json())
app.use("/users", userRouter) // Добавление роута на маршрут http://localhost:5050/users

app.listen( port, ():void =>  { // При успешном запуске сервера, выводит сообщение в консоль 
  return console.log(`Server Start: http://localhost:${port}`)
})
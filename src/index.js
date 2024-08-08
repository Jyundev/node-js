import cors from "cors"
import express from "express"
import helmet from "helmet"
// import userController from "./controllers/users/index"
import Controllers from "./controllers"

const app = express()

// 미들웨어
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended: true, limit: "700mb"}))


// app.use("/users", userController.router);
Controllers.forEach((controller) => {
    app.use(controller.path, controller.router)
})

app.listen(8000, () => {
    console.log("서버가 시작되었습니다.")
});
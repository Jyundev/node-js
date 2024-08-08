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

app.use((err, req, res, next)=>{
    res.status(err.status || 500)
    .json({message: err.message || "에러가 발생했습니다."})
})

app.listen(8000, () => {
    console.log("서버가 시작되었습니다.")
});
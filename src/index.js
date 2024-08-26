import cors from "cors"
import express from "express"
import helmet from "helmet"
// import userController from "./controllers/users/index"
import swaggerUI from "swagger-ui-express"
import Controllers from "./controllers"
import { options, swaggerDocs } from "./swagger"

const app = express()

// 미들웨어
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: "700mb" }))


// app.use("/users", userController.router);
Controllers.forEach((controller) => {
    app.use(controller.path, controller.router)
})

app.get("/swagger.json", (req, res) => {
    res.status(200).json(swaggerDocs);
});


app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(undefined, options))

app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500)
        .json({ message: err.message || "에러가 발생했습니다." })
})

app.listen(8000, () => {
    console.log("서버가 시작되었습니다.")
});
import cors from "cors";
import express, { Router } from "express";
import helmet from "helmet";

let users = [
    {
        id: 1,
        name: "yunyoung",
        age: 12
    }
]

const app = express();

// 미들웨어
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "700mb" }));

const userRouter = Router((req, res) => {
    res.statue(200).json({users})
});

// GET /users/detail/:id
// 유저 한명을 불러오는 API
userRouter.get("/detail/:id", (req, res) => {
    const {id} = req.params;
    const user = users.find((user) => user.id === Number(id));
    res.status(200).json({user})
});

// POST /users:
// 유저를 생성하는 API
userRouter.post("/", (req, res) => {
    const { name, age } = req.body;
    const idx = (users.length > 0) ? (users[users.length - 1].id + 1) : new Date().getTime();
    
    users.push({
        id: idx,
        name,
        age
    })

    res.status(201).json({ message: "유저 생성 성공" });

});

// 유저 라우터 등록
app.use("/users", userRouter)


app.listen(8000, () => {
    console.log("Start server")
})
import bcrypt from "bcrypt";
import cors from "cors";
import dayjs from "dayjs";
import express from "express";
import helmet from "helmet";
import jwt from "jsonwebtoken";

const app = express();

let users = [{
    id: 1,
    name: "yunyoung",
    age: 12
}]
// Application Level 미들웨어 
app.use(cors());
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: "700mb" }))

// GET Method
// 유저 정보 가져오기
// 성공 status : 200
app.get("/users", (req, res) => {
    res.status(200).json({ users })
})

// POST Method
// 유저 생성
// 성공 status : 201
app.post("/users", (req, res) => {
    const { name, age } = req.body;
    users.push({
        id: new Date().getTime(),
        name,
        age
    })

    res.status(201).json({ message: "유저 생성 성공" });

    
})

// PATCH Method
// 유저 수정 
// 성공 status : 204
app.patch("/users/:id", (req, res) => {
    const { id } = req.params;
    const { name, age } = req.body;

    const targetUserIdx = users.findIndex((user) => user.id === Number(id));
    users[targetUserIdx] = {
        id: users[targetUserIdx].id,
        name: name ?? users[targetUserIdx].name,
        age: age ?? users[targetUserIdx].age
    };

    res.status(204).json({});
});

// DELETE Method
// 유저 삭제  
// 성공 status : 204
app.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    const deleteUsers = users.filter((user) => user.id !== Number(id));
    users = deleteUsers;
    res.status(204).json({});

})

const today = new Date();
const todayToDays = dayjs(today).format("YYYY-MM-DD")
console.log(todayToDays)

// 비밀번호를 해싱
const password = "1234";
const hashedPassword = bcrypt.hashSync(password, 10);
console.log({ hashedPassword });

const token = jwt.sign(password, "adsjfjaskk");

console.log({ token });

// req : 요청(request)
// res : 응답 (request)
app.get("/", (req, res) => {
    res.send("Node JS 강의 본격 시작")
})

app.listen(8000, (() => {
    console.log("서버가 시작되었습니다");
}))


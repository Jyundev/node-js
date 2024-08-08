import { Router } from "express";

// Router
class UserController {
    // 클래스 내에서는 멤버 변수를 선언할 때 따로 const나 let을 사용할 필요가 없다.
    router;
    path = "/users"
    users = [
        {
            id: 1,
            name: "yunyoung",
            age: 12
        }
    ];

    constructor() {
        this.router = Router();
        this.init();

    }

    init() {
        this.router.get("/", this.getUsers.bind(this))
        this.router.get("/detail/:id", this.getUser.bind(this))
        this.router.post("/", this.createUser.bind(this))

    }

    getUsers(req, res) {
        res.status(200).json({ users: this.users })
    }

    getUser(req, res, next) {
        try {
            const { id } = req.params
            const user = this.users.find((user) => user.id === Number(id))
            if(!user){
                throw({status: 404, message: "유저를 찾을 수 없습니다."})
            }
            res.status(200).json({ user });
        } catch (err) {
            next(err)
        }
    }

    createUser(req, res, next) {
        try {
            const { name, age } = req.body;
            // const id = (this.users.length != 0) ? this.users.length : new Date().getTime();
            this.users.push({
                id: new Date().getTime(),
                name,
                age
            });

            res.status(201).json({ message: "create user successful!" })
        } catch (err) {
            next(err);
        }
    }

}

const userController = new UserController();
export default userController;

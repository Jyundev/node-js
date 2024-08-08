import { Router } from "express";

// Router
class UserController{
    router;
    users = [
        {
            id: 1,
            name: yunyoung,
            age: 12
        }
    ];

    constructor(){
        this.router = Router();
    }

    init(){
        this.router.get("/", this.getUsers.bind(this))
        this.router.get("/detail/:id", this.getUser .bind(this))
        this.router.get("/", this.createUser.bind(this))

    }
    
    getUsers(req, res){
        res.status(200).json({users: this.users})
    }

    getUser(){
        
    }

    createUser(){

    }

}
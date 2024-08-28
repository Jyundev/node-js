import { Router } from "express";

class PostController {
    router;
    path = "/posts"
    posts = [
        {
            id: 1,
            content: "hello",
            nickname: "yun",
            date: new Date().getDate()
        }
    ]


    constructor() {
        this.router = Router();
        this.init();
    }

    init() {
        this.router.get("/", this.getPosts.bind(this))
        this.router.get("/detail/:id", this.getPost.bind(this))
        this.router.post("/", this.createPost.bind(this))
        this.router.delete("/:id", this.deletePost.bind(this))
    }


    getPosts(req, res) {
        res.status(200).json({ users: this.posts })

    }

    getPost(req, res) {
        const {id} = req.params;
        const post = this.posts.find((post)=> post.id === Number(id))
        res.status(200).json({post})

    }

    createPost(req, res) {
        // const id = (this.posts.length > 0) ? this.posts.length : new Date().getTime();
        const {content, nickname} = req.body;

        this.posts.push({
            id: new Date().getTime(),
            content,
            nickname,
            date: new Date().getDate()
        });

        res.status(201).json({"message" : "User created successfully!"})

    }

    deletePost(req, res) {
        const {id} = req.params;
        const deletePosts = this.posts.filter((post)=> post.id !== Number(id))
        this.posts = deletePosts;

        res.status(204).json({})

    }
}


const postController = new PostController();
export default postController;
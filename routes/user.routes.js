const express = require("express")
const { UserModel } = require("../models/UserModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userRouter = express.Router()

userRouter.get("/", (req, res) => {
    res.send("All the user")

})

userRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    bcrypt.hash(password, 5, async function (err, hash) {
        if (err) return res.send({ message: "something went wrong", status: 0 })
        try {
            let user = new UserModel({ name, email, password: hash })
            await user.save()
            res.status(200).json({
                message: "User created",
                status: 1
            })
        } catch (error) {
            res.status(400).send(
                error
            )
        }
    });
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    let option ={
        expiresIn:"3m"
    }

    try {
        let data = await UserModel.find({ email })
        if (data.length > 0) {
            let token = jwt.sign({ userId: data[0]._id }, "harshan",option);
            bcrypt.compare(password, data[0].password, function (err, result) {
                if (err)
                    return res.send({ message: "something went wrong" + err, status: 0 })
                if (result) {
                    res.send({
                        message: "User logged in successfully",
                        token: token,
                        status: 1,
                    });
                }
                    });
                } else {
                    res.send({
                        message: "user does not exist",
                        status: 0,
                    });
                }
            } catch (error) {
                res.send({
                    message: error.message,
                    status: 0,
                });

            }


        });

module.exports = { userRouter }
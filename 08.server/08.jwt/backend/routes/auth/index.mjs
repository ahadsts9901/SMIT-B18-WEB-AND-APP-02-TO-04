import express from "express"
import { UserModel } from "../../models/index.mjs"
import { emailPattern } from "../../utils/core.mjs"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const router = express.Router()

router.post("/signup", async (req, res, next) => {
    try {
        const firstname = req.body.firstname
        const lastname = req.body.lastname
        const email = req.body.email
        const password = req.body.password

        // required validation
        if (!firstname) {
            return res.status(400).send({
                message: "firstname is required"
            })
        }
        if (!lastname) {
            return res.status(400).send({
                message: "lastname is required"
            })
        }
        if (!email) {
            return res.status(400).send({
                message: "email is required"
            })
        }
        if (!password) {
            return res.status(400).send({
                message: "password is required"
            })
        }

        // pattern validation
        if (!emailPattern.test(email.toLowerCase())) {
            return res.status(400).send({
                message: "email is invalid"
            })
        }

        // check if email exist 
        const user = await UserModel.findOne({ email: email.toLowerCase() })

        if (user) {
            return res.status(400).send({
                message: "email already taken"
            })
        }

        // generate password hash
        const passwordHash = await bcrypt.hash(password, 12)

        // store data in database
        await UserModel.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: passwordHash,
        })

        return res.send({
            message: "signup done"
        })

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "internal server error"
        })
    }
})

router.post("/login", async (req, res, next) => {
    try {
        const email = req.body.email
        const password = req.body.password

        // required validation
        if (!email) {
            return res.status(400).send({
                message: "email is required"
            })
        }
        if (!password) {
            return res.status(400).send({
                message: "password is required"
            })
        }

        // pattern validation
        if (!emailPattern.test(email.toLowerCase())) {
            return res.status(400).send({
                message: "invalid credentials"
            })
        }

        const userAccount = await UserModel.findOne({ email: email.toLowerCase() })

        if (!userAccount) {
            return res.status(400).send({
                message: "invalid credentials"
            })
        }

        const isPasswordTrue = await bcrypt.compare(password, userAccount.password)

        if (!isPasswordTrue) {
            return res.status(400).send({
                message: "invalid credentials"
            })
        }

        // generate token
        const token = jwt.sign(
            {
                email: userAccount.email,
                _id: userAccount._id
            },
            process.env.JWT_KEY,
            { expiresIn: '15m' }
        )

        return res.send({
            message: "login done",
            data: token
        })

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "internal server error"
        })
    }
})

export default router

import express from "express"
import { EmailOtpModel, PasswordOtpModel, UserModel } from "../../models/index.mjs"
import { emailPattern } from "../../utils/core.mjs"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import otpGenerator from 'otp-generator'
import { sendEmail } from "../../utils/functions.mjs"

const router = express.Router()

// auth apis
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

        if (!userAccount?.isEmailVerified) {
            return res.status(400).send({
                message: "email is not verified"
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
            { expiresIn: '1d' }
        )

        return res.send({
            message: "login done",
            data: {
                token: token,
                user: userAccount
            }
        })

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "internal server error"
        })
    }
})

// verfication apis
router.post("/send-otp", async (req, res, next) => {
    try {
        const email = req.body.email

        // email validation
        if (!email) {
            return res.status(400).send({
                message: "email is required"
            })
        }

        // pattern validation
        if (!emailPattern.test(email.toLowerCase())) {
            return res.status(400).send({
                message: "email is invalid"
            })
        }

        const user = await UserModel.findOne({ email: email })

        if (!user) {
            return res.status(404).send({
                message: "account not found"
            })
        }

        // generate otp
        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false,
        });

        // generate otpHash
        const otpCodeHash = await bcrypt.hash(otp, 12)

        // save otp hash it to database with user email
        await EmailOtpModel.create({
            email: email,
            otpCodeHash: otpCodeHash
        })

        // send otp to email
        await sendEmail(
            email,
            "Verify Your Email",
            `Hello user here is your email verification OTP ${otp} please don't share with anyone`
        )

        return res.send({
            message: "otp sent successfully",
        })

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "internal server error"
        })
    }
})

router.post("/verify-otp", async (req, res, next) => {
    try {
        const email = req.body.email
        const otp = req.body.otp

        // email validation
        if (!email) {
            return res.status(400).send({
                message: "email is required"
            })
        }

        // pattern validation
        if (!emailPattern.test(email.toLowerCase())) {
            return res.status(400).send({
                message: "email is invalid"
            })
        }

        // otp validation
        if (!otp) {
            return res.status(400).send({
                message: "otp is required"
            })
        }

        // does otp exist for email
        const existingOtp = await EmailOtpModel.findOne({ email: email }).sort({ createdAt: -1 })

        if (!existingOtp) {
            return res.status(400).send({
                message: "otp is invalid"
            })
        }

        // is otp correct
        const isOtpValid = await bcrypt.compare(otp, existingOtp.otpCodeHash)
        if (!isOtpValid) {
            return res.status(400).send({
                message: "otp is invalid"
            })
        }

        // mark email verified
        await UserModel.updateOne({ email: email }, {
            $set: {
                isEmailVerified: true
            }
        })

        return res.send({
            message: "email verified"
        })

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "internal server error"
        })
    }
})

// forgot password
router.post("/forgot-password", async (req, res, next) => {
    try {
        const email = req.body.email

        // email validation
        if (!email) {
            return res.status(400).send({
                message: "email is required"
            })
        }

        // pattern validation
        if (!emailPattern.test(email.toLowerCase())) {
            return res.status(400).send({
                message: "email is invalid"
            })
        }

        const user = await UserModel.findOne({ email: email })

        if (!user) {
            return res.status(404).send({
                message: "account not found"
            })
        }

        // generate otp
        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false,
        });

        // generate otpHash
        const otpCodeHash = await bcrypt.hash(otp, 12)

        // save otp hash it to database with user email
        await PasswordOtpModel.create({
            email: email,
            otpCodeHash: otpCodeHash
        })

        // send otp to email
        await sendEmail(
            email,
            "Forgot Password OTP",
            `Hello user here is your forgot password OTP ${otp} please don't share with anyone`
        )

        return res.send({
            message: "otp sent successfully",
        })

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "internal server error"
        })
    }
})

router.post("/forgot-password-complete", async (req, res, next) => {
    try {
        const email = req.body.email
        const otp = req.body.otp
        const newPassword = req.body.newPassword

        // email validation
        if (!email) {
            return res.status(400).send({
                message: "email is required"
            })
        }

        // pattern validation
        if (!emailPattern.test(email.toLowerCase())) {
            return res.status(400).send({
                message: "email is invalid"
            })
        }

        // otp validation
        if (!otp) {
            return res.status(400).send({
                message: "otp is required"
            })
        }

        // password validation
        if (!newPassword) {
            return res.status(400).send({
                message: "password is required"
            })
        }

        // does otp exist for email
        const existingOtp = await PasswordOtpModel.findOne({ email: email }).sort({ createdAt: -1 })

        if (!existingOtp) {
            return res.status(400).send({
                message: "otp is invalid"
            })
        }

        // is otp correct
        const isOtpValid = await bcrypt.compare(otp, existingOtp.otpCodeHash)
        if (!isOtpValid) {
            return res.status(400).send({
                message: "otp is invalid"
            })
        }

        const passwordHash = await bcrypt.hash(newPassword, 12)

        // mark email verified
        await UserModel.updateOne({ email: email }, {
            $set: {
                password: passwordHash
            }
        })

        return res.send({
            message: "password updated"
        })

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "internal server error"
        })
    }
})

export default router

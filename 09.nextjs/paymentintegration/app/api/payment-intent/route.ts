import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export const GET = async (req: NextRequest) => {
    try {
        const amount = 1000

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Amount is in cents
            currency: 'pkr', // currency
            payment_method_types: ['card'], // method
        });

        return NextResponse.json({
            message: "payment intent created",
            clientSecret: paymentIntent.client_secret,
        })

    } catch (error) {
        console.error(error);
    }
}

export const POST = (req: NextRequest) => {
    try {
        return NextResponse.json({
            message: "hello world"
        })

    } catch (error) {
        console.error(error);
    }
}

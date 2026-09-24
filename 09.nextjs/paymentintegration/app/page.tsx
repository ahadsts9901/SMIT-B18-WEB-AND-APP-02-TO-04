"use client"

import { useEffect, useState } from "react";
import axios from "axios"; // install from npm
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"; // install from npm
import { useRouter } from "next/navigation";

const Payment = () => {

  const router = useRouter()

  const baseUrl = "http://localhost:3000" // backend api url

  const stripe: any = useStripe(); // initializatoin
  const elements = useElements(); // initializatoin
  const [error, setError] = useState(null); // error handling state
  const [isLoading, setIsLoading] = useState<boolean>(false); // loading state
  const [clientSecret, setClientSecret] = useState<any>(null); // stripe secret handling state

  useEffect(() => {
    // this functoin will get the payment secret from backend
    getSecretFromBackend()
  }, [])

  const getSecretFromBackend = async () => {
    // api call to get payment secret
    const resp = await axios.get(`${baseUrl}/api/payment-intent`,)
    setClientSecret(resp?.data?.clientSecret) // here is the payment secret

  }

  const handleClick = async (e: any) => {

    e?.preventDefault();
    setIsLoading(true);
    // got this from stripe official docs
    const cardElement = elements?.getElement(CardElement);
    const { paymentIntent, error }: any = await stripe?.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      // if there is any error
      console.log(error)
      setError(error.message);
      setIsLoading(false);
    } else if (paymentIntent.status === 'succeeded') {
      // on successfull payment
      setIsLoading(false);
      alert("payment successfull")
      router.push("/post")
    }
  };

  return (
    <div className="p-8">
      <h1 className="my-8">Stripe Payment Gateway</h1>
      {/* this card element is provided by stripe itself */}
      <div><CardElement /></div>
      {/* payment button */}
      <button className="bg-green-500 p-2 px-4 cusror-pointer w-fit m-8" onClick={handleClick} >{isLoading ? "In Progress" : "Pay"}</button>
    </div>
  );
};

export default Payment;
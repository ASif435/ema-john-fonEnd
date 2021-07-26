import React from 'react'
import {  Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import SimpleCartForm from './SimpleCartForm'

const stripePromise = loadStripe(
  'pk_test_51JEnJYK5piEEHVoJsZy1UseJjGl4GLrX7rxzcKUyxMoe9YTbu9n8nlOFcNzcI1a9w5QhdwTrjKDsDHIV1MYC0RnV00c59vYIKI'
)

const ProcessPayment = () => {
  return (
    <>
      <Elements stripe={stripePromise}>
        <SimpleCartForm/>
      </Elements>
    </>
  )
}

export default ProcessPayment

const express = require('express')
const router = express.Router()
const { raveResponse } = require('../common-helpers/helpers')

router.post('/', async (req, res, next) => {
  const { amount, cardNumber: cardno, expiryDate, cvv } = req.body
  const expirymonth = expiryDate.substring(0, 2)
  const expiryyear = expiryDate.substring(3, 5)

  // use 'Test VisaCard 3D-Secure Authentication' from https://developer.flutterwave.com/docs/test-cards
  // which has an authurl
  try {
    const payload = {
      PBFPubKey: process.env.RAVE_PUBLIC_KEY,
      cardno,
      cvv,
      expirymonth,
      expiryyear,
      currency: 'ZMW',
      country: 'ZM',
      amount,
      email: 'user@gmail.com',
      phonenumber: '0902620185',
      firstname: 'firstname',
      lastname: 'lastname',
      txRef: 'MC-' + Date.now(), // your unique merchant reference
      redirect_url: 'http://localhost:5000/verify'
    }

    const result = await raveResponse(payload)
    // const { txRef, amount } = result.body.response
    console.log(result)
    // res.render('transactionSuccessful', { txRef, amount })
    res.json({
      statusCode: 200,
      message: result.body.data
    })
  } catch (error) {
    res.json({
      statusCode: 500,
      message: error
    })
  }
})

module.exports = router

const express = require('express')
const router = express.Router()
const { raveResponse } = require('../common-helpers/helpers')

// Don't forget to change the mode from 'test' to 'live' mode when testing with a real card
router.post('/', async (req, res, next) => {
  const { amount, cardNumber: cardno, expiryDate, cvv } = req.body
  const expirymonth = expiryDate.substring(0, 2)
  const expiryyear = expiryDate.substring(3, 5)
  // use 'Test VisaCard 3D-Secure Authentication' from https://developer.flutterwave.com/docs/test-cards
  // which has an authurl
  try {
    const payload = {
      PBFPubKey: process.env.RAVE_PUBLIC_KEY_TEST,
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
    res.json({
      statusCode: 200,
      message: result.body.data
    })
  } catch (error) {
    if (error.response) {
      res.json({
        statusCode: error.response.status,
        message: error.response.body.message
      })
    }
    res.json({
      statusCode: 500,
      message: error
    })
  }
})

module.exports = router

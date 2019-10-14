const express = require('express')
const router = express.Router()

const { raveResponse } = require('../common-helpers/helpers')

router.post('/', async (req, res, next) => {
  const { amount, mobileNumber: phonenumber } = req.body
  try {
    const payload = {
      PBFPubKey: process.env.RAVE_PUBLIC_KEY_TEST,
      currency: 'ZMW',
      country: 'ZM',
      payment_type: 'mobilemoneyzambia',
      amount,
      network: 'MTN',
      email: 'user@gmail.com',
      phonenumber, // MTN Zambia mobile number here
      firstname: 'firstname',
      lastname: 'lastname',
      txRef: 'MC-' + Date.now(), // your unique merchant reference
      is_mobile_money_ug: 1
    }

    const result = await raveResponse(payload)
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

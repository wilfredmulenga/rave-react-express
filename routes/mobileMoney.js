const express = require('express')
const router = express.Router()

const { raveResponse } = require('../common-helpers/helpers')

router.post('/', async (req, res, next) => {
  const { amount } = req.body

  const payload = {
    PBFPubKey: process.env.RAVE_PUBLIC_KEY,
    currency: 'ZMW',
    country: 'ZM',
    payment_type: 'mobilemoneyzambia',
    amount,
    network: 'MTN',
    email: 'user@gmail.com',
    phonenumber: '0967639241', // MTN Zambia mobile number here
    firstname: 'temi',
    lastname: 'desola',
    txRef: 'MC-' + Date.now(), // your unique merchant reference
    is_mobile_money_ug: 1
  }

  await raveResponse(payload)
  // res.json({message: value})
})

module.exports = router

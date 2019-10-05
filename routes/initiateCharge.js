const express = require('express')
const router = express.Router()
const { raveResponse } = require('../common-helpers/helpers')

router.post('/', async (req, res, next) => {
  const { amount, cardNumber: cardno, expiryDate, cvv } = req.body
  const expirymonth = expiryDate.substring(0, 2)
  const expiryyear = expiryDate.substring(3, 5)

  const payload = {
    PBFPubKey: process.env.RAVE_PUBLIC_KEY,
    cardno,
    cvv,
    expirymonth,
    expiryyear,
    currency: 'ZMW',
    country: 'ZM',
    amount,
    // 'pin': '3310',
    // 'suggested_auth': 'PIN',
    email: 'user@gmail.com',
    phonenumber: '0902620185',
    firstname: 'temi',
    lastname: 'desola',
    txRef: 'MC-' + Date.now() // your unique merchant reference
    // "redirect_url": "https://rave-webhook.herokuapp.com/receivepayment"
  }

  await raveResponse(payload)
  // res.json({message: value})
})

module.exports = router

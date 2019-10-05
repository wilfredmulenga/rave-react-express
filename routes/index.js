const express = require('express')
const router = express.Router()
const superagent = require('superagent')
const { encrypt } = require('../common-helpers/helpers')

router.post('/', async (req, res, next) => {
  const { amount, cardNumber: cardno, expiryDate, cvv } = req.body
  const expirymonth = expiryDate.substring(0, 2)
  const expiryyear = expiryDate.substring(3, 5)

  const payload = {
    'PBFPubKey': process.env.RAVE_PUBLIC_KEY,
    cardno,
    cvv,
    expirymonth,
    expiryyear,
    'currency': 'ZMW',
    'country': 'ZM',
    amount,
    // 'pin': '3310',
    // 'suggested_auth': 'PIN',
    'email': 'user@gmail.com',
    'phonenumber': '0902620185',
    'firstname': 'temi',
    'lastname': 'desola',
    'txRef': 'MC-' + Date.now() // your unique merchant reference
    // "redirect_url": "https://rave-webhook.herokuapp.com/receivepayment"
  }

  const raveResponse = (payload) => {
    superagent
      .post(process.env.RAVE_CHARGE_ENDPOINT)
      .set({ 'Content-Type': 'application/json', 'Accept': 'application/json' })
      .send({
        PBFPubKey: process.env.RAVE_PUBLIC_KEY,
        client: encrypt(payload),
        alg: '3DES-24'
      })
      .end((err, result) => {
        if (err) {
          // TODO: handle error
          res.json({
            message: err
          })
        }
        console.log(result.body)
        res.json({
          statusCode: result.statusCode,
          message: result.body
        })
      })
  }

  await raveResponse(payload)
  // res.json({message: value})
})

// TODO: not getting the right response when validating the transaction. find out if this is needed
router.post('/validate', async (req, res, next) => {
  const { transaction_reference, otp } = req.body  // eslint-disable-line

  const raveResponse = () => {
    superagent
      .post(process.env.RAVE_VALIDATE_ENDPOINT)
      .send({
        PBFPubKey: process.env.RAVE_PUBLIC_KEY,
        transaction_reference,
        otp
      })
      .end((err, result) => {
        if (err) {
          // TODO: handle error
          res.json({
            message: err
          })
        }
        console.log(result.body)
        res.json({
          statusCode: result.statusCode,
          message: result.body
        })
      })
  }

  await raveResponse()
})

module.exports = router

const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const forge = require('node-forge')
const superagent = require('superagent')

router.post('/', async (req, res, next) => {
  const { amount, cardNumber, expiryDate, cvv } = req.body
  const expirymonth = expiryDate.substring(0, 2)
  const expiryyear = expiryDate.substring(3, 5)

  const payload = {
    'PBFPubKey': process.env.RAVE_PUBLIC_KEY,
    cardNumber,
    cvv,
    expirymonth,
    expiryyear,
    'currency': 'NGN',
    'country': 'NG',
    amount,
    'email': 'user@gmail.com',
    'phonenumber': '0902620185',
    'firstname': 'temi',
    'lastname': 'desola',
    'txRef': 'MC-' + Date.now() // your unique merchant reference
    // "redirect_url": "https://rave-webhook.herokuapp.com/receivepayment"
  }

  const getKey = () => {
    const secKey = process.env.RAVE_SECRET_KEY
    const keymd5 = crypto.createHash('md5').update(process.env.RAVE_SECRET_KEY).digest('hex')
    const keymd5last12 = keymd5.substr(-12)
    const seckeyadjusted = secKey.replace('FLWSECK-', '')
    const seckeyadjustedfirst12 = seckeyadjusted.substr(0, 12)
    return seckeyadjustedfirst12 + keymd5last12
  }

  const encrypt = (payload) => {
    payloadJSON = JSON.stringify(payload)
    let cipher = forge.cipher.createCipher('3DES-ECB', forge.util.createBuffer(getKey()))
    cipher.start({iv: ''})
    cipher.update(forge.util.createBuffer(payloadJSON, 'utf-8'))
    cipher.finish()
    let encrypted = cipher.output
    return (forge.util.encode64(encrypted.getBytes()))
  }

  const raveResponse = (payload) => {
    superagent
      .post(process.env.RAVE_CHARGE_ENDPOINT_TEST)
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
  // TODO: handle await
  // await raveResponse(payload)
  // res.json({message: value})
})

module.exports = router

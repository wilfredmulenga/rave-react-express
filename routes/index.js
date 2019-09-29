const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const CryptoJS = require('crypto-js');
const forge    = require('node-forge');
const utf8     = require('utf8');

router.get('/', async (req, res, next) =>  {
  const payload = {
    "PBFPubKey": process.env.RAVE_PUBLIC_KEY,
    "cardno": "5438898014560229",
    "cvv": "890",
    "expirymonth": "09",
    "expiryyear": "19",
    "currency": "NGN",
    "country": "NG",
    "amount": "10",
    "email": "user@gmail.com",
    "phonenumber": "0902620185",
    "firstname": "temi",
    "lastname": "desola",
    "txRef": "MC-" + Date.now(),// your unique merchant reference
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
  var cipher   = forge.cipher.createCipher('3DES-ECB', forge.util.createBuffer(getKey()));
  cipher.start({iv:''});
  cipher.update(forge.util.createBuffer(payload, 'utf-8'));
  cipher.finish();
  var encrypted = cipher.output;
  return (forge.util.encode64(encrypted.getBytes()));
}

const raveResponse = (payload) => {
  console.log(here. process.env.RAVE_CHARGE_ENDPOINT)
  .post(process.env.RAVE_CHARGE_ENDPOINT)
  .set({ 'Content-Type': 'application/json', 'Accept': 'application/json' })
  .send({
    PBFPubKey: process.env.RAVE_PUBLIC_KEY,
    client: encrypt(payload),
    alg: '3DES-24'
  })
}
// TODO: handle await
  const value = await raveResponse(payload)
  res.json({message: value})
})

module.exports = router

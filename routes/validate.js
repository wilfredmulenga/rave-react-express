const express = require('express')
const router = express.Router()

// TODO: not getting the right response when validating the transaction. find out if this is needed
router.post('/', async (req, res, next) => {
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

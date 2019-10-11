const express = require('express')
const router = express.Router()

// TODO: not getting the right response when validating the transaction. find out if this is needed
router.get('/', (req, res, next) => {
  const queryParams = JSON.parse(req.query.response)  // eslint-disable-line
  const { txRef, status, charged_amount: chargedAmount, vbvrespmessage } = queryParams
  if (status === 'successful' && vbvrespmessage === 'Approved. Successful') {
    res.send({
      statusCode: 200,
      message: {
        txRef,
        chargedAmount
      }
    })
  }
  res.send({
    statusCode: 500,
    message: 'Error processing transaction'
  })
})

module.exports = router

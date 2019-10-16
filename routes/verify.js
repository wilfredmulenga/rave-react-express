const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  const queryParams = JSON.parse(req.query.response)
  const { txRef, status, charged_amount: amount, vbvrespmessage } = queryParams
  if (status === 'successful' && vbvrespmessage === 'Approved. Successful') {
    res.render('transactionSuccessful', { txRef, amount })
  } else {
    res.render('transactionUnsuccessful')
  }
})

module.exports = router

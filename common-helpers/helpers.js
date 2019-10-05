const crypto = require('crypto')
const forge = require('node-forge')

const getKey = () => {
  const secKey = process.env.RAVE_SECRET_KEY
  const keymd5 = crypto.createHash('md5').update(process.env.RAVE_SECRET_KEY).digest('hex')
  const keymd5last12 = keymd5.substr(-12)
  const seckeyadjusted = secKey.replace('FLWSECK-', '')
  const seckeyadjustedfirst12 = seckeyadjusted.substr(0, 12)
  return seckeyadjustedfirst12 + keymd5last12
}

export const encrypt = (payload) => {
  payloadJSON = JSON.stringify(payload)
  let cipher = forge.cipher.createCipher('3DES-ECB', forge.util.createBuffer(getKey()))
  cipher.start({iv: ''})
  cipher.update(forge.util.createBuffer(payloadJSON, 'utf-8'))
  cipher.finish()
  let encrypted = cipher.output
  return (forge.util.encode64(encrypted.getBytes()))
}

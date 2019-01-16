//app.js
import Token from 'utils/Token'
App({
  onLaunch () {
    let token = new Token
    token.verify()
  }
})
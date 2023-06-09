import React, { useEffect } from 'react'
import Header from '../Header/Header'
import GoogleLoginButton from '../GoogleLoginButton'
import { gapi } from 'gapi-script'

const Autorisation = () => {

  useEffect(()=>{
    function start(){
      gapi.client.init({
        clientId: "418515988040-0s4fqsbdum0vrvc24m3rotfg5gp7m1c4.apps.googleusercontent.com",
        scope: ""
      })
    }

    gapi.load('client:auth2', start)
  })

  return (
    <div>
        <Header/>
        <GoogleLoginButton/>
    </div>
  )
}

export default Autorisation
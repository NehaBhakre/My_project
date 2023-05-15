import React from 'react'
import firebase from './components/firebase'
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import {  signInWithPhoneNumber } from "firebase/auth";



class App extends React.Component {
  handleChange = (e) =>{
    const {name, value } = e.target
    this.setState({
        [name]: value
      })
  }
  configureCaptcha = () =>{

    
const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          this.onSignInSubmit();
          console.log("recaptcha verified")
        },
        defaultCountry: "IN"

      }, auth);
    }
    onSignInSubmit = (e) => {
      e.preventDefault()
      this.configureCaptcha()
      const phoneNumber = "+91" + this.state.mobile
      console.log(phoneNumber)
    
      const appVerifier = window.recaptchaVerifier;
      
      const auth = getAuth();
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
          .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            alert("otp sent")
            // ...
          }).catch((error) => {
            // Error; SMS not sent
            // ...
            alert("sms not sent")
          });
    }
    onSubmitOTP = (e) =>{
      e.preventDefault()
      const code =this.state.otp
      console.log(code)
      window.confirmationResult.confirm(code).then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(JSON.stringify(user))
        alert("user is verifieed")
        // ...
      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        alert("otp is wrong")
      });
    }
    render() {
      return (
        <div className='main'>
          <h2>Login Form</h2>
          <form onSubmit={this.onSignInSubmit}>
            <div id="sign-in-button" ></div>
            <input type="number" name="mobile" placeholder="Mobile number" required onChange={this.handleChange}/>
            <button type="submit" name='log'>Submit</button>
          </form>
  
          <h2>Enter OTP</h2>
          <form onSubmit={this.onSubmitOTP}>
            <input type="number" name="otp" placeholder="OTP Number" required onChange={this.handleChange}/>
            <button type="submit" name='submit'>Submit</button>
          </form>
        </div>
      )
    }
  }
  export default App
  
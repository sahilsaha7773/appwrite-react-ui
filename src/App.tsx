import { useState } from 'react'
import { Client } from 'appwrite';
import './App.css'
import { EmailPassCreate, MagicAuth, OAuth, EmailPassSignIn, Phone } from './lib';
import awLogo from './assets/images/built-with-appwrite.svg';

function App() {
  const projectId: string = "641d6401ae3f0be3c88f";
  const endpoint: string = "http://localhost/v1";
  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId);
  const [success1, setSuccess1] = useState(""); // For Sign Up
  const [success2, setSuccess2] = useState(""); // For Sign In
  const [tabIndex, setTabIndex] = useState(0);
  const successSignUp = (resp: any) => {
    console.log("Sign Up success");
    setSuccess1("Account Created Successfully, try signing In!");
    console.log(resp);
  }
  const failureSignUp = (err: any) => {
    console.log("Sign Up failed");
    console.log(err.message);
  }

  const successSiginIn = (resp: any) => {
    console.log("Sign In  success");
    setSuccess2("Signed In Successfully");
    console.log(resp);
  }
  const failureSignIn = (err: any) => {
    console.log("Sign In failed");
    console.log(err.message);
  }

  return (
    <div className="wrapper">
      <div className="header">
        <img
          style={{
            margin: "40px auto 10px  auto"
          }}
          src={awLogo}
          width="120px" />

        <h1>React UI Helper Library</h1>
      </div>

      <div className="tabs">
        <div className="tab">
          <button className={tabIndex == 0 ? "active" : ""} onClick={(e) => {
            e.preventDefault();
            setTabIndex(0);
          }}>Email</button>
        </div>
        <div className="tab">
          <button className={tabIndex == 1 ? "active" : ""} onClick={(e) => {
            e.preventDefault();
            setTabIndex(1);
          }}>OAuth</button>
        </div>
        <div className="tab">
          <button className={tabIndex == 2 ? "active" : ""} onClick={(e) => {
            e.preventDefault();
            setTabIndex(2);
          }}>Magic Auth</button>
        </div>
        <div className="tab">
          <button className={tabIndex == 3 ? "active" : ""} onClick={(e) => {
            e.preventDefault();
            setTabIndex(3);
          }}>Phone Auth</button>
        </div>
      </div>

      {
        tabIndex == 0 &&
        <div className="emailWrap">
          <div className='card'>
            <h1
              style={{
                margin: "0px 0 20px 0",
              }}>Create Account</h1>
            {success1.length > 0 &&
              <div className="success">
                <span className="close-icon" onClick={() => {
                  setSuccess1("");
                }}>&times;</span>
                {success1}
              </div>
            }
            <EmailPassCreate
              client={client}
              success={successSignUp}
              failure={failureSignUp}
              nameRequired={true}
              showFailureError={true}
            />
          </div>
          <div className='card'>
            <h1
              style={{
                margin: "0px 0 20px 0",
              }}>Sign in</h1>
            {success2.length > 0 &&
              <div className="success">
                <span className="close-icon" onClick={() => {
                  setSuccess2("");
                }}>&times;</span>
                {/* <br /> */}
                {success2}
              </div>
            }
            <EmailPassSignIn
              client={client}
              success={successSiginIn}
              failure={failureSignIn}
              showFailureError={true} />
          </div>
        </div>
      }
      {
        tabIndex == 1 &&
        <div>
          <div
            className='card'
            style={{
              margin: "0 auto"
            }}>
            <h2 style={{
              margin: "0 0 10px 0",
            }} className='heading-level-4'>OAuth Methods
            </h2>
            <OAuth
              style={{ margin: "20px 0" }}
              provider='google'
              buttonText='Sign in with Google'
              success="http://localhost:3001"
              failure="http://localhost:3001"
              client={client} />
            <OAuth
              provider='amazon'
              buttonText='Sign in with Amazon'
              success="http://localhost:3001"
              failure="http://localhost:3001"
              client={client} />
            <OAuth
              style={{ margin: "20px 0" }}
              provider='apple'
              buttonText='Sign in with Apple'
              success="http://localhost:3001"
              failure="http://localhost:3001"
              client={client} />
            <OAuth
              provider='auth0'
              buttonText='Sign in with Amazon'
              success="http://localhost:3001"
              failure="http://localhost:3001"
              client={client} />
          </div></div>
      }
      {
        tabIndex == 2 &&
        <div className='card'
          style={{ margin: "0 auto" }}>
          <MagicAuth
            client={client}
            buttonText='Get Magic Link'
            success={successSiginIn} />
        </div>
      }
      {
        tabIndex == 3 &&
        <div className='card'
          style={{ margin: "0 auto" }}>
          <Phone
            client={client}
            buttonText='Get OTP'
            success={successSiginIn} />
        </div>
      }
      <h4 style={{
        textAlign: "center",
        margin: "20px 0 40px 0",
        fontWeight: "normal"
      }}>Made with ❤️ by Sahil Saha</h4>
    </div >
  )
}

export default App

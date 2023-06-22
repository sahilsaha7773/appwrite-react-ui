import { Account } from 'appwrite';
import React, { useState } from 'react'
import styles from './styles/style.module.css';
import globalStyles from '../styles/global.module.css';

function EmailPassSignIn(
  {
    client,
    success,
    failure,
    buttonText,
    buttonStyle,
    inputStyle,
    showFailureError,
    validations,
  }: {
    client: any,
    success: (resp: any) => any,
    failure: (resp: any) => any,
    buttonText?: string,
    buttonStyle?: Object,
    inputStyle?: Object,
    showFailureError?: boolean,
    validations?: {
      email?: boolean,
      password?: boolean
    }
  }
) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passHidden, setPassHidden] = useState(true);
  const [error, setError] = useState("");
  const [failureError, setFailureError] = useState("");
  const [isLoading, setIsLoading] = useState(false);



  const handleSubmit = async () => {
    if (validations === undefined) validations = {
      email: true,
      password: true
    };
    if (validations != undefined && validations?.email === undefined) validations.email = true;
    if (validations != undefined && validations?.password === undefined) validations.password = true;

    if (showFailureError === undefined) showFailureError = false;
    
    if (email === "") {
      if (validations?.email) {
        setError("Email is required");
        return;
      }
    }
    if (password === "") {
      if (validations?.password) {
        setError("Password is required");
        return;
      }
    }
    setError("");
    setIsLoading(true);
    const account = new Account(client);
    try {
      var resp = await account.createEmailSession(email, password);
      success(resp);
    } catch (err: any) {
      if (showFailureError) {
        setFailureError(err.message);
      }
      failure(err);
    }
    setIsLoading(false);
  }
  return (
    <div>
      {showFailureError && failureError !== "" &&
        <div className={styles.failureError}>
          <span className={styles.closeIcon} onClick={() => {
            setFailureError("");
          }}>&times;</span>
          {failureError}
        </div>
      }
      <form>
        <input
          className={globalStyles.formInput}
          type="email"
          placeholder="Email"
          value={email}
          style={inputStyle}
          onChange={(e) => setEmail(e.target.value)} />
        <div
          className={styles.passwordInput}
        >
          <input
            className={globalStyles.formInput}
            type={
              passHidden ? "password" : "text"
            } placeholder="Password"
            value={password}
            style={inputStyle}
            onChange={(e) => setPassword(e.target.value)} />
          <i className={passHidden ? "icon-eye" : "icon-eye-off"} onClick={(e) => {
            setPassHidden(!passHidden);
          }} />
        </div>
        {error !== "" && <p className={styles.error}><i className='icon-exclamation' /> {error}</p>}
        <button
          onClick={async (e) => {
            e.preventDefault();
            await handleSubmit();
          }}
          className={globalStyles.formButton}
          style={buttonStyle}
          disabled={isLoading}
        >{isLoading ? "Loading..." : buttonText ?? "Sign in"}</button>
      </form>
    </div>

  )
}

export default EmailPassSignIn
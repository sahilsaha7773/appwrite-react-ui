import { Account, Client } from 'appwrite';
import React from 'react'
import styles from './styles/style.module.css';
function OAuth(
  {
    client,
    provider,
    success,
    failure,
    buttonStyle,
    buttonText,
    style,
  }
    :
    {
      client: any,
      provider: string,
      success: string,
      failure: string,
      buttonStyle?: object,
      buttonText: string,
      style?: object,
    }) {
  const handleLogin = async () => {
    const account = new Account(client);
    try {
      var resp = account.createOAuth2Session(provider, success, failure);
      // success(resp);
    } catch (err) {
      console.log("User sign in failed");
      // failure(err);
    }
  }
  return (
    <div style={style}>
      <button
        style={buttonStyle}
        className={styles.oauthButton}
        onClick={() => {
          handleLogin();
        }}>
        <i className={`icon-${provider}`} /> {buttonText}
      </button>
    </div>

  )
}

export default OAuth;
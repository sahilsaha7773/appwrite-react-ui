import { Account, ID } from 'appwrite';
import React, { useState } from 'react'
import globalStyles from '../styles/global.module.css';

function MagicAuth(
  {
    client,
    url,
    buttonText,
    success,
    userIdRequired,
    buttonStyle,
    inputStyle,
    validations
  }:
    {
      client: any,
      url?: string,
      buttonText: string,
      success: (resp: object) => any,
      userIdRequired?: boolean,
      buttonStyle?: Object,
      inputStyle?: Object,
      validations?: {
        email?: boolean,
        userId?: boolean
      }
    }
) {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");

  if (userIdRequired === undefined) userIdRequired = false;
  if (validations === undefined) validations = {
    email: true,
    userId: true
  };
  if (validations != undefined && validations?.email === undefined) validations.email = true;
  if (validations != undefined && validations?.userId === undefined) validations.userId = true;

  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (userIdRequired && validations?.userId && userId === "") {
      setError("User ID is required");
      return;
    }
    if (validations?.email && email === "") {
      setError("Email is required");
      return;
    }
    setError("");
    const account = new Account(client);

    try {
      var resp = await account.createMagicURLSession(
        userIdRequired ? userId : ID.unique(),
        email,
        url
      );
      success(resp);
    } catch (err) {

      console.log("User sign in failed");
      console.log(err);
    }
  }
  return (
    <div>
      <form>
        {userIdRequired &&
          <input
            type="text"
            style={inputStyle}
            placeholder="User ID"
            className={globalStyles.formInput}
            value={userId}
            onChange={(e) => setUserId(e.target.value)} />
        }
        <input
          type="email"
          style={inputStyle}

          placeholder="Email"
          className={globalStyles.formInput}
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        {error !== "" && <p className={globalStyles.error}><i className='icon-exclamation' /> {error}</p>}
        <button
          style={buttonStyle}
          className={globalStyles.formButton}
          onClick={(e) => {
            e.preventDefault();
            handleLogin();
          }}>
          {buttonText}
        </button>
      </form>
    </div>
  )
}

export default MagicAuth
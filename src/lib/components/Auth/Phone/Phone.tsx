import React, { useState } from 'react'
import globalStyles from '../styles/global.module.css';
import { Account, ID } from 'appwrite';

function Phone(
  {
    client,
    success,
    buttonText,
    userIdRequired,
    validations,
    buttonStyle,
    inputStyle,
  }:
    {
      client: any,
      success: (resp: object) => any,
      buttonText: string,
      userIdRequired?: boolean,
      validations?: {
        userId?: boolean
        phoneNumber?: boolean
      },
      buttonStyle?: Object,
      inputStyle?: Object,
    }
) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  if (userIdRequired === undefined) userIdRequired = false;
  if (validations === undefined) validations = {
    userId: true,
    phoneNumber: true
  };
  if (validations != undefined && validations?.userId === undefined) validations.userId = true;
  if (validations != undefined && validations?.phoneNumber === undefined) validations.phoneNumber = true;

  const handleLogin = async () => {
    if (userIdRequired && validations?.userId && userId === "") {
      setError("User ID is required");
      return;
    }
    if (validations?.phoneNumber && phoneNumber === "") {
      setError("Phone number is required");
      return;
    }
    setError("");
    const account = new Account(client);

    try {
      var resp = await account.createPhoneSession(
        userIdRequired ? userId : ID.unique(),
        phoneNumber
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
        {
          userIdRequired &&
          <input
            type="text"
            className={globalStyles.formInput}
            placeholder="User ID"
            value={userId}
            style={inputStyle}
            onChange={(e) => setUserId(e.target.value)}
          />
        }
        <input
          type="number"
          className={globalStyles.formInput}
          placeholder="Phone"
          value={phoneNumber}
          style={inputStyle}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        {error !== "" && <p className={globalStyles.error}><i className='icon-exclamation' /> {error}</p>}
        <button
          style={buttonStyle}
          className={globalStyles.formButton}
          onClick={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >{buttonText}
        </button>
      </form>
    </div>
  )
}

export default Phone
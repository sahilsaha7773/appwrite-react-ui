import { useState } from 'react'
import { Account, ID } from 'appwrite';
import styles from './styles/style.module.css';
import globalStyles from '../styles/global.module.css';

function EmailPassCreate({
  client,
  success,
  failure,
  nameRequired,
  buttonText,
  buttonStyle,
  inputStyle,
  userIdRequired,
  showFailureError,
  validations,
}: {
  client: any,
  success: (resp: any) => any,
  failure: (resp: any) => any,
  nameRequired?: boolean,
  buttonText?: string,
  buttonStyle?: Object,
  inputStyle?: Object,
  userIdRequired?: boolean,
  showFailureError?: boolean,
  validations?: {
    name?: boolean,
    userId?: boolean,
    email?: boolean,
    password?: boolean
  }
}) {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passHidden, setPassHidden] = useState(true);
  const [error, setError] = useState("");
  const [failureError, setFailureError] = useState("");

  if (userIdRequired === undefined) userIdRequired = false;
  if (nameRequired === undefined) nameRequired = false;
  if (showFailureError === undefined) showFailureError = false;
  if (validations === undefined) validations = {
    name: true,
    userId: true,
    email: true,
    password: true
  };
  if (validations != undefined && validations?.name === undefined) validations.name = true;
  if (validations != undefined && validations?.userId === undefined) validations.userId = true;
  if (validations != undefined && validations?.email === undefined) validations.email = true;
  if (validations != undefined && validations?.password === undefined) validations.password = true;

  const handleSubmit = async () => {
    if (nameRequired && name === "") {
      if (validations?.name)
        setError("Name is required");
      return;
    }
    if (userIdRequired && userId === "") {
      if (validations?.userId)
        setError("User ID is required");
      return;
    }
    if (email === "") {
      if (validations?.email)
        setError("Email is required");
      return;
    }
    if (password === "") {
      if (validations?.password)
        setError("Password is required");
      return;
    }
    const account = new Account(client);
    try {
      var resp = await account.create(
        userIdRequired ? userId : ID.unique(),
        email, password, name);
      console.log(resp);
      if (resp.status) {
        success(resp);
      }
      else {
        failure(resp);
      }
    } catch (err: any) {
      console.log("User creation failed");
      if (showFailureError)
        setFailureError(err.message);
      failure(err);
    }
  }
  return (
    <div>
      {
        showFailureError && failureError !== "" &&
        <div className={styles.failureError}>
          <span className={styles.closeIcon} onClick={() => {
            setFailureError("");
          }}>&times;</span>
          {failureError}
        </div>
      }
      <form>
        {nameRequired && <input type="text" placeholder="Name" style={inputStyle} className={globalStyles.formInput} value={name} onChange={(e) => setName(e.target.value)} />}
        {userIdRequired && <input type="text" style={inputStyle} placeholder="User ID" className={globalStyles.formInput} value={userId} onChange={(e) => setUserId(e.target.value)} />}
        <input style={inputStyle} type="email" placeholder="Email" className={globalStyles.formInput} value={email} onChange={(e) => setEmail(e.target.value)} />
        <div className={styles.passwordInput}>
          <input
            style={inputStyle}
            type={
              passHidden ? "password" : "text"
            } placeholder="Password"
            className={globalStyles.formInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
          <i className={passHidden ? "icon-eye" : "icon-eye-off"} onClick={(e) => {
            setPassHidden(!passHidden);
          }} />
        </div>
        {error !== "" && <p className={styles.error}><i className='icon-exclamation' /> {error}</p>}
        <button
          style={buttonStyle}
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }} className={globalStyles.formButton}>{buttonText ?? "Sign up"}</button>
      </form>
    </div>
  )
}

export default EmailPassCreate;
<div align="center">
<img src="./src/assets/images/built-with-appwrite.svg" width=150px>
<h1>Appwrite UI Web</h1>
</div>
Appwrite UI Web is an open-source JavaScript library for Web that provides simple, customizable UI bindings on top of Appwrite web SDKs to eliminate boilerplate code and promote best practices.
<br/><br/>
It provides UI Components for signing in or signing up users with email addresses and passwords, phone numbers, Identity Provider Sign In including Google, Facebook, GitHub, Amazon etc. It is built on top of <a href="https://www.npmjs.com/package/appwrite">appwrite web SDK</a>.

<br/>

# Table of Contents
- Demo
- Installation
- Usage Instructions
  - Email Password Sign Up
  - Email Password Sign In
  - OAuth
  - MagicAuth
  - Phone

# Demo
https://user-images.githubusercontent.com/35343652/231851341-706fd0b6-20c6-495c-af37-50a549496b65.mov

# Installation
```
This project is not yet published on npm.
```
[Official appwrite docs](https://appwrite.io/docs) to install appwrite locally.

## Steps to setup locally
Make sure you have node js installed on your machine.
1. Clone the repo.
2. Inside the `addons` folder run `npm install` to install the required dependencies.
3. To check out the demo run `npm start`.
4. You can find all the components inside the `/src/lib/components/Auth` folder.

# Usage **Instructions**
## Email Password Sign Up
```jsx
  <EmailPassCreate/>
```
|        Name        |     
      Type           | Required                                                     | Description                                                               |
| :----------------: | :----------------------: | :----------------------------------------------------------- | :------------------------------------------------------------------------ |
|      `client`      | `Appwrite Client Object` | `true`                                                       | The Appwrite client instance configured with your endpoint and project id |
|     `success`      |        `function`        | `true`                                                       | Callback function to be called on successful login                        |
|     `failure`      |        `function`        | `true`                                                       | Callback function to be called on failed login                            |
|    `buttonText`    |         `string`         | `false (default: 'Sign Up')`                                 | The text to be displayed on the button                                    |
|   `nameRequired`   |        `boolean`         | `false (default: false)`                                     | Set to true if you want the name input field in the sign up form          |
|  `userIdRequired`  |        `boolean`         | `false (default: false)`                                     | Set to true if you want the user id input field in the sign up form       |
| `showFailureError` |        `boolean`         | `false (default: false)`                                     | Set to true if you want to show the error message UI on failure           |
|   `validations`    |         `object`         | `false (default: {name: true, email: true, password: true})` | Set the validation rules for the input fields                             |
|   `buttonStyle`    |         `object`         | `false`                                                      | Set custom style for the button                                           |
|    `inputStyle`    |         `object`         | `false`                                                      | Set custom style for the input fields                                     |
## Email Password Sign In
```jsx
  <EmailPassSignIn/>
```
|        Name        |           Type           | Required                                         | Description                                                               |
| :----------------: | :----------------------: | :----------------------------------------------- | :------------------------------------------------------------------------ |
|      `client`      | `Appwrite Client Object` | `true`                                           | The Appwrite client instance configured with your endpoint and project id |
|     `success`      |        `function`        | `true`                                           | Callback function to be called on successful login                        |
|     `failure`      |        `function`        | `true`                                           | Callback function to be called on failed login                            |
|    `buttonText`    |         `string`         | `false (default: 'Sign In')`                     | The text to be displayed on the button                                    |
| `showFailureError` |        `boolean`         | `false (default: false)`                         | Set to true if you want to show the error message UI on failure           |
|   `validations`    |         `object`         | `false (default: {email: true, password: true})` | Set the validation rules for the input fields                             |
|   `buttonStyle`    |         `object`         | `false`                                          | Set custom style for the button                                           |
|    `inputStyle`    |         `object`         | `false`                                          | Set custom style for the input fields                                     |

## OAuth
Make sure you have the OAuth provider setup as required.
```jsx
  <OAuth/>
```
|     Name      |           Type           | Required                                     | Description                                                               |
| :-----------: | :----------------------: | :------------------------------------------- | :------------------------------------------------------------------------ |
|   `client`    | `Appwrite Client Object` | `true`                                       | The Appwrite client instance configured with your endpoint and project id |
|  `provider`   |         `string`         | `true`                                       | The OAuth provider name                                                   |
|   `success`   |        `function`        | `true`                                       | Callback function to be called on successful login                        |
|   `failure`   |        `function`        | `true`                                       | Callback function to be called on failed login                            |
| `buttonText`  |         `string`         | `false (default: 'Sign In with {provider}')` | The text to be displayed on the button                                    |
| `buttonStyle` |         `object`         | `false`                                      | Set custom style for the button                                           |

## MagicAuth
In order for emails to work, you will need to setup proper SMTP configuration. Check out the official [appwrite docs](https://appwrite.io/docs/email-delivery).
```jsx
  <MagicAuth/>
```
|       Name       |           Type           | Required                                       | Description                                                               |
| :--------------: | :----------------------: | :--------------------------------------------- | :------------------------------------------------------------------------ |
|     `client`     | `Appwrite Client Object` | `true`                                         | The Appwrite client instance configured with your endpoint and project id |
|      `url`       |         `string`         | `true`                                         | The URL to which the user will be redirected after successful login       |
|    `success`     |        `function`        | `true`                                         | Callback function to be called on successful login                        |
| `userIdRequired` |        `boolean`         | `false (default: false)`                       | Set to true if you want the user id input field in the sign up form       |
|   `buttonText`   |         `string`         | `false (default: 'Sign In with Magic Link')`   | The text to be displayed on the button                                    |
|  `buttonStyle`   |         `object`         | `false`                                        | Set custom style for the button                                           |
|   `inputStyle`   |         `object`         | `false`                                        | Set custom style for the input fields                                     |
|  `validations`   |         `object`         | `false (default: {userId: true, email: true})` | Set the validation rules for the input fields                             |

## Phone
Appwrite requires an SMS provider to be setup before using Phone authentication. Check out the official [appwrite docs](https://appwrite.io/docs/sms-delivery).
```jsx
  <Phone/>
```
|       Name       |           Type           | Required                                       | Description                                                               |
| :--------------: | :----------------------: | :--------------------------------------------- | :------------------------------------------------------------------------ |
|     `client`     | `Appwrite Client Object` | `true`                                         | The Appwrite client instance configured with your endpoint and project id |
| `success`        |        `function`        | `true`                                         | Callback function to be called on successful login                        |
| `buttonText`     |         `string`         | `false (default: 'Sign In with Phone')`        | The text to be displayed on the button                                    |
| `buttonStyle`    |         `object`         | `false`                                        | Set custom style for the button                                           |
| `inputStyle`     |         `object`         | `false`                                        | Set custom style for the input fields                                     |
| `validations`    |         `object`         | `false (default: {userId: true, phoneNumber: true})`               | Set the validation rules for the input fields                             |

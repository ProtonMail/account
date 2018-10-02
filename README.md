# account [![CircleCI](https://circleci.com/gh/ProtonMail/account.svg?style=svg)](https://circleci.com/gh/ProtonMail/account)


## Install

- `$ npm i`

> You need node > 8 and npm >= 5

## Dev

- `npm run dev`

> You must have the lib **frontend-commons**. As it's not available yet, install it via npm link ;)

> You must also set up the file `src/config.js`. 
### U2F

First add in `src/config.js` the `u2f` object, with value. This value should also be compatible with the server side: 
```json
{
    "appId": "the route to the app id",
    "timeout": 1 // timeout value
}
```

#### Testing

Testing U2F can be complicated: the server must accept a U2F binding on the localhost domain. 
For that, the domain  must use the app id https://localhost.

In order to test U2F without having a physical device, the chrome extension 
[virtual-u2f](https://github.com/ProtonMail/virtual-u2f) can be used. This 
extension is only suitable for testing purposes. It is not possible to combine 
this extension with regular U2F token. 

Mac users can also try the [SoftU2F](https://github.com/github/SoftU2F) project (maintained by github, more secure than virtual-u2f). 
Linux users can try the equivalent [Rust U2F](https://github.com/danstiner/rust-u2f) project (unstable).  

#### App ID

The app id specification are [very strict](https://fidoalliance.org/specs/fido-u2f-v1.2-ps-20170411/fido-appid-and-facets-v1.2-ps-20170411.html#the-appid-and-facetid-assertions). Some rules are: 

* The AppID must be served under HTTPS;
* The AppID can be an URL (eg https://account.proton.me) or a path to a json file (eg https://account.proton.me/app-id.json, with the **MIME Content-Type of `application/fido.trusted-apps+json`**);
* An application using the AppID can be under the AppID domain, but the opposite if not possible: 
  
  If the AppId is https://account.proton.me/app-id.json: 
  * a service under https://account.proton.me will be able to use the AppID
  * a service under https://service.account.proton.me will be able to use the AppID
  * a service under https://pay.proton.me will be **not** able to use the AppID

*Deleting the AppID or moving it to another route will  deactivate every registered key*. It is possible to use a 3XX redirection (see 9. from the doc for more info). 
 

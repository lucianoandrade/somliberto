import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

import iconFacebook from "../../../assets/img/facebook.svg";
import iconGoogle from "../../../assets/img/google_plus.svg";

import './socialLogin.scss'


class SocialLogin extends Component {
  render() {
    return (
      <div className="social-medias-icons">
          <img
            className="facebook-icon"
            src={iconFacebook}
            onClick={() => Auth.federatedSignIn({provider: 'Facebook'})}
            alt="Icone Facebook"
          ></img>
          <img
             onClick={() => Auth.federatedSignIn({provider: 'Google'})}
            className="google-icon"
            src={iconGoogle}
            alt="Icone Google"
          ></img>
      </div>
    )
  }
}

export default SocialLogin;

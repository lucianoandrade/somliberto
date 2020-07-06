import React from "react";
import { Link } from "react-router-dom";

import PoliticaPrivacidade from "./politica";
import Terms from "../Terms/Terms";

import logoSomLivre from '../../../assets/img/logo-som-livre.png';
import logoFacebook from '../../../assets/img/facebook.png';
import logoInstagram from '../../../assets/img/instagram.png';
import logoTwitter from '../../../assets/img/twitter.png';
import logoYoutube from '../../../assets/img/youtube.png';

import './footer.scss';

const Footer = props => {
  const { terms_of_use, privacy_policy, facebook, instagram, twitter,
    youtube } = props;

  return (
    <footer>
      <div id="footer">
        <section className="linksFooter">
          <Link to="/quemsomos" title="Quem somos">Quem somos</Link>
          <Link to="#" title="Termos de Uso"><Terms terms={terms_of_use}/></Link>
          <Link to="#" title="Políticas de Privacidade"><PoliticaPrivacidade privacyPolicy={privacy_policy}/></Link>
        </section>
        <div className="logoWrapper">
          <img src={logoSomLivre} alt="Som Livre" />
        </div>
        <section className="iconesSociais">
          {facebook &&
            <a href={facebook} target="_blank" rel="noopener noreferrer">
              <img src={logoFacebook} alt="Logo Facebook"/>
            </a>
          }
          {instagram &&
            <a href={instagram} target="_blank" rel="noopener noreferrer">
              <img src={logoInstagram} alt="Logo Instagram"/>
            </a>
          }
          {twitter &&
            <a href={twitter} target="_blank" rel="noopener noreferrer">
              <img src={logoTwitter} alt="Logo Twitter"/>
            </a>
          }
          {youtube &&
            <a href={youtube} target="_blank" rel="noopener noreferrer">
              <img src={logoYoutube} alt="Logo Youtube"/>
            </a>
          }
        </section>
      </div>
      <div className="copyright">
        <p>Som Livre © 2020 Todos os direitos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;

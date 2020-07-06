import React from "react";
// import { API } from "aws-amplify";
// import config from "../../../../config/constants";

import './parceiros.scss';

const Parceiros = props => {

  const partners = props.partners

  return (
     <section className="boxParceiros">
        <h4 className="titleParceiros">Nossos Parceiros</h4>
         <div className="logoParceiros">
          {partners &&
            partners.map((partner, index) => <img key={index} src={partner.image_url} alt={partner.name} />)
            }
         </div>
     </section>
  );
};


export default Parceiros;

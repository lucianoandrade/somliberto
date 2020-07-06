import React from "react";
import Chamada from './chamada';
import Parceiros from './parceiros';
import CroppedImage from '../../elements/RenderCroppedImage/CroppedImage'
import Botao from "../..//elements/Botao/Botao";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import './show.scss';

const Show = props => {

  const {partners, current_event, header_image} = props
  const havePrice = true;
  const imageSrc = current_event ? current_event.images_dict.cover_home.url : ""
  const user = useSelector(state => state.user.data);

   return (
      <section id="ShowDestaque">
        <div className={`showWrapper ${partners.length > 0 ? "": "no-partners"}`}>

             <picture className={`imgDestaque ${partners.length > 0 ? "": "no-partners"}`}>

              {  current_event && imageSrc &&
                <>
                <CroppedImage
                    imageSrc={imageSrc}
                    cropping={current_event.images_dict.cover_home.cropping}
                    containerHeight={600}
                    classes="imgBg"
                    mobile={{
                      imageSrc: current_event.images_dict.cover_home.mobile_url,
                      cropping: current_event.images_dict.cover_home.mobile_cropping,
                      containerHeight: 470,
                    }}
                  />
                </>
              }
              { !current_event && header_image &&
                <>
                  <CroppedImage
                      imageSrc={header_image.image_url}
                      cropping={header_image.image_cropping}
                      containerHeight={600}
                      classes="imgBg"
                      mobile={{
                        imageSrc: header_image.image_mb_url,
                        cropping: header_image.image_mb_cropping,
                        containerHeight: 470,
                      }}
                    />

                  <div className="call-to-action">
                    <div className="call-to-action-text">
                        {header_image.text}
                    </div>
                    {!user.entity_id &&
                    <Botao classes="red big">
                      <Link to="/cadastro">
                        {header_image.button_label}
                      </Link>
                  </Botao>
                  }
                  </div>
                </>
              }
           </picture>
           <Chamada havePrice={havePrice} currentEvent={current_event}/>
        </div>
        {partners.length > 0 &&
          <Parceiros partners={partners} />
         }
      </section>
   );
};

export default Show;

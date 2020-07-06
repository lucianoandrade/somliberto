import React from "react";
import { useSelector } from "react-redux";
import PageContainer from "../../components/features/PageContainer/PageContainer";
import destaque from "../../assets/img/view-of-a-concert.png";
import desktop from "../../assets/img/somlivre-desktop.png";
import smartphone from "../../assets/img/somlivre-smartphone.png";
import tablet from "../../assets/img/somlivre-tablet.png";

import "./AboutUs.scss";

export default function (props) {
  const siteInfo = useSelector(store => store.siteInfo.data) || {};
  return (
    <PageContainer>
      <section className="container-aboutUs">
        <picture className="imgDestaque">
          <img src={destaque} alt="Imagem de Show" />
        </picture>

        <div className="container-content">
          <h2>{siteInfo.about_us_title && `${siteInfo.about_us_title}`}</h2>
          <p>{siteInfo.about_us_subtitle && `${siteInfo.about_us_subtitle}`}
          </p>

          <div className="content">
            <div className="example">
              <img className="desktop" src={desktop} alt="Exemplo do show no desktop" />
              <img className="tablet" src={tablet} alt="Exemplo do show no tablet" />
              <img className="smartphone" src={smartphone} alt="Exemplo do show no smartphone" />
            </div>
            <div className="description">
              <h3>
                {siteInfo.about_us_highlight_text}
              </h3>
              <div>
                <p  dangerouslySetInnerHTML={{__html:siteInfo.about_us_text}} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};

// export default aboutUs;

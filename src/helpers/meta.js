import React from "react";
import MetaTags from 'react-meta-tags';
import { useLocation } from 'react-router-dom';

const Meta = (props) => {

  const location = useLocation();
  const pageRoute = "/" + location.pathname.split('/')[1]

  const MetasList = {
    "/": () => <MetaTags>
        <title>Aune Live</title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <link rel="canonical" href="" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="" />
        <meta property="og:description" content="" />
        <meta property="og:url" content="" />
        <meta property="og:site_name" content="Aune Live" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content="" />
        <meta name="twitter:title" content="Aune Live" />
      </MetaTags>
  }

  const SelectedMeta = MetasList[pageRoute] || MetasList["default"]
  return (<SelectedMeta />)
}

export default Meta;

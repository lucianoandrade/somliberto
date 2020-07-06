import React from "react";
import { useSelector } from "react-redux";
import PageContainer from "../../components/features/PageContainer/PageContainer";
import Show from "../../components/features/Show/Show";
import "./Home.scss";

const Home = () => {
  const siteInfo = useSelector(store => store.siteInfo.data);

  return (
    <PageContainer auth={"incomplete-registration"}>
      <Show {...siteInfo} />
    </PageContainer>
  );
};

export default Home;
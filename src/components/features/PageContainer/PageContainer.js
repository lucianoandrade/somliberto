import React, {useEffect} from "react";

import { useDispatch, useSelector } from "react-redux";
import { getSiteInfo } from "../../../store/actions/siteinfo.actions";
import Loading from "../../elements/Loading/Loading";
import Header from '../../features/Header/Header';
import Footer from '../../features/Footer/Footer';
import AuthGuard from "./AuthProvider";

const PageContainer = props => {
  const loading = useSelector(store => store.siteInfo.loading);
  const siteInfo = useSelector(store => store.siteInfo.data);
  const dispatch = useDispatch();
  const { auth } = props;


  useEffect(() => {
    if(!siteInfo){
      dispatch(getSiteInfo());
    }
    // eslint-disable-next-line
  },[]);

  return (
    <>
    <AuthGuard type={auth}>
      <Header/>
        {loading ? (
          <div className="loadingContainer loadingContainerHome">
            <Loading />
          </div>
        ):(
          <>{props.children}</>
        )}
      <Footer {...siteInfo}/>
      </AuthGuard>
    </>
  )
}

export default PageContainer;

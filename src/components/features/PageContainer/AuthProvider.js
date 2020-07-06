import React, { useEffect, useState } from "react"
import { Hub } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";

import Service from "../../../service/user/user.service";
import { getUserData, setUserPicture } from "../../../store/actions/user.action";
import { useHistory } from "react-router-dom";
import Loading from "../../elements/Loading/Loading";
import { getSocialUserPicture } from '../../../hooks/getSocialUserPicture'

const AuthGuard = (props) => {
  const [loading, setLoading] = useState(true)
  const user = useSelector(store => store.user.data || {});
  const getUserError = useSelector(store => store.user.error);
  const dispatch = useDispatch();
  const history = useHistory();


  async function getAuthUser(){
    try{
      let response = await Service.getAuthUser()
      let userPicture = getSocialUserPicture(response)
      if (userPicture){
        dispatch(setUserPicture(userPicture))
      }
      dispatch(getUserData(response.sub));
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  }
  useEffect(() =>{
    console.log("error", getUserError);
    if (getUserError){
      history.push("/seusdados");
    }
  },[getUserError, dispatch, history])

  useEffect(() => {

    Hub.listen('auth', (data) => {
      console.log('Data', data);
      switch (data.payload.event) {
          case 'signIn':
            console.log("signIn", user.email);
            if (!user.email){
              getAuthUser();
            }
            break;
          case 'signIn_failure':
              console.log("error signIn", data);
              //dispatch(setUserData(false))
              break;
          default:
              break;
      }
    });

    if (!user.email){
      getAuthUser()
    }
    setLoading(false)

    // eslint-disable-next-line
  }, []);



  return(
    <>
      {loading ? (
        <div className="loadingContainer">
          <Loading />
        </div>
      ):(
        <>{props.children}</>
      )}
    </>
  )
}

export default AuthGuard;

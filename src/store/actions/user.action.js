import Service from '../../service/user/user.service'

export const TYPES = {
  REQUEST_USER_DATA: "REQUEST_USER_DATA",
  SUCCESS_USER_DATA: "SUCCESS_USER_DATA",
  ERROR_USER_DATA: "ERROR_USER_DATA",
  REMOVE_USER: "REMOVE_USER",
  SET_USER_DATA: "SET_USER",
  SET_USER_PICTURE: "SET_USER_PICTURE"
};

const getUserData = (user_id) => async dispatch => {
  dispatch({ type: TYPES.REQUEST_USER_DATA });

  try {
    const response = await Service.getUserData(user_id);
    dispatch({ type: TYPES.SUCCESS_USER_DATA, payload: response });
    if (response.image_url){
      dispatch({ type: TYPES.SET_USER_PICTURE, payload: response.image_url });
    }
  } catch (error) {
    dispatch({ type: TYPES.ERROR_USER_DATA, payload: error });
  }
};


const removeUserData = () => (dispatch) => {
    dispatch({type: TYPES.REMOVE_USER})
}

const setUserData = (payload) => (dispatch) => {
    dispatch({type: TYPES.SET_USER_DATA, payload: payload})
}

const setUserPicture = (payload) => (dispatch) => {
    dispatch({type: TYPES.SET_USER_PICTURE, payload: payload})
}

export { getUserData, removeUserData, setUserData, setUserPicture };

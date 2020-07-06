import { TYPES } from "../actions/user.action";


const initialState = {
    data: {},
    picture: null,
    error: false,
    loading: false
}

const user = (state = initialState, action) => {
    switch (action.type){
      case TYPES.REQUEST_USER_DATA:
        return {
          ...state,
          error: false,
          loading: true
        };
      case TYPES.SUCCESS_USER_DATA:
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: false
        };
      case TYPES.SET_USER_PICTURE:
        return {
          ...state,
          picture: action.payload,
          loading: false,
          error: false
        };
      case TYPES.SET_USER_DATA:
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: false
        };
      case TYPES.ERROR_USER_DATA:
        return {
          ...state,
          error: action.payload,
          loading: false
        };
      case TYPES.REMOVE_USER:
        return {
            ...state,
            error: false,
            data: {},
            loading: false
        };
      default:
        return state;
    }
}


export default user;

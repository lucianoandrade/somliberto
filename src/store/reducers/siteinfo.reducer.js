import { TYPES } from "../actions/siteinfo.actions";

const initialState = {
  data: null,
  current_event: null,
  loading: false,
  error: {}
};

const siteInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.REQUEST_SITEINFO:
      return {
        ...state,
        error: {},
        loading: true
      };
    case TYPES.SUCCESS_SITEINFO:
      return {
        ...state,
        data: action.payload,
        current_event: action.payload.current_event,
        loading: false,
        error: {}
      };
    case TYPES.ERROR_SITEINFO:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default siteInfoReducer;

import Service from "../../service/siteinfo/siteinfo.service";

export const TYPES = {
  REQUEST_SITEINFO: "REQUEST_SITEINFO",
  SUCCESS_SITEINFO: "SUCCESS_SITEINFO",
  ERROR_SITEINFO: "ERROR_SITEINFO"
};

const getSiteInfo = () => async dispatch => {
  dispatch({ type: TYPES.REQUEST_SITEINFO });

  try {
    const response = await Service.getSiteInfo();
    dispatch({ type: TYPES.SUCCESS_SITEINFO, payload: response });
  } catch (error) {
    dispatch({ type: TYPES.ERROR_SITEINFO, payload: error });
  }
};

export { getSiteInfo };

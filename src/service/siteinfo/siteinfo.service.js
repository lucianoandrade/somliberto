import { API } from "aws-amplify";
import config from "../../config/constants";

const getSiteInfo = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await API.get(
        config.APIS.SOMLIVRE_PUBLIC,
        `site-info`,
        {}
      );
      resolve(response.data);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};


export default {
  getSiteInfo
};

import { API } from "aws-amplify";
import { Auth } from "aws-amplify";

import config from "../../config/constants";

const getUserData = (user_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await API.get(
        config.APIS.SOMLIVRE,
        `usuario/${user_id}`,
        {}
      );
      resolve(response.data);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const getAuthUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Auth.currentAuthenticatedUser()
      console.log("get_authenticated_user, response:", response);
      resolve(response.attributes)
    } catch (error) {
      reject(error)
    }
  })
}

const getUrlImage = () => {
  return API.get(config.APIS.SOMLIVRE, "usuario/upload-image");
};


export default {
  getUserData,
  getAuthUser,
  getUrlImage
};

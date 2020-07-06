import { API } from "aws-amplify";
import config from "../../config/constants";

const getIsLiveFinished = (entity_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await API.get(
        config.APIS.SOMLIVRE_PUBLIC,
        `evento/is-live-finished/${entity_id}`,
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
  getIsLiveFinished
};

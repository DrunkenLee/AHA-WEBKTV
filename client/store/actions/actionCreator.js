import axios from "axios";

const baseURL = "http://localhost:3000";

//
export const toogleTheme = () => {
  return {
    type: "toggle",
  };
};

export const setSongsData = (payload) => {
  return {
    type: "fetch/success",
    payload,
  };
};

export const setTheme = () => {
  return async (dispatch, getState) => {
    try {
      const action = toogleTheme();
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getSongs = (limit, offset) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios({
        method: "get",
        url: `${baseURL}?limit=${limit}&offset=${offset}`,
      });
      const action = setSongsData(data.rows);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

const baseURL = "https://server-201.mikef.my.id";
//
export const toogleTheme = () => {
  return {
    type: "toggle",
  };
};

export const setTheme = () => {
  return async (dispatch, getState) => {
    try {
      console.log("masuk setTheme");
      const action = toogleTheme();
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

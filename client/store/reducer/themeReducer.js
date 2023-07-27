const initalState = {
  themeState: false,
};

function themeReducer(state = initalState, action) {
  switch (action.type) {
    case "toggle":
      return {
        themeState: state.themeState ? false : true,
      };
    default:
      return state;
  }
}

export default themeReducer;

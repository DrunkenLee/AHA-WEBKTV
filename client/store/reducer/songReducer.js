const initalState = {
  data: [],
};

function songReducer(state = initalState, action) {
  switch (action.type) {
    case "fetch/success":
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}

export default songReducer;

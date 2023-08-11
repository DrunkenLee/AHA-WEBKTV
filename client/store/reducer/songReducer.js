const initalState = {
  data: [],
  count: 0,
};

function songReducer(state = initalState, action) {
  switch (action.type) {
    case "fetch/success":
      return {
        ...state,
        count: action.payload.count,
        data: action.payload.rows,
      };
    default:
      return state;
  }
}

export default songReducer;

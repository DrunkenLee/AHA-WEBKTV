import { combineReducers } from "redux";

// reducers
import themeReducer from "./themeReducer";

// reducers

const rootReducer = combineReducers({
  theme: themeReducer,
  //   genres: genreReducer,
});

export default rootReducer;

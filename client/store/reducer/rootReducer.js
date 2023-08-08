import { combineReducers } from "redux";

// reducers
import themeReducer from "./themeReducer";
import songReducer from "./songReducer";

// reducers

const rootReducer = combineReducers({
  theme: themeReducer,
  songs: songReducer,
});

export default rootReducer;

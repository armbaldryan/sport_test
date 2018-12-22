import { combineReducers } from "redux";

import tournaments from "./tournaments";
import savedTournaments from "./savedTournaments"

export default combineReducers({
    tournaments,
    savedTournaments
});
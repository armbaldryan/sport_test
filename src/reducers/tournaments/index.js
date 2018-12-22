import { createGetTournamentActionCreator } from "../../actions/helpers";
import { createTournamentsReducer } from "../helpers";
import { TOURNAMENTS } from "../constants";

export const fetchTournamentsBySearch = argument => createGetTournamentActionCreator({
    suffix: TOURNAMENTS,
    argument,
})();

export default createTournamentsReducer(TOURNAMENTS);
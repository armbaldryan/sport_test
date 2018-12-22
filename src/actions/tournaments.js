import { SAVED_TOURNAMENTS } from "../reducers/constants";

export const onAddTournament = (dispatch, tournament) => {
    dispatch({
        type: `ADD_${SAVED_TOURNAMENTS}`,
        payload: tournament,
    });
};
export const onDeleteTournament = (dispatch, tournament) => {
    dispatch({
        type: `DELETE_${SAVED_TOURNAMENTS}`,
        payload: tournament,
    });
};

import {
    fetchDataSuccess,
    fetchDataFailure,
    fetchDataInProgress
} from '../../actions' ;

export function createGetTournamentActionCreator({
  suffix,
  argument
}) {
    return () => (dispatch) => {
        const apiCall = `https://api-search.staging.win.gg/search?q=${argument}&index=tournament`;
        return fetch(apiCall)
            .then(res => {
                dispatch(fetchDataInProgress(suffix));
                return res.json();
            })
            .then((data) => {
                dispatch(fetchDataSuccess(data, suffix));
                return data;
            })
            .catch((error) => {
                dispatch(fetchDataFailure(error, suffix))
            });
    };
}
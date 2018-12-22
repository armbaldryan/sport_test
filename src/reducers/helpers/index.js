import {
    beginPrefix,
    receivePrefix,
    addPrefix,
    deletePrefix,
    failPrefix
} from '../constants';

const initialState = window.localStorage.getItem('tournaments')
    ? {
        status: 2,
        payload: JSON.parse(window.localStorage.getItem('tournaments')),
    }
    : {
        status: 0,
        payload: [],
    };

export function createTournamentsReducer(
    suffix
){
    return (
        state = {
            status: 0,
            payload: [],
        },
        action
    ) => {
        switch (action.type) {
            case (beginPrefix + suffix):
                return {
                    ...state,
                    status: 1,
                };
            case (receivePrefix + suffix):
                return {
                    ...state,
                    payload: action.payload,
                    status: 2,
                };
            case (failPrefix + suffix):
                return {
                    ...state,
                    status: 3,
                    error: action.error,
                };
            default:
                return state;
        }
    };
}

export function createSavedTournamentsReducer(
    suffix
){
    return (
        state = initialState,
        action
    ) => {
        switch (action.type) {
            case (addPrefix + suffix):
                return {
                    payload: state.payload.length
                        ? !state.payload.find(item => item.id === action.payload.id)
                            ? [ ...state.payload, action.payload ]
                            : state.payload
                        : [ ...state.payload, action.payload ],
                    status: 2,
                };
            case (deletePrefix + suffix):
                return {
                    payload: state.payload.filter(item => item.id !== action.payload.id),
                    status: 2,
                };
            default:
                return state;
        }
    };
}
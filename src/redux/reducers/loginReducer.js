import actionTypes from "../actionTypes/actionTypes"

const initialState = {
    pending: false,
    success: false,
    error: false,
    errorMessage: "",
    user: null

}
export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.loginActions.LOGIN_START:
            return {
                ...state,
                pending: true
            }
        case actionTypes.loginActions.LOGIN_SUCCESS:
            return {
                ...state,
                success: true,
                user: action.payload
            }

        case actionTypes.loginActions.LOGIN_FAIL:
            return {
                ...state,
                error: true,
                errorMessage: action.payload
            }
        case actionTypes.loginActions.LOGOUT:
            localStorage.setItem("token", initialState)
            return initialState

        default:
            return state;
    }

}
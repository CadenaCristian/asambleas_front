import { typesLogin } from "../../types/types";

const initialState = {
    credentials: {},
    check: ''
}

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case typesLogin.USERCREDENTIALS:
            return {
                ...state,
                credentials: action.payload.resp,
                check: action.payload.check
            }
        default:
            return state
    }
}
import * as types from '../constants/types';

const INITIAL_STATE = {
    isAuthenticated: false
}

const AuthReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case types.LOGIN_SUCCESS:
            return {...state, isAuthenticated: true}
        case types.LOGOUT_SUCCESS:
            return {...state, isAuthenticated: false}    
        default:
            return {...state}    
    }
}

export default AuthReducer;
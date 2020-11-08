import * as types from '../constants/types';

export const loginUser = () => ({
    type: types.LOGIN_SUCCESS
});

export const logoutUser = () => ({
    type: types.LOGOUT_SUCCESS
});
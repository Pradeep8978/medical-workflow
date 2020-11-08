import * as types from './../constants/types';

export const submitIssue = (data) => ({
    type: types.SUBMIT_ISSUE,
    payload: data
});

export const reSubmitIssue = (data)  => {
    debugger
    return {
    type: types.RESUBMIT_ISSUE,
    payload: data
}
};

export const changeIssueStatus = (status, id) => ({
    type: types.CHANGE_ISSUE_STATUS,
    payload: status,
    id: id
});
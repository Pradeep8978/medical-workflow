import * as types from "./../constants/types";

const INITIAL_STATE = {
  caseList: [],
};

const caseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SUBMIT_ISSUE:
      return {
        ...state,
        caseList: [...state.caseList, action.payload],
      };

    case types.RESUBMIT_ISSUE:
      return {
        ...state,
        caseList: state.caseList.map((item, i) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case types.CHANGE_ISSUE_STATUS:
      return {
        ...state,
        caseList: state.caseList.map((item, i) =>
          item.id === action.id ? { ...item, status: action.payload } : item
        ),
      };
      default:
          return {...state}
  }
};

export default caseReducer;

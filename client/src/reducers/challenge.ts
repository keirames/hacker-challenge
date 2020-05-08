import * as actions from "../actions/actionTypes";

const challengeReducer = (
  state = { isFetching: false, didInvalidate: false, items: [] },
  action: any
) => {
  switch (action.type) {
    case actions.REQUEST_CHALLENGES:
      return { ...state, isFetching: true, didInvalidate: false };
    case actions.RECEIVE_CHALLENGES:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.payload.challenges,
        lastUpdated: action.receiveAt,
      };
    default:
      return state;
  }
};

export default challengeReducer;

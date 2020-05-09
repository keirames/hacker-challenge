import * as actions from "./actionTypes";

export const requestChallenges = () => {
  return { type: actions.REQUEST_CHALLENGES, payload: {} };
};

export const receiveChallenges = (json: [string]) => {
  return {
    type: actions.RECEIVE_CHALLENGES,
    payload: {
      challenges: json,
      receivedAt: Date.now(),
    },
  };
};

export const fetchChallenges = () => {
  return (dispatch: any) => {
    fetch("https://shielded-crag-28383.herokuapp.com/api/brands")
      .then((response: any) => response.json())
      .then((json) => dispatch(receiveChallenges(json)));
  };
};

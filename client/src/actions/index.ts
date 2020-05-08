import * as actions from "./actionTypes";

export const requestChallenges = () => {
  return { type: actions.REQUEST_CHALLENGES, payload: {} };
};

export const receiveChallenges = () => {
  return {
    types: actions.REQUEST_CHALLENGES,
    payload: {
      challenges: [],
      receivedAt: Date.now(),
    },
  };
};

export const fetchChallenges = () => {
  return (dispatch: any) => {
    console.log("DISPATCH: ", dispatch);
    console.log("click");
  };
};

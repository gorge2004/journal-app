import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe("testing_authreducer", () => {
  test("should_return_user_logIn", () => {
    const initialState = {};
    const auth = {
      uid: "adas213",
      displayName: "Jorge",
    };
    const action = {
      type: types.login,
      payload: auth,
    };
    const state = authReducer(initialState, action);

    expect(state).toEqual({ uid: auth.uid, name: auth.displayName });
  });
  test("should_return_user_logout_", () => {
    const initialState = {};
    const auth = {
      uid: "adas213",
      name: "Jorge",
    };
    const action = {
      type: types.logout,
    };
    const state = authReducer(initialState, action);

    expect(state).toEqual({});
  });
  test("should_return_initialStete", () => {
    const initialState = {
      uid: "adas213",
      name: "Jorge",
      noMatter: "no",
    };
    const action = {
      type: "noAction",
    };
    const state = authReducer(initialState, action);

    expect(state).toEqual(initialState);
  });
});

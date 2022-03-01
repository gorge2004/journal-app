import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
  login,
  logout,
  startLoginByEmailPassword,
  startLogout,
} from "../../actions/auth";
import { types } from "../../types/types";

import "@testing-library/jest-dom";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const userId = "TESTING";
const initialState = {};

let store = mockStore(initialState);
describe("testing_auth_actions", () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });
  test("should_return_login_and_logout_Actions", () => {
    const uid = "ABC124";
    const displayName = "Jorge";

    const loginAction = login(uid, displayName);
    const logoutAction = logout();

    expect(loginAction).toEqual({
      type: types.login,
      payload: {
        uid,
        displayName,
      },
    });
    expect(logoutAction).toEqual({
      type: types.logout,
    });
  });
  test("should_call_logoutmethod", async () => {
    await store.dispatch(startLogout());

    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: types.logout,
    });
    expect(actions[1]).toMatchObject({
      type: types.notesLogoutCleaning,
    });
  });

  test("should_call_startlogin", async () => {
    await store.dispatch(
      startLoginByEmailPassword("testing@testing.com", "123456")
    );
    const actions = store.getActions();
    console.log(actions);
    expect(actions[0]).toMatchObject({
      type: types.uiRemoveError,
    });
    expect(actions[1]).toMatchObject({
      type: types.uiStartLoading,
    });
    expect(actions[2]).toEqual({
        type: types.login,
        payload: {
            uid:  expect.any(String),
            displayName: null
        }
      });
  });
});

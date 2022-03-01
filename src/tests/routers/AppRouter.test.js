import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { login } from "../../actions/auth";
import { firebase } from "../../firabase/firebase-config";

import { AppRouter } from "../../routers/AppRouter";

jest.mock("../../actions/auth", () => ({
  login: jest.fn(),
}));
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  auth: {},
  ui: { loading: false, erro: null },
  notes: {active:null, notes: []}
};
let store = mockStore(initialState);
store.dispatch = jest.fn();

describe("testing_AppRouter", () => {
  test("should_return_login_component_if__it_is_not_authenticated", async () => {
    
    let user;
    await act(async() => {
        const userCred = await firebase.auth().signInWithEmailAndPassword('testing@testing.com', '123456');
        user = userCred.user;
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );
    });

    expect(login).toHaveBeenCalled();
  });
});

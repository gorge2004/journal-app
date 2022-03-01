import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { startGoogleLogin, startLoginByEmailPassword } from "../../../actions/auth";

import LoginScreen from "../../../components/auth/LoginScreen";


jest.mock("../../../actions/auth", () =>({
    startGoogleLogin: jest.fn(),
    startLoginByEmailPassword: jest.fn(),
}))
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  auth: {},
  ui: { loading: false, erro: null },
};
let store = mockStore(initialState);
store.dispatch = jest.fn();
const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <LoginScreen />
    </MemoryRouter>
  </Provider>
);
describe("test_loginScreen", () => {
  beforeEach(() => {
    store = mockStore(initialState);
    jest.clearAllMocks();
  });
  test('should_render_loginScreen', () => {

    expect(wrapper).toMatchSnapshot();
   });

   test('should_click_on_google_auth', () => {
       expect(startGoogleLogin).toHaveBeenCalledTimes(0);
       wrapper.find('.google-btn').prop('onClick')();
       expect(startGoogleLogin).toHaveBeenCalled();
    });
    test('should_start_login_with_email_and_password', () => { 
       expect(startLoginByEmailPassword).toHaveBeenCalledTimes(0);

        wrapper.find('form').prop('onSubmit')({preventDefault(){}});
       expect(startLoginByEmailPassword).toHaveBeenCalled();
       expect(startLoginByEmailPassword).toHaveBeenCalledWith(expect.any(String), expect.any(String));

     });
});

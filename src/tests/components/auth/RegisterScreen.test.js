import { mount } from "enzyme";
import { Provider } from "react-redux";
import RegisterScreen from "../../../components/auth/RegisterScreen";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { MemoryRouter } from "react-router-dom";
import { types } from "../../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  auth: {},
  ui: {
    msgError: null,
    loading: false,
  },
};
let store = mockStore(initialState);
const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <RegisterScreen />
    </MemoryRouter>
  </Provider>
);
describe("testing_RegisterScreen", () => {
  test("should_render_registerScreen_component", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("should_call_to_registerAction", () => {
    const emailField = wrapper.find('input[name="email"]');
    emailField.simulate("change", {
      target: {
        value: "",
        name: "email",
      },
    });

    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });
    const actions = store.getActions();
    expect(actions[0].type).toBe(types.uiSetError);
  });

  test("should_render_error_box", () => {
    const initialState = {
      auth: {},
      ui: {
        msgError: 'Email no es correcto',
        loading: false,
      },
    };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
  });
});

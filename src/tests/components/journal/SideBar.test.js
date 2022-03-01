import SideBar from "../../../components/journal/SideBar";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { startLogout } from "../../../actions/auth";
import { startNewNote } from "../../../actions/notes";

jest.mock("../../../actions/auth", () => ({
  startLogout: jest.fn(),
}));
jest.mock("../../../actions/notes", () => ({
  startNewNote: jest.fn(),
}));
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  auth: { uid: "123", name: "John" },
  ui: {},
  notes: { notes: [], active: null },
};
let store = mockStore(initialState);
store.dispatch = jest.fn(() => {});
const wrapper = mount(
  <Provider store={store}>
    <SideBar />
  </Provider>
);
describe("testing_sidebar_component", () => {
  test("should_render_component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should_call_logout_action", async () => {
    wrapper.find(".btn").simulate("click", {});

    expect(startLogout).toHaveBeenCalled();
  });

  test("should_call_startNewNote_action", async () => {
    wrapper.find(".journal__new-entry").simulate("click", {});

    expect(startNewNote).toHaveBeenCalled();
  });
});

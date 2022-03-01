import JournalEntry from "../../../components/journal/JournalEntry";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { startLogout } from "../../../actions/auth";
import { activetNote } from "../../../actions/notes";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const note = { id: "123s", title: "John", body: "This is john" };

const initialState = {
  auth: { uid: "123", name: "John" },
  ui: {},
  notes: { notes: [note], active: note },
  url: "http://localhost",
};
let store = mockStore(initialState);
store.dispatch = jest.fn(() => {});
const wrapper = mount(
  <Provider store={store}>
    <JournalEntry {...note} />
  </Provider>
);

describe("testing_JournalEntry", () => {
  test("should first", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("should_call_activeNote_Action", () => {
    wrapper.find(".journal__entry").simulate("click", {});
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(activetNote(note.id, {...note}));
  });
});


import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { activetNote } from "../../../actions/notes";
import NoteScreen from "../../../components/notes/NoteScreen";

jest.mock("../../../actions/auth", () => ({
  startLogout: jest.fn(),
}));
jest.mock("../../../actions/notes", () => ({
    activetNote: jest.fn(),
}));
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const note =  {id: "123s", title: "John", body: "This is john"}
const initialState = {
  auth: { uid: "123", name: "John" },
  ui: {},
  notes: { notes: [note], active: note },
};
let store = mockStore(initialState);
store.dispatch = jest.fn(() => {});
const wrapper = mount(
  <Provider store={store}>
    <NoteScreen />
  </Provider>
);
describe('testing_noteScreenTest', () => { 

    test('should_render_NoteScreen_Component', () => {
        expect(wrapper).toMatchSnapshot();
    });
    test('should_call_ActivNote_Action', () => { 
        const title =  'hola de nuevo';
        wrapper.find('input[name="title"]').simulate('change',{
            target: {
                name:'title',
                value: title,
            }
        });

        expect(activetNote).toHaveBeenCalled();
        expect(activetNote).toBeCalledWith(note.id,{...note, title})
     });
 })
import { notesReducer } from "../../reducers/notesReducer";
import { types } from '../../types/types';
import { addNewNote } from '../../actions/notes';

describe("testin_noteReducer", () => {
  test("should_return_initialState", () => {
    const initialState = {
      notes: [],
      active: null,
    };
    const action = {
      type: "noAction",
    };
    const state = notesReducer(initialState, action);

    expect(state).toEqual(initialState);
  });
  test("should_return_a_activeNote", () => {
    const note = {
      id: "3sad2",
      title: "",
      body: "",
      imgUrl: "",
      date: 1541215,
    };
    const initialState = {
      notes: [],
      active: null,
    };
    const action = {
      type: types.notesActive,
      payload: note
    };
    const state = notesReducer(initialState, action);

    expect(state.active).toEqual(note);
  });
  test("should_return_a_new_note_added", () => {
    const note = {
      id: "3sad2",
      title: "",
      body: "",
      imgUrl: "",
      date: 1541215,
    };
    const initialState = {
      notes: [],
      active: null,
    };
    const action = {
      type: types.notesAddNew,
      payload: note
    };
    const state = notesReducer(initialState, action);

    expect(state.notes).toEqual([...initialState.notes, note]);
  });
});

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  startLoadingNotes,
  startNewNote,
  startSaveNote,
  startuploadingNote,
} from "../../actions/notes";
import { db } from "../../firabase/firebase-config";
import { fileUpload } from "../../helpers/fileUpload";
import { types } from "../../types/types";

jest.mock("../../helpers/fileUpload"/* , () => ({
  fileUpload: jest.fn((file) => Promise.resolve("asfasfad")),
}) */);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const userId = "TESTING";
const initialState = {
  auth: { uid: userId },
  notes: {
    active: {
      id: "gcHQKFKdwjszyu0oXmlw",
      title: "titulo",
      body: "body",
    },
  },
};

let store = mockStore(initialState);

describe("testing_note_action", () => {
  beforeEach(() => {
    store = mockStore(initialState);
    
  });
  test("should_load_all_notes", async () => {
    //problem with sdk firebase
    /*  await  store.dispatch(startLoadingNotes(userId));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
        type: types.notesLoad,
        payload: expect.any(Array)
    });
    const expected = {
        id: expect.any(String),
        title: expect.any(String),
        body: expect.any(String),
        date: expect.any(Number),
    };
    expect(actions[0].payload[0]).toEqual(expected); */
  });
  test("should_save_a_new_note_startNewNote_method", async () => {
    await store.dispatch(startNewNote());

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      },
    });
    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      },
    });
    const docId = actions[0].payload.id;
    await db.doc(`/${userId}/journal/notes/${docId}`).delete();
  });

  test("should_update_note", async () => {
    const note = {
      id: "gcHQKFKdwjszyu0oXmlw",
      title: "titulo",
      body: "body",
    };
    await store.dispatch(startSaveNote(note));
    const actions = store.getActions();
    expect(actions[0].type).toBe(types.notesUpdated);
  });

  test("should_update_file_url_on_notes", async () => {
    const file = new File([], "foto.jpg");
    fileUpload.mockReturnValue('https://fakeurl.fake.test');
    await store.dispatch(startuploadingNote(file));

    expect(fileUpload).toHaveBeenCalledTimes(1);

  });
});

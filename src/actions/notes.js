import { db } from "../firabase/firebase-config";
import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";
import Swal from "sweetalert2";
import { fileUpload } from "../helpers/fileUpload";
import { type } from "@testing-library/user-event/dist/type";
//react-journal
export const startNewNote = () => {
  return async (dispatch, getState) => {
    //get current state on redux
    const uid = getState().auth.uid;
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };
    try {
      const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
      dispatch(activetNote(doc.id, newNote));
      dispatch(addNewNote(doc.id, newNote));
    } catch (error) {}
  };
};

export const activetNote = (id, note) => {
  return {
    type: types.notesActive,
    payload: {
      id: id,
      ...note,
    },
  };
};
export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: { id, ...note },
});

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const setNotes = (notes) => {
  return {
    type: types.notesLoad,
    payload: notes,
  };
};

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    for (const key in note) {
      if (note[key] === undefined) {
        delete note[key];
      }
    }
    try {
      const uid = getState().auth.uid;
      const noteToFirestore = { ...note };
      delete noteToFirestore.id;
      await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);

      dispatch(refreshNote(note.id, noteToFirestore));

      Swal.fire("Saved", note.title, "success");
    } catch (error) {
    }
  };
};
export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: { id, note: { id, ...note } },
});

export const startuploadingNote = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes;
    Swal.fire({
      title: "Uploading...",
      text: "Please Wait...",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
    const urlImage = await fileUpload(file);
    activeNote.url = urlImage;
    dispatch(startSaveNote(activeNote));
    Swal.close();
  };
};

export const startDeleting = (id) => {
  return async (dispatch, getState) => {
    const uid = await getState().auth.uid;
    await db.doc(`${uid}/journal/notes/${id}`).delete();
    dispatch(deleteNote(id));
  };
};

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id,
});

export const noteLogout = () => ({
  type: types.notesLogoutCleaning,
});

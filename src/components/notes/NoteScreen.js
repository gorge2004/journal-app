import { useEffect, useRef } from "react";
import NoteAppBar from "./NoteAppBar";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { activetNote, startDeleting } from "../../actions/notes";


function NoteScreen() {

  const { active: note } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const [formValues, handleInputChange, reset] = useForm(note);
  const { id, title, body } = formValues;
  const activeId = useRef(note.id);
  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
   
    dispatch(activetNote(id,{... formValues}));
  }, [formValues, dispatch]);
  
  const handleDeleteClick = () => {
    dispatch(startDeleting(id));
  }

  return (
    <div className="notes__main-content">
      <NoteAppBar />
      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awesome title"
          className="note__title-input"
          name="title"
          autoComplete="off"
          value={title}
          onChange={handleInputChange}
        />
        <textarea
          placeholder="What happened today"
          className="note__textarea"
          onChange={handleInputChange}
          name="body"
          value={body}
        ></textarea>

        {note.url && (
          <div className="notes__image">
            <img
              src={note.url }
              alt="imagen"
            />
          </div>
        )}
      </div>
      <button className="btn btn-danger" onClick={handleDeleteClick}>
        Delete
      </button>
    </div>
  );
}

export default NoteScreen;

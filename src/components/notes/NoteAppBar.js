import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNote, startuploadingNote } from "../../actions/notes";

const NoteAppBar = () => {
  const fileRef = useRef();
  const dispatch = useDispatch();
  const { active: note } = useSelector((state) => state.notes);
  const handleSaveClick = () => {
    dispatch(startSaveNote(note));
  };
  const handlePictureClick = (evt) => {
    fileRef.current.click();
  };
  const handleFileChange = (evt) => {
    const file = evt.target.files[0];
    if (file) {
      dispatch(startuploadingNote(file));
    }
  };
  return (
    <div className="notes__appbar">
      <span>15 de febrero 2022</span>
      <input
        type="file"
        name="file"
        style={{
          display: "none",
        }}
        ref={fileRef}
        onChange={handleFileChange}
      />
      <div>
        <button className="btn" onClick={handlePictureClick}>
          Picture
        </button>
        <button className="btn" onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
};

export default NoteAppBar;

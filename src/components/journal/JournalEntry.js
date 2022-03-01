import React from "react";
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activetNote } from "../../actions/notes";

function JournalEntry({ id, date, url, title, body }) {
  const dispatch = useDispatch();
  const noteDate = moment(date);
  const handleClickSelect = () => {
    dispatch(activetNote(id,{  date, url, title, body }));
  }
  return (
    <div className="journal__entry animate__animated animate__fadeIn animate__faster pointer" onClick={handleClickSelect}>
      {url && (
        <div
          className="journal__entry-picture"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${url})`,
          }}
        ></div>
      )}

      <div className="journal__entry-body">
        <p className="journal__entry-title">{title}</p>
        <p className="journal__entry-content">{body}</p>
      </div>
      <div className="journal__entry-date-box">
        <span>{noteDate.format('dddd')}</span>
        <h4>{noteDate.format('Do')}</h4>
      </div>
    </div>
  );
}

export default JournalEntry;

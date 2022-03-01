import React from "react";
import { useSelector } from "react-redux";
import JournalEntry from "./JournalEntry";

const JournalEntires = () => {
  const entries = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { notes } = useSelector((state) => state.notes);
  return (
    <div className="journal__entries">
      {notes.map((note) => (
        <JournalEntry key={note.id}  {...note}/>
      ))}
    </div>
  );
};

export default JournalEntires;

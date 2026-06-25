import { useStore } from "../store/useStore";
import { useRef } from "react";

const NotesWidget = () => {
  const notes    = useStore((state) => state.notes);
  const setNotes = useStore((state) => state.setNotes);
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    setNotes(e.target.value); // Zustand store auto-saves to localStorage
  };

  return (
    <div className="notes-widget" aria-label="Sticky notes">
      <h2 className="notes-widget__title">All notes</h2>

      <textarea
        ref={textareaRef}
        className="notes-widget__textarea"
        value={notes}
        onChange={handleChange}
        placeholder="Write your notes..."
        aria-label="Notes text area"
        spellCheck="true"
      />
    </div>
  );
};

export default NotesWidget;

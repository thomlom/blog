import React from "react";

const Note = ({ children }) => {
  return (
    <div className="border-yellow-500 bg-yellow-800 text-yellow-100 border-l-4 px-3 py-1 my-4">
      {children}
    </div>
  );
};

export default Note;

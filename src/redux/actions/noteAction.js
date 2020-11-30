
export const addNote = (note) => {
  return {
    type: "ADD",
    payload: note,
  };
};

export const editNote = (id) => {
  return {
    type: "EDIT",
    payload: id,
  };
};

export const deleteNote = (id) => {
  return {
    type: "DELETE",
    payload: id,
  };
};

import { combineReducers } from "redux";



const initialState = {
    note: JSON.parse(localStorage.getItem("note")) || [],
  };
  
  function noteReducer(state = initialState, action) {
  
    const { type, payload } = action;
  
    switch (type) {
  
      case "ADD":
          let updatedNote = [...state.note, {...payload}];
          localStorage.setItem('note', JSON.stringify([...state.note, {...payload}]))
        return {
          ...state,
          note: [...updatedNote],
        };
  
      case "DELETE":
          let newUpdate = state.note.filter(
              (item) => item.id !== payload
          );

          let newArray = JSON.stringify(newUpdate);
          localStorage.note = newArray
        return {
          ...state,
          note: newUpdate,
        };
  
      case "EDIT":
          let EditUpdate = state.note.filter((note) => note.id !== payload.id)
          let newEditUpdate = [...EditUpdate, payload]
          let newEditArray = JSON.stringify(newEditUpdate);
          localStorage.note = newEditArray
        return {
          ...state,
          note: newEditUpdate,
        };
  
      default:
        return state;
    }
  }
  

  
  const initialUserState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticating: false,
  };
  
  
  
  const userReducer = (state = initialUserState, action) => {
  
    const { type, payload } = action;
  
    switch (type) {
  
      case "SET_USER":
        const userJSON = JSON.stringify(payload);
        localStorage.setItem("user", userJSON);
        return { ...state, user: payload };
  
      case "TOGGLE_AUTH_STATE":
        return { ...state, isAuthenticating: !state.isAuthenticating };
  
      case "LOGOUT_USER":
        localStorage.removeItem("user");
        return { ...state, user: null };
        
      default:
        return state;
    }
  };




const rootReducer  = combineReducers({
    userState: userReducer,
    noteState: noteReducer,
    
})

export default rootReducer
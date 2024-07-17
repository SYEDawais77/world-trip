import { createContext, useReducer, useContext } from "react";

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialState = {
  user: null,
  isAuthenticate: false,
};

const FakeAuthContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticate: true,
      };
    case "LOGOUT":
      return {        
        user: null,
        isAuthenticate: false,
      };
    default:
      return state;
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticate }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "LOGIN", payload: FAKE_USER });
    } else {
      alert("Invalid email or password");
    }
  }
  function logout() {
    dispatch({ type: "LOGOUT" });
  }

  return (
    <FakeAuthContext.Provider value={{ user, isAuthenticate, login, logout }}>
      {children}
    </FakeAuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(FakeAuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
}

export { AuthProvider, useAuth };

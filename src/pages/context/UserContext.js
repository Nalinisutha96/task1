import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  return (
    <UserContext.Provider value={{ users, setUsers, editingUser, setEditingUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}

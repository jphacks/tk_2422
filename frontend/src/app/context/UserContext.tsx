"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface UserContextType {
  uid: string | null;
  updateUid: (newUid: string) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [uid, setUid] = useState<string | null>(null);

  const updateUid = (newUid: string) => {
    setUid(newUid);
    localStorage.setItem('uid', newUid); // uidをローカルストレージに保存
  };

  useEffect(() => {
    const storedUid = localStorage.getItem('uid');
    if (storedUid) {
      setUid(storedUid);
    }
  }, []);

  return (
    <UserContext.Provider value={{ uid, updateUid }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
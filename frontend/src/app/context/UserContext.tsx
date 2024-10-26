"use client"
import React, { createContext, useContext } from 'react';

// ユーザーコンテキストの作成
const UserContext = createContext<{ uid: string | null; updateUid: (newUid: string) => void } | null>(null);

export const UserProvider = ({ children }) => {
  const [uid, setUid] = React.useState<string | null>(null); // uidの状態を管理


  // uidを更新する関数を提供
  const updateUid = (newUid: string) => {
    setUid(newUid); // 新しいuidを設定
  };

  return (
    <UserContext.Provider value={{ uid, updateUid }}> {/* updateUidを提供 */}
      {children}
    </UserContext.Provider>
  );
};

// ユーザーコンテキストを使用するためのカスタムフック
export const useUser = () => {
  return useContext(UserContext);
};
"use client";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../lib/firebase/firebase";
import { db } from "../lib/firebase/firebase"; // Firestoreのインスタンスをインポート
import { doc, setDoc } from "firebase/firestore"; // Firestoreのメソッド

function Home() {
  return (
    <>
      <SignInButton />
    </>
  );
}

export default Home;

function SignInButton() {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // UIDをFirestoreのUsersコレクションに保存
      await setDoc(doc(db, "Users", user.uid), {
        uid: user.uid,
      });
      console.log("ユーザー情報がFirestoreに保存されました");
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
  };

  return (
    <button onClick={signInWithGoogle}>
      Googleでサインイン
    </button>
  );
}

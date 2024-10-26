"use client";
import { useRouter } from 'next/navigation';
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../lib/firebase/firebase";
import { db } from "../lib/firebase/firebase"; // Firestoreのインスタンスをインポート
import { doc, setDoc } from "firebase/firestore"; // Firestoreのメソッド // Firestoreのメソッド
import { useUser } from './context/UserContext';

function Home() {
  return (
    <>
      <SignInButton />
    </>
  );
}

export default Home;

function SignInButton() {
  const router = useRouter();
  const { updateUid } = useUser() || { updateUid: () => {} }; // useUserがnullの場合のデフォルト関数を提供
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // UIDをFirestoreのUsersコレクションに保存
      await setDoc(doc(db, "Users", user.uid), {
        uid: user.uid,
      });
      updateUid(user.uid);
      console.log("ユーザー情報がFirestoreに保存されました");
      router.push('/home');
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

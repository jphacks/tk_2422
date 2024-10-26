"use client";
import { useRouter } from "next/navigation";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../lib/firebase/firebase";
import { db } from "../lib/firebase/firebase"; // Firestoreのインスタンスをインポート
import { doc, setDoc } from "firebase/firestore"; // Firestoreのメソッド
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "./context/UserContext";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const { updateUid } = useUser() || { updateUid: () => {} }; // useUserがnullの場合のデフォルト関数を提供
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // UIDをFirestoreのUsersコレクションに保存
      await setDoc(doc(db, "Users", user.uid), {
        uid: user.uid,
        name: username,
      });
      updateUid(user.uid);
      console.log("ユーザー情報がFirestoreに保存されました");
      router.push("/home");
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-800 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Join as a Traveler to send your luggage</h2>
            <h2 className="text-3xl font-bold text-white mb-4">or sign up as a Keeper to store</h2>
          </div>

          <form className="space-y-6">
            <div className="relative">
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your name"
                className="w-full h-14 px-6 rounded-full bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
              <Button onClick={signInWithGoogle} type="button" className="absolute right-1 top-1 h-12 px-8 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-colors">
                Sign In with
                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
              </Button>
            </div>

            <p className="text-center text-sm text-gray-400">
              By signing up, you agree to the{" "}
              <a href="#" className="text-emerald-400 hover:text-emerald-300 underline">
                Terms of Service
              </a>
              .
            </p>
          </form>
        </motion.div>
      </div>
    </>
  );
}

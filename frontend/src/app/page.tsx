"use client";
import { useRouter } from "next/navigation";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../lib/firebase/firebase";
import { db } from "../lib/firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useUser } from "./context/UserContext";

export default function SignIn() {
  const router = useRouter();
  const { updateUid } = useUser() || { updateUid: () => { } };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const docSnap = await getDoc(doc(db, "Users", user.uid));

      if (docSnap.exists() && docSnap.data().name !== "") {
        router.push("/home");
        await setDoc(doc(db, "Users", user.uid), {
          uid: user.uid,
          name: docSnap.data().name,
        });
      } else {
        router.push("/submitName");
      }
      updateUid(user.uid);
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-800 flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome to LuggPal</h1>
          <div className="space-y-2">
            <p className="text-2xl text-gray-200">Join as a traveler to send your luggege</p>
            <p className="text-2xl text-gray-200">or sign up as a keeper</p>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-8">
          <Button
            onClick={signInWithGoogle}
            className="w-full max-w-md h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-all transform hover:scale-105 flex items-center justify-center space-x-3"
          >
            <svg className="h-6 w-6" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            <span>Googleアカウントで参加</span>
          </Button>

          <p className="text-center text-sm text-gray-400 max-w-md">
            サインインすると{" "}
            <a href="#" className="text-emerald-400 hover:text-emerald-300 underline">
              利用規約
            </a>{" "}
            と{" "}
            <a href="#" className="text-emerald-400 hover:text-emerald-300 underline">
              プライバシーポリシー
            </a>
            に同意したことになります
          </p>
        </div>
      </motion.div>
    </div>
  );
}

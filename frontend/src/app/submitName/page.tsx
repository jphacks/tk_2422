"use client";
import { useRouter } from "next/navigation";
import { db } from "../../lib/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState } from "react";
import { useUser } from "../context/UserContext";

export default function SubmitName() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { uid } = useUser() || { uid: null };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    try {
      if (!uid) {
        throw new Error("User ID not found");
      }

      await setDoc(doc(db, "Users", uid), {
        uid: uid,
        name: name.trim(),
      });

      router.push("/home");
    } catch (error) {
      console.error("Error saving name:", error);
      setError("An error occurred while saving your name. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-800 flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome to LuggPal</h1>
          <p className="text-xl text-gray-200">Please enter your name to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-14 rounded-full bg-white/10 text-white placeholder-gray-400 px-6"
              maxLength={50}
            />
            {error && <p className="text-red-400 text-sm px-4">{error}</p>}
          </div>

          <Button type="submit" className="w-full h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-all transform hover:scale-105">
            Continue
          </Button>

          <p className="text-center text-sm text-gray-400">
            By continuing, you agree to our{" "}
            <a href="#" className="text-emerald-400 hover:text-emerald-300 underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-emerald-400 hover:text-emerald-300 underline">
              Privacy Policy
            </a>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

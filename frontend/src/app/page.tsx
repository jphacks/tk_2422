"use client"
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../lib/firebase/firebase"

function Home(){
  return (
    <>
    <SignInButton/>
    </>
  )
}

export default Home;

function SignInButton() {

  const signInWithGoogle = () =>{
    signInWithPopup(auth,provider)
  }

  return (
    <button onClick={signInWithGoogle}>
      Googleでサインイン
    </button>
  )
}


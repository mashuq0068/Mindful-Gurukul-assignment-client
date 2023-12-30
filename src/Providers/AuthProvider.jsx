import  { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from "../firebase/firebase.config";


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const googleProvider = new GoogleAuthProvider()
    const githubProvider = new GithubAuthProvider()
    const [user , setUser] = useState(null)
    const [loading , setLoading] = useState(true)
    
    const createUser = (email , password) => {
        setLoading(true)
        return  createUserWithEmailAndPassword(auth , email , password)
    }
    const loginUser = (email , password) => {
      setLoading(true)
        return signInWithEmailAndPassword(auth , email , password)

    }
    const logOutUser = () => {
      setLoading(true)
        return signOut(auth)
    }
    const userWithGoogle = () => {
      setLoading(true)
      return  signInWithPopup(auth , googleProvider)
    }
    const userWithGithub = () => {
      setLoading(true)
        return signInWithPopup(auth , githubProvider)
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth , (currentUser) => {
          console.log(currentUser)
            setUser(currentUser)
            setLoading(false)
            
        })
        return (()=>{
            unsubscribe()
        })
    },[])
  const authInfo = 
  {
    createUser,
    loginUser,
    logOutUser,
    userWithGoogle,
    userWithGithub,
    user,
    loading
};

  return (
    <div>
      <AuthContext.Provider value={authInfo}>
        {children}
        </AuthContext.Provider>
    </div>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, 
};

export default AuthProvider;

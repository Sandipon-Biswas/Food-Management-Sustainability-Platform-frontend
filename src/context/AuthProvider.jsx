import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)

    // const createUserWithEmail = (email, password) => {
    //     setLoading(true)
    //     return createUserWithEmailAndPassword(auth,email,password)
    // }

    // const signInWithEmail = (email, password) => {
    //     setLoading(true)
    //     return signInWithEmailAndPassword(auth,email,password)
    // }

    // const signOutUser = () => {
    //     setLoading(true)
    //     return signOut(auth)
    // }

    // useEffect(() => {
    //    const unsubscribe= onAuthStateChanged(auth, (loggedUser) => {
    //         setUser(loggedUser)
    //         setLoading(false)
    //    })
        
    //     return () => {
    //         unsubscribe()
    //     }
    // },[])

    // const authInfo = {
    //     user,
    //     loading,
    //     createUserWithEmail,
    //     signInWithEmail,
    //     signOutUser
    // }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
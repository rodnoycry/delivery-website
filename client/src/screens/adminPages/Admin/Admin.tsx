import React, { useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signOut as firebaseSignOut,
    User,
    onAuthStateChanged,
} from 'firebase/auth'
import { auth } from '@/firebase'
import type { FC } from 'react'
import { getIsAdminFromServer } from '@/services/apiService'

const firebaseConfig = {
    apiKey: 'AIzaSyCLaFLTH8CXbz6ZMPF39rx7NH_dViDo_EE',
    authDomain: 'san-sei.firebaseapp.com',
    projectId: 'san-sei',
    storageBucket: 'san-sei.appspot.com',
    messagingSenderId: '545611652850',
    appId: '1:545611652850:web:4e4852a9f3e8a2e8fd7a6b',
    measurementId: 'G-2DYJF0YY9F',
}

initializeApp(firebaseConfig)

export const Admin: FC = () => {
    const [user, setUser] = useState<User | null>(null)
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
            return () => {
                unsubscribe()
            }
        })
    }, [])

    const signIn = async (): Promise<void> => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential =
                    GoogleAuthProvider.credentialFromResult(result)
                const token = credential?.accessToken
                // The signed-in user info.
                const user = result.user
                setUser(user)
                return user
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            })
            .then((user) => {
                getIsAdmin(user)
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code
                const errorMessage = error.message
                // The email of the user's account used.
                const email = error.customData.email
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error)
                console.log(errorMessage)
            })
    }

    const handleSignIn = (): void => {
        setIsLoading(true)
        signIn()
            .then(() => {
                setIsLoading(true)
            })
            .catch((error) => {
                setIsLoading(false)
                console.error(error)
            })
    }

    const signOut = async (): Promise<void> => {
        const auth = getAuth()
        firebaseSignOut(auth)
            .then(function () {
                // Sign-out successful.
                setUser(null)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const handleSignOut = (): void => {
        setIsLoading(true)
        signOut()
            .then(() => {
                setIsLoading(false)
            })
            .catch((error) => {
                console.error(error)
                setIsLoading(false)
            })
    }

    const getIsAdmin = (user: User): void => {
        if (user) {
            user.getIdToken()
                .then(
                    async (token) =>
                        await getIsAdminFromServer({ idToken: token })
                )
                .then((isAdmin) => {
                    setIsAdmin(isAdmin)
                })
                .catch((error) => {
                    console.log(error.message)
                })

            console.log(`isAdmin = `, isAdmin)
        }
    }
    return (
        <div>
            <h1>Authorization Page</h1>
            <h1>Is Admin: {isAdmin.toString()}</h1>
            {user ? (
                <>
                    <p>Welcome, {user.email}!</p>
                    <button onClick={handleSignOut}>Sign Out</button>
                </>
            ) : (
                <button onClick={handleSignIn}>Sign in with Google</button>
            )}
        </div>
    )
}

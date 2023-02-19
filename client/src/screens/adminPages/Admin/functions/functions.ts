import {
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    User,
} from 'firebase/auth'
import { auth } from '@/firebase'

export const signInGoogle = async (
    setUser: (user: User | null) => void,
    setErrorMessage: (errorMessage: string) => void
): Promise<User | null> => {
    const provider = new GoogleAuthProvider()
    const user = await signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // const credential =
            //     GoogleAuthProvider.credentialFromResult(result)
            // const token = credential?.accessToken

            // The signed-in user info.
            const user = result.user
            setUser(user)
            return user
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorMessage = error.message
            // The email of the user's account used.
            // const email = error.customData.email
            // The AuthCredential type that was used.
            // const credential = GoogleAuthProvider.credentialFromError(error)
            console.log(errorMessage)
            setErrorMessage(errorMessage)
            return null
        })
    return user
}

export const signInEmail = async (
    email: string,
    password: string,
    setUser: (user: User | null) => void,
    setErrorMessage: (errorMessage: string) => void
): Promise<User | null> => {
    const user = await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user
            setUser(user)
            return user
        })
        .catch((error) => {
            // const errorCode = error.code
            console.log(error)
            setErrorMessage(error.message)
            return null
        })
    return user
}

export const signUpEmail = async (
    email: string,
    password: string,
    setUser: (user: User | null) => void,
    setErrorMessage: (errorMessage: string) => void
): Promise<User | null> => {
    const user = await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user
            setUser(user)
            return user
        })
        .then((user) => {
            auth.languageCode = 'RU'
            void sendEmailVerification(auth.currentUser as User)
            return user
        })
        .catch((error) => {
            // const errorCode = error.code
            const errorMessage = error.message
            console.log(errorMessage)
            setErrorMessage(errorMessage)
            return null
        })
    return user
}

export const signOut = async (
    setUser: (user: User | null) => void,
    setErrorMessage: (errorMessage: string) => void
): Promise<void> => {
    firebaseSignOut(auth)
        .then(function () {
            // Sign-out successful.
            setUser(null)
        })
        .catch((error) => {
            console.error(error)
            setErrorMessage(error.message)
        })
}

import { signOut as firebaseSignOut, User } from 'firebase/auth'
import { auth } from '@/firebase'

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

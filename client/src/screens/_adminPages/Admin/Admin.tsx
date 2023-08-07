import React, { useState, useEffect } from 'react'
import type { FC } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { useHistory } from 'react-router-dom'
import { auth } from '@/firebase'
import { getIsAdminFromServer } from '@/services/apiService'
import { signInEmail, signUpEmail, signInGoogle, signOut } from './functions'
import styles from './Admin.module.css'

export type Mode = 'Sign Up' | 'Sign In'

export const Admin: FC = () => {
    const [user, setUser] = useState<User | null>(null)
    const [isAdmin, setIsAdmin] = useState<boolean>()
    const [isIntruder, setIsIntruder] = useState<boolean>(false)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('\u00a0')

    const history = useHistory()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                getIsAdmin(user)
                    .then(setIsAdmin)
                    .catch((error) => {
                        setIsAdmin(isAdmin)
                        console.log(error)
                    })
            } else {
                setUser(null)
            }
            return () => {
                unsubscribe()
            }
        })
        if (isIntruder) {
            // history.push('/') // UNCOMMENT ON PROD
        }
    }, [])

    useEffect(() => {
        if (user && isAdmin !== undefined) {
            console.log(isAdmin)
            if (isAdmin) {
                history.push('/admin/panel')
            } else {
                setIsIntruder(true)
                // console.log(`pushing to home`)
                // history.push('/')
            }
        }
    }, [isAdmin, user])

    const handleSignInGoogle = (): void => {
        setIsLoading(true)
        signInGoogle(setUser, setErrorMessage)
            .then((user) => {
                setIsLoading(true)
            })
            .catch((error) => {
                setIsLoading(false)
                console.error(error)
            })
    }
    const getIsAdmin = async (user: User): Promise<boolean> => {
        if (!user) {
            return false
        }
        const isAdmin_ = await user
            .getIdToken()
            .then(
                async (token) => await getIsAdminFromServer({ idToken: token })
            )
            .then((isAdmin) => {
                setIsAdmin(isAdmin)
                return isAdmin
            })
            .catch((error) => {
                console.log(error.message)
                return false
            })
        return isAdmin_
    }
    return (
        <div className={styles.adminContainer}>
            <div className={styles.admin}>
                <button
                    className={styles.google}
                    style={{ backgroundColor: '#FF000A' }}
                    onClick={handleSignInGoogle}
                >
                    Войти
                </button>
            </div>
        </div>
    )
}

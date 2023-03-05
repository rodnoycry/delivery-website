import React, { useState, useEffect } from 'react'
import type { FC } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { useHistory } from 'react-router-dom'
import { auth } from '@/firebase'
import { getIsAdminFromServer } from '@/services/apiService'
import { signInEmail, signUpEmail, signInGoogle, signOut } from './functions'
import styles from './Admin.module.css'

type Mode = 'Sign Up' | 'Sign In'

export const Admin: FC = () => {
    const [mode, setMode] = useState<Mode>('Sign In')

    const [user, setUser] = useState<User | null>(null)
    const [isAdmin, setIsAdmin] = useState<boolean>()
    const [isIntruder, setIsIntruder] = useState<boolean>(false)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('\u00a0')

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordConfirm, setPasswordConfirm] = useState<string>('')

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
            // history.push('/') // CHANGE ON PROD
            console.log()
        }
    }, [])

    useEffect(() => {
        if (user) {
            if (isAdmin) {
                history.push('/admin/panel')
            } else {
                setIsIntruder(true)
                history.push('/')
            }
        }
    }, [isAdmin])

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

    const handleSignInEmail = (): void => {
        setIsLoading(true)
        signInEmail(email, password, setUser, setErrorMessage)
            .then((user) => {
                setIsLoading(true)
            })
            .catch((error) => {
                setIsLoading(false)
                console.error(error)
            })
    }

    const handleSignUpEmail = (): void => {
        setIsLoading(true)
        if (password === passwordConfirm) {
            signUpEmail(email, password, setUser, setErrorMessage)
                .then((user) => {
                    setIsLoading(true)
                })
                .catch((error) => {
                    setIsLoading(false)
                    console.error(error)
                })
        } else {
            setErrorMessage('Пароли не совпадают')
        }
    }

    const handleSignOut = (): void => {
        setIsLoading(true)
        signOut(setUser, setErrorMessage)
            .then(() => {
                setIsLoading(false)
                setIsAdmin(false)
            })
            .catch((error) => {
                console.error(error)
                setIsLoading(false)
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
                console.log(`isAdmin = `, isAdmin)
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
                {/* <div className={styles.modeToggle}>
                    <button
                        className={styles.toggle}
                        onClick={() => {
                            setMode('Sign In')
                        }}
                        style={{
                            border:
                                mode === 'Sign In' ? '1px solid #FFFFFF' : '',
                        }}
                    >{`Авторизация`}</button>
                    <button
                        className={styles.toggle}
                        onClick={() => {
                            setMode('Sign Up')
                        }}
                        style={{
                            border:
                                mode === 'Sign Up' ? '1px solid #FFFFFF' : '',
                        }}
                    >{`Регистрация`}</button>
                </div>
                <input
                    className={styles.admin}
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value)
                    }}
                />
                <input
                    className={styles.admin}
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value)
                    }}
                />
                {mode === 'Sign Up' ? (
                    <>
                        <input
                            className={styles.admin}
                            name="passwordConfirm"
                            type="password"
                            placeholder="Повторите пароль"
                            value={passwordConfirm}
                            onChange={(event) => {
                                setPasswordConfirm(event.target.value)
                            }}
                        />
                        <button
                            className={styles.main}
                            onClick={handleSignUpEmail}
                        >
                            Зарегистрироваться
                        </button>
                        <h4>{errorMessage}</h4>
                    </>
                ) : null}
                {mode === 'Sign In' ? (
                    <>
                        <button
                            className={styles.main}
                            onClick={handleSignInEmail}
                        >
                            Войти
                        </button>
                        <h4>{errorMessage}</h4>
                        <button
                            className={styles.google}
                            onClick={handleSignInGoogle}
                        >
                            Войти с помощью аккаунта Google
                        </button>
                        <button className={styles.main} onClick={handleSignOut}>
                            Выйти
                        </button>
                    </>
                ) : null} */}
                {/* <h1>Is Admin: {isAdmin?.toString()}</h1>
                <h1>Current User: {user?.email}</h1> */}
            </div>
        </div>
    )
}

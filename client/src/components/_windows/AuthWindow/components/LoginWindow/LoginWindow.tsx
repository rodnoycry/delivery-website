import React, { useState, CSSProperties } from 'react'
import type { FC } from 'react'
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
} from 'firebase/auth'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateLoginWindowState } from '@/redux/store'
import { auth } from '@/firebase'
import { DisplayTab } from '../../AuthWindow'
import parentStyles from '../../AuthWindow.module.css'
import styles from './LoginWindow.module.css'
import XImg from '../../images/X.png'
import GoogleImg from '../../images/Google.png'
import ShowPasswordImg from '../../images/ShowPassword.png'
import LoadingImg from '@images/Load.png'

interface Props {
    email: string
    setEmail: (email: string) => void
    password: string
    setPassword: (password: string) => void
    setDisplayTab: (displayTab: DisplayTab) => void
    style?: CSSProperties
}

const errorsObject = {
    'auth/invalid-email': 'Неверно заполнен E-mail',
    'auth/user-disabled': 'Пользовательский аккаунт отключен',
    'auth/user-not-found': 'Данный E-mail не зарегистрирован',
    'auth/wrong-password': 'Неверный пароль',
    'auth/internal-error': 'Ошибка, проверьте введённые данные',
}

export const LoginWindow: FC<Props> = ({
    email,
    setEmail,
    password,
    setPassword,
    setDisplayTab,
    style,
}) => {
    const [signInLoading, setSignInLoading] = useState<boolean>(false)
    const [googleLoading, setGoogleLoading] = useState<boolean>(false)

    const [hasError, setHasError] = useState<boolean>(false)
    const [hasMessage, setHasMessage] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const history = useHistory()
    const dispatch = useDispatch()

    const onSignInGoogle = (): void => {
        const provider = new GoogleAuthProvider()
        setGoogleLoading(true)
        signInWithPopup(auth, provider)
            .then(() => {
                setGoogleLoading(false)
                dispatch(updateLoginWindowState(false))
                history.push('/profile')
            })
            .catch((error) => {
                console.error(error)
                setGoogleLoading(false)
                setMessage(`Ошибка авторизации`)
            })
    }

    const onLoginWithEmail = (): void => {
        setSignInLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setSignInLoading(false)
                dispatch(updateLoginWindowState(false))
                history.push('/profile')
            })
            .catch((error) => {
                console.log(error.code)
                if (Object.keys(errorsObject).includes(error?.code)) {
                    setMessage(
                        errorsObject[error.code as keyof typeof errorsObject]
                    )
                } else {
                    setMessage('Ошибка подключения')
                    setHasError(true)
                }
                setHasError(true)
                setSignInLoading(false)
                console.error(error)
            })
    }
    return (
        <form
            className={parentStyles.authWindow}
            style={style}
            onSubmit={(e) => {
                e.preventDefault()
                onLoginWithEmail()
            }}
        >
            <img
                src={XImg}
                className={parentStyles.X}
                onClick={() => {
                    dispatch(updateLoginWindowState(false))
                }}
            />
            <h1 className={parentStyles.label}>Авторизация</h1>
            {/* Google auth button */}
            <button
                className={parentStyles.blackButton}
                type="button"
                onClick={onSignInGoogle}
            >
                {googleLoading ? (
                    <img src={LoadingImg} className="loadingImage" />
                ) : (
                    <>
                        <img
                            className={parentStyles.googleImage}
                            src={GoogleImg}
                        />
                        <h3 className={parentStyles.buttonText}>
                            Войти с Google
                        </h3>
                    </>
                )}
            </button>
            <h4>или</h4>
            <input
                className={parentStyles.input}
                style={hasError ? { border: '2px solid #FF000A' } : undefined}
                onFocus={() => {
                    setHasError(false)
                }}
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value)
                }}
            />
            <div>
                <div className={parentStyles.password}>
                    <input
                        className={parentStyles.input}
                        style={
                            hasError
                                ? { border: '2px solid #FF000A' }
                                : undefined
                        }
                        onFocus={() => {
                            setHasError(false)
                        }}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                    <div
                        className={parentStyles.showPassword}
                        style={{ opacity: showPassword ? 0.9 : 0.5 }}
                        onClick={() => {
                            setShowPassword(!showPassword)
                        }}
                    >
                        <img
                            className={parentStyles.showPassword}
                            src={ShowPasswordImg}
                        />
                    </div>
                </div>
                <h4 className={parentStyles.message}>
                    {hasError ? (
                        <span className={parentStyles.error}>{message}</span>
                    ) : hasMessage ? (
                        <span>{message}</span>
                    ) : (
                        '\u00a0'
                    )}
                </h4>
            </div>

            <button className={parentStyles.redButton} type="submit">
                {signInLoading ? (
                    <img src={LoadingImg} className="loadingImage" />
                ) : (
                    'Войти'
                )}
            </button>
            <div className={parentStyles.lowerText}>
                <button
                    className={parentStyles.resetPasswordButton}
                    type="button"
                    onClick={() => {
                        setHasError(false)
                        sendPasswordResetEmail(auth, email)
                            .then(() => {
                                setMessage(
                                    'Ссылка для восстановления пароля отправлена на почту'
                                )
                                setHasMessage(true)
                            })
                            .catch((error) => {
                                console.error(error)
                                setHasError(true)
                                setMessage(`Ошибка отправки. Проверьте E-mail`)
                            })
                    }}
                >
                    Восстановить пароль
                </button>

                <h3 className={parentStyles.lowerText}>Нет аккаунта?</h3>
            </div>
            <button
                className={parentStyles.redButton}
                type="button"
                onClick={() => {
                    setDisplayTab(DisplayTab.SignUp)
                }}
            >
                Регистрация
            </button>
        </form>
    )
}

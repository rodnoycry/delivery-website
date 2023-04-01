import React, { useState, CSSProperties } from 'react'
import type { FC } from 'react'
import {
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
} from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateLoginWindowState } from '@/redux/store'
import { auth } from '@/firebase'
import { DisplayTab } from '../../AuthWindow'
import parentStyles from '../../AuthWindow.module.css'
import styles from './SignUpWindow.module.css'
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
    'auth/internal-error': 'Ошибка, проверьте введённые данные',
    'auth/email-already-in-use': 'Данный E-mail уже используется',
    'auth/operation-not-allowed': 'Создание новых пользователей выключено',
    'auth/weak-password': 'Пароль слишком простой или ненадежный',
}

export const SignUpWindow: FC<Props> = ({
    email,
    setEmail,
    password,
    setPassword,
    setDisplayTab,
    style,
}) => {
    const [signUpLoading, setSignUpLoading] = useState<boolean>(false)
    const [googleLoading, setGoogleLoading] = useState<boolean>(false)

    const [hasError, setHasError] = useState<boolean>(false)
    const [hasMessage, setHasMessage] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const dispatch = useDispatch()

    const onSignUpGoogle = (): void => {
        const provider = new GoogleAuthProvider()
        setGoogleLoading(true)
        signInWithPopup(auth, provider)
            .then(() => {
                setGoogleLoading(false)
                dispatch(updateLoginWindowState(false))
            })
            .catch((error) => {
                console.error(error)
                setGoogleLoading(false)
                setMessage(`Ошибка авторизации`)
            })
    }

    const onSignUpWithEmail = (): void => {
        setSignUpLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                setSignUpLoading(false)
                dispatch(updateLoginWindowState(false))
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
                setSignUpLoading(false)
                console.error(error)
            })
    }
    return (
        <form
            className={parentStyles.authWindow}
            style={style}
            onSubmit={(e) => {
                e.preventDefault()
                onSignUpWithEmail()
            }}
        >
            <h1 className={parentStyles.label}>Регистрация</h1>
            {/* Google auth button */}
            <button
                className={parentStyles.blackButton}
                type="button"
                onClick={onSignUpGoogle}
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
                {signUpLoading ? (
                    <img src={LoadingImg} className="loadingImage" />
                ) : (
                    'Зарегистрироваться'
                )}
            </button>
            <div className={parentStyles.lowerText}>
                <h4 className={styles.legalInfo}>
                    Нажимая “Зарегистрироваться” или “Войти с Google” вы
                    принимаете{' '}
                    <Link to="/privacy-policy">
                        <span className={styles.link}>
                            Политику конфиденциальности
                        </span>
                    </Link>
                </h4>
                <h3 className={parentStyles.lowerText}>Уже есть аккаунт?</h3>
            </div>
            <button
                className={parentStyles.blackButton}
                type="button"
                onClick={() => {
                    setDisplayTab(DisplayTab.Login)
                }}
            >
                Авторизация
            </button>
        </form>
    )
}

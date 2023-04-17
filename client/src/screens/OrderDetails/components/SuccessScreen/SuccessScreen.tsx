import React, { useContext } from 'react'
import type { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateLoginWindowState } from '@/redux/store'
import { UserContext } from '@/App'
import styles from './SuccessScreen.module.css'
import SuccessImg from './images/Success.png'

interface Props {
    isSuccess: boolean
    setIsSuccess: (isSuccess: boolean) => void
}

export const SuccessScreen: FC<Props> = ({ isSuccess, setIsSuccess }) => {
    const user = useContext(UserContext)
    const history = useHistory()
    const dispatch = useDispatch()

    return (
        <div
            className={styles.successScreen}
            style={{
                opacity: isSuccess ? 1 : 0,
                display: isSuccess ? '' : 'none',
            }}
        >
            <div className={styles.successWindow}>
                <img className={styles.successWindow} src={SuccessImg} />
                <h1 className={styles.successWindow}>Заказ принят!</h1>
                <h3 className={styles.successWindow}>
                    {user
                        ? `Ожидайте, скоро мы свяжемся с вами`
                        : `Авторизуйтесь чтобы отслеживать заказ`}
                </h3>
                {user ? (
                    <button
                        className={styles.redButton}
                        onClick={() => {
                            setIsSuccess(false)
                            history.push('/')
                            window.scrollTo(0, 0)
                        }}
                    >
                        <p className={styles.button}>Вернуться на главную</p>
                    </button>
                ) : (
                    <>
                        <button
                            className={styles.redButton}
                            onClick={() => {
                                setIsSuccess(false)
                                history.push('/')
                                dispatch(updateLoginWindowState(true))
                                window.scrollTo(0, 0)
                            }}
                        >
                            Войти
                        </button>
                        <button
                            className={styles.blackButton}
                            onClick={() => {
                                setIsSuccess(false)
                                history.push('/')
                                window.scrollTo(0, 0)
                            }}
                        >
                            Вернуться на главную
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

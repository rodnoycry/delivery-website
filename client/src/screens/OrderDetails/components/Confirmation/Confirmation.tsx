import React, { useState, useEffect } from 'react'
import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { Order } from '@/redux/slices/orderSlice'
import { zoneDeliveryInfo } from '@/config'
import styles from './Confirmation.module.css'
import { checkErrors } from '../../functions'

interface Props {
    sum: number
    inputStates: Order | Record<string, string>
    requiredInputs: string[]
    hasError: boolean
    setHasError: (hasError: boolean) => void
    setIsSuccess: (isSuccess: boolean) => void
    onSubmit: () => void
}

const errorMeassageObj = {
    empty: '\u00a0',
    sumError: 'Сумма заказа недостаточна для выбранной зоны доставки',
    inputError: 'Необходимые для заказа поля не заполненны',
}

export const Confirmation: FC<Props> = ({
    sum,
    inputStates,
    requiredInputs,
    hasError,
    setHasError,
    setIsSuccess,
    onSubmit,
}) => {
    const [errorMessage, setErrorMessage] = useState<string>(
        errorMeassageObj.empty
    )
    useEffect(() => {
        if (inputStates.zone) {
            const minSum =
                zoneDeliveryInfo[
                    inputStates.zone as keyof typeof zoneDeliveryInfo
                ].minSum
            if (hasError) {
                setErrorMessage(errorMeassageObj.inputError)
            }
            if (minSum >= sum) {
                setErrorMessage(errorMeassageObj.sumError)
                setHasError(true)
            }
        }
    }, [sum, inputStates])
    return (
        <>
            <div className={styles.upperInfoContainer}>
                <div className={styles.upperInfo}>
                    <h1 className={styles.upperInfo}>Сумма заказа: {sum} ₽</h1>
                    <h4 className={styles.upperInfo} style={{ marginTop: 10 }}>
                        Итоговая сумма в чеке может измениться. Веб-сайт может
                        не учитывать детали доставки, бонусные карты
                    </h4>
                </div>
            </div>
            <div className={styles.buttons}>
                <Link to="/cart">
                    <button className={styles.backButton}>
                        <p className={styles.backButton}>
                            ⬅️ {`\u00a0`}Вернуться назад
                        </p>
                    </button>
                </Link>
                <button
                    onClick={() => {
                        const hasError = checkErrors(
                            inputStates,
                            requiredInputs
                        )
                        setHasError(hasError)
                        if (!hasError) {
                            setIsSuccess(true)
                            onSubmit()
                        }
                    }}
                    className={styles.submitButton}
                    disabled={hasError}
                >
                    <p className={styles.submitButton}>
                        Оформить заказ {`\u00a0`}✅
                    </p>
                </button>
            </div>
            <div className={styles.lowerInfoContainer}>
                <div className={styles.upperInfo}>
                    <h4 className={styles.errorMessage}>{errorMessage}</h4>
                    <h4 className={styles.upperInfo} style={{ marginTop: 10 }}>
                        Нажимая на кнопку, Вы соглашаетесь с{' '}
                        <Link
                            to="/offer"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span style={{ textDecoration: 'underline' }}>
                                Офертой
                            </span>
                        </Link>
                        {', '}
                        <Link
                            to="/terms"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span style={{ textDecoration: 'underline' }}>
                                Пользовательским соглашением
                            </span>
                        </Link>{' '}
                        и{' '}
                        <Link
                            to="/policy"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span style={{ textDecoration: 'underline' }}>
                                Политикой обработки персональных данных
                            </span>
                        </Link>
                    </h4>
                </div>
            </div>
        </>
    )
}

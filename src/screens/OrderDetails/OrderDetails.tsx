import React, { useState, CSSProperties, useEffect } from 'react'
import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { RootState as StoreState, updateOrder } from '@/redux/store'
import { Order, InputState } from '@/redux/slices/orderSlice'
import { useSelector, useDispatch } from 'react-redux'
import { checkErrors } from './functions'
import { getSumWithDelivery } from '@/functions'
import styles from './OrderDetails.module.css'

import { PhoneInput } from './components/1.PhoneInput/PhoneInput'
import { NameInput } from './components/2.NameInput/NameInput'
import { DeliveryTypeSelect } from './components/3.DeliveryTypeSelect/DeliveryTypeSelect'
import { StreetInput } from './components/4.StreetInput/StreetInput'
import { HouseInput } from './components/5.HouseInput/HouseInput'
import { ApartmentInput } from './components/6.ApartmentInput/ApartmentInput'
import { EntranceInput } from './components/7.EntranceInput/EntranceInput'
import { IntercomInput } from './components/8.IntercomInput/IntercomInput'

import { PersonQtySelect } from './components/9.PersonQtySelect/PersonQtySelect'
import { TimeSelect } from './components/10.TimeSelect/TimeSelect'
import { DaySelect } from './components/11.DaySelect/DaySelect'
import { TimeInput } from './components/12.TimeInput/TimeInput'
import { PaymentSelect } from './components/13.PaymentSelect/PaymentSelect'
import { CommentInput } from './components/14.CommentInput/CommentInput'

interface Props {
    style?: CSSProperties
}
export const OrderDetails: FC<Props> = ({ style }) => {
    // States definition
    const [inputStates, setInputStates] = useState<Order | Record<string, any>>(
        {}
    )
    const [requiredInputs, setRequiredInputs] = useState<string[]>([
        'PhoneInput',
        'NameInput',
    ])
    const [hasError, setHasError] = useState<boolean>(false)
    const [sum, setSum] = useState<number>(0)
    // Store Input States - states of inputs that retrieved from the Redux Store
    const storeInputStates = useSelector(
        (state: StoreState) => state.orderState
    )
    const cart = useSelector((state: StoreState) => state.cartState)
    useEffect(() => {
        if (cart !== undefined && storeInputStates !== undefined) {
            setSum(getSumWithDelivery(storeInputStates.zone, cart) || 0)
        }
    }, [cart, storeInputStates])
    const dispatch = useDispatch()
    // When Redux input states has changed - we update our local input states
    useEffect(() => {
        if (storeInputStates !== undefined) {
            setInputStates(storeInputStates)
        }
    }, [storeInputStates])
    // When our local input states changed via child components - we update Redux input states
    // and delete/add some inputs from 'requiredInputs' array if specific selects changed
    useEffect(() => {
        if (inputStates) {
            dispatch(updateOrder(inputStates as Order))
            setHasError(checkErrors(inputStates as Order, requiredInputs))
            if (
                inputStates?.DeliveryTypeSelect?.selected?.label ===
                'На указанный адрес'
            ) {
                setRequiredInputs([
                    ...requiredInputs,
                    'StreetInput',
                    'HouseInput',
                ])
            } else {
                const newRequiredInputs = requiredInputs.filter(
                    (input) => !['StreetInput', 'HouseInput'].includes(input)
                )
                setRequiredInputs(newRequiredInputs)
            }
        }
    }, [inputStates])
    // Function that will merge our local input states with passed data,
    // this function will be passed to all our inputs and selects childs
    const setInputState = (input: keyof Order, newState: InputState): void => {
        const newInputStates = { ...inputStates }
        newInputStates[input] = { ...newInputStates[input], ...newState }
        setInputStates(newInputStates)
    }
    return (
        <div className={styles.orderDetails} style={style}>
            <div className={styles.head}>
                <h1 className={styles.head}>Оформление заказа</h1>
                <Link to="/cart">
                    <h3 className={styles.head}>Вернуться к корзине</h3>
                </Link>
            </div>
            <h4 className={styles.head}>
                Поля, отмеченные галочкой, обязательны для завершения заказа
            </h4>
            <div className={styles.inputsContainer}>
                <PhoneInput
                    inputState={inputStates?.PhoneInput}
                    setInputState={setInputState}
                />
                <NameInput
                    inputState={inputStates?.NameInput}
                    setInputState={setInputState}
                />
                <DeliveryTypeSelect
                    inputState={inputStates?.DeliveryTypeSelect}
                    setInputState={setInputState}
                />
                <StreetInput
                    inputState={inputStates?.StreetInput}
                    setInputState={setInputState}
                    isVisible={
                        inputStates?.DeliveryTypeSelect?.selected?.label ===
                        'На указанный адрес'
                    }
                />
                <HouseInput
                    inputState={inputStates?.HouseInput}
                    setInputState={setInputState}
                    isVisible={
                        inputStates?.DeliveryTypeSelect?.selected?.label ===
                        'На указанный адрес'
                    }
                />
                <ApartmentInput
                    inputState={inputStates?.ApartmentInput}
                    setInputState={setInputState}
                    isVisible={
                        inputStates?.DeliveryTypeSelect?.selected?.label ===
                        'На указанный адрес'
                    }
                />
                <EntranceInput
                    inputState={inputStates?.EntranceInput}
                    setInputState={setInputState}
                    isVisible={
                        inputStates?.DeliveryTypeSelect?.selected?.label ===
                        'На указанный адрес'
                    }
                />
                <IntercomInput
                    inputState={inputStates?.IntercomInput}
                    setInputState={setInputState}
                    isVisible={
                        inputStates?.DeliveryTypeSelect?.selected?.label ===
                        'На указанный адрес'
                    }
                />
            </div>
            <div className={styles.head} style={{ marginTop: 45 }}>
                <h1 className={styles.head}>Дополнительная информация</h1>
            </div>
            <div className={styles.inputsContainer}>
                <PersonQtySelect
                    inputState={inputStates?.PersonQtySelect}
                    setInputState={setInputState}
                />
                <TimeSelect
                    inputState={inputStates?.TimeSelect}
                    setInputState={setInputState}
                    label={
                        inputStates?.DeliveryTypeSelect?.selected?.label ===
                        'На указанный адрес'
                            ? 'Время доставки'
                            : 'Время самовывоза'
                    }
                />
                <DaySelect
                    inputState={inputStates?.DaySelect}
                    setInputState={setInputState}
                    isVisible={
                        inputStates?.TimeSelect?.selected?.label ===
                        'Ко времени'
                    }
                />
                <TimeInput
                    inputState={inputStates?.TimeInput}
                    setInputState={setInputState}
                    isVisible={
                        inputStates?.TimeSelect?.selected?.label ===
                        'Ко времени'
                    }
                />
                <PaymentSelect
                    inputState={inputStates?.PaymentSelect}
                    setInputState={setInputState}
                    isVisible={
                        inputStates?.DeliveryTypeSelect?.selected?.label ===
                        'На указанный адрес'
                    }
                />
                <CommentInput
                    inputState={inputStates?.CommentInput}
                    setInputState={setInputState}
                />
            </div>
            <div className={styles.upperInfoContainer}>
                <div className={styles.upperInfo}>
                    <h1 className={styles.upperInfo}>
                        Сумма заказа: {sum} руб
                    </h1>
                    <h4 className={styles.upperInfo}>
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
                <Link
                    to="/order-details"
                    onClick={() => {
                        setHasError(checkErrors(inputStates, requiredInputs))
                    }}
                >
                    <button className={styles.submitButton} disabled={hasError}>
                        <p className={styles.submitButton}>
                            Оформить заказ {`\u00a0`}✅
                        </p>
                    </button>
                </Link>
            </div>
            <div className={styles.upperInfoContainer}>
                <div className={styles.upperInfo}>
                    <h4 className={styles.upperInfo}>
                        Нажимая на кнопку, Вы соглашаетесь с{' '}
                        <span style={{ textDecoration: 'underline' }}>
                            Офертой, Пользовательским соглашением
                        </span>{' '}
                        и{' '}
                        <span style={{ textDecoration: 'underline' }}>
                            Политикой обработки персональных данных
                        </span>
                    </h4>
                </div>
            </div>
        </div>
    )
}

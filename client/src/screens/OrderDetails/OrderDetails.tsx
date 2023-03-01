import React, { useState, CSSProperties, useEffect } from 'react'
import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { RootState as StoreState, updateOrder } from '@/redux/store'
import { Order, InputState } from '@redux/slices/orderSlice'
import { useSelector, useDispatch } from 'react-redux'
import { checkErrors } from './functions'
import { getItemsData, getSumWithDelivery } from '@/functions'
import { ItemData, DetailedInputData } from '@/interfaces'

import styles from './OrderDetails.module.css'

import { PhoneInput } from './Inputs&Selects/1.PhoneInput'
import { NameInput } from './Inputs&Selects/2.NameInput'
import { DeliveryTypeSelect } from './Inputs&Selects/3.DeliveryTypeSelect'
import { StreetInput } from './Inputs&Selects/5.StreetInput'
import { LocalityInput } from './Inputs&Selects/4.LocalityInput'
import { HouseInput } from './Inputs&Selects/6.HouseInput'
import { ApartmentInput } from './Inputs&Selects/7.ApartmentInput'
import { EntranceInput } from './Inputs&Selects/8.EntranceInput'
import { IntercomInput } from './Inputs&Selects/9.IntercomInput'

import { PersonQtySelect } from './Inputs&Selects/10.PersonQtySelect'
import { TimeSelect } from './Inputs&Selects/11.TimeSelect'
import { DaySelect } from './Inputs&Selects/12.DaySelect'
import { TimeInput } from './Inputs&Selects/13.TimeInput'
import { PaymentSelect } from './Inputs&Selects/14.PaymentSelect'
import { ChangeSelect } from './Inputs&Selects/15.ChangeSelect'
import { CommentInput } from './Inputs&Selects/16.CommentInput'

import { Confirmation } from './components/Confirmation'
import { SuccessScreen } from './components/SuccessScreen'

interface Props {
    style?: CSSProperties
}

export const OrderDetails: FC<Props> = ({ style }) => {
    // States definition
    const [inputStates, setInputStates] = useState<
        Order | Record<keyof Order, DetailedInputData>
    >({})
    const [requiredInputs, setRequiredInputs] = useState<string[]>([
        'PhoneInput',
        'NameInput',
        'LocalityInput',
    ])
    const [hasError, setHasError] = useState<boolean>(false)
    const [sum, setSum] = useState<number>(0)
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [itemsData, setItemsData] = useState<ItemData[]>([])
    const dispatch = useDispatch()
    // Store Input States - states of inputs that retrieved from the Redux Store
    const storeInputStates = useSelector(
        (state: StoreState) => state.orderState
    )
    const cart = useSelector((state: StoreState) => state.cartState)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if (cart) {
            getItemsData(cart, setItemsData).catch(console.error)
        }
    }, [cart])

    useEffect(() => {
        if (itemsData && cart && storeInputStates) {
            setSum(
                getSumWithDelivery(storeInputStates.zone, itemsData, cart) || 0
            )
        }
    }, [itemsData, storeInputStates])

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
                const newRequiredInputs = [
                    ...requiredInputs,
                    'StreetInput',
                    'HouseInput',
                ]
                if (inputStates.zone !== 'Талдом') {
                    newRequiredInputs.push('LocalityInput')
                }
                setRequiredInputs(newRequiredInputs)
            } else {
                const newRequiredInputs = requiredInputs.filter(
                    (input) =>
                        ![
                            'LocalityInput',
                            'StreetInput',
                            'HouseInput',
                        ].includes(input)
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
    // If change in antoher input/select states needed, there is this function
    const setInputStateWithAffect = (
        newStatePart: Record<keyof Order, InputState>
    ): void => {
        const newInputStates = { ...inputStates }
        Object.entries(newStatePart).forEach(([key, value]) => {
            newInputStates[key] = { ...newInputStates[key], ...value }
        })
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
                    setInputStateWithAffect={setInputStateWithAffect}
                    setInputState={setInputState}
                />
                <LocalityInput
                    inputState={inputStates?.LocalityInput}
                    setInputState={setInputState}
                    isVisible={
                        inputStates?.DeliveryTypeSelect?.selected?.label ===
                            'На указанный адрес' &&
                        inputStates.zone !== 'Талдом'
                    }
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
                            ? 'Время доставки *'
                            : 'Время самовывоза *'
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
                <ChangeSelect
                    inputState={inputStates?.ChangeSelect}
                    setInputState={setInputState}
                    isVisible={
                        inputStates?.PaymentSelect?.selected?.label ===
                            'Наличными' &&
                        inputStates?.DeliveryTypeSelect?.selected?.label ===
                            'На указанный адрес'
                    }
                />
                <CommentInput
                    inputState={inputStates?.CommentInput}
                    setInputState={setInputState}
                />
            </div>
            <Confirmation
                sum={sum}
                inputStates={inputStates}
                setInputStates={setInputStates}
                requiredInputs={requiredInputs}
                hasError={hasError}
                setParentHasError={setHasError}
                setIsSuccess={setIsSuccess}
                cart={cart}
                storeInputStates={storeInputStates}
            />

            <SuccessScreen isSuccess={isSuccess} setIsSuccess={setIsSuccess} />
        </div>
    )
}

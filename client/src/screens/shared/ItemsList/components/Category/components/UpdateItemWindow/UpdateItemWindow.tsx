import React, { useState, useEffect } from 'react'
import type { FC } from 'react'
import axios from 'axios'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '@/firebase'
import { ItemData, ServerItemData } from '@/interfaces'
import { categoryNamesDecode, selectorsData } from '@/config'
import styles from './UpdateItemWindow.module.css'
import LoadImg from '@images/Load.png'

interface Props {
    type: string
    itemData: ItemData
    setItemData: (itemData: ItemData) => void
    isAddingItem: boolean
    setIsAddingItem: (isAddingItem: boolean) => void
    isEditingItem: boolean
    setIsEditingItem: (isAddingItem: boolean) => void
    reloadData: () => void
}

export const UpdateItemWindow: FC<Props> = ({
    type,
    itemData,
    setItemData,
    isAddingItem,
    setIsAddingItem,
    isEditingItem,
    setIsEditingItem,
    reloadData,
}) => {
    const [user, setUser] = useState<User | null>(null)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [accessDelete, setAccessDelete] = useState<boolean>(false)
    const [isDeleting, setIsDeleting] = useState<boolean>(false)

    const [initName] = useState<string>(itemData.name)
    const [image, setImage] = useState<File | null>(null)

    const [hasDescription, setHasDescription] = useState<boolean>(true)
    const [hasQty, setHasQty] = useState<boolean>(true)
    const [isNew, setIsNew] = useState<boolean>(itemData.isNew)
    const [isWok, setIsWok] = useState<boolean>(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
            return () => {
                unsubscribe()
            }
        })
    }, [])

    if (isAddingItem && isEditingItem) {
        console.error(
            'Update items error: both isAddingItem and isEditingItem is true'
        )
    }
    const categoryName =
        categoryNamesDecode[type as keyof typeof categoryNamesDecode]
    const label = isAddingItem
        ? `Добавление в категорию: ${categoryName}`
        : `Изменение товара: ${initName}`

    const handleImageChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const file = event?.target?.files ? event?.target?.files[0] : false
        if (file) {
            setImage(file)
        }
    }

    const sendToServer = async (): Promise<number> => {
        const address = isAddingItem ? '/api/items/add' : '/api/items/edit'
        const serverItemData: ServerItemData = {
            ...itemData,
            isNew,
            type,
            isActive: true,
        }
        if (!hasDescription) {
            serverItemData.description = undefined
        }
        if (!hasQty) {
            serverItemData.qty = undefined
        }
        if (isDeleting) {
            serverItemData.isActive = false
        }
        if (!['sets', 'cold-rolls', 'hot-rolls'].includes(type)) {
            serverItemData.qty = undefined
        }
        const formData = new FormData()
        const token = await user?.getIdToken()
        formData.set('idToken', token as string)
        formData.append('image', image as Blob)
        formData.append('itemData', JSON.stringify(serverItemData))
        try {
            const response = await axios.post(address, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                },
            })
            reloadData()
            return response.status
        } catch (error) {
            console.error(error)
            throw new Error()
        }
    }

    const handleSubmit = (): void => {
        setIsLoading(true)
        sendToServer()
            .then(() => {
                setIsLoading(false)
                setIsAddingItem(false)
                setIsEditingItem(false)
            })
            .catch((error) => {
                setIsLoading(false)
                setIsError(true)
                console.error(error)
            })
    }

    const handleInputChange = (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>,
        key: keyof typeof itemData
    ): void => {
        setIsError(false)
        const inputValue = event.target.value
        const newData: Record<string, string> = {}
        newData[key] = inputValue
        setItemData({ ...itemData, ...newData })
    }
    return (
        <div className={styles.windowContainer}>
            <div
                className={styles.background}
                onClick={() => {
                    setIsAddingItem(false)
                    setIsEditingItem(false)
                }}
            />
            <div className={styles.window}>
                {/* Label */}
                <h1 className={styles.window}>{label}</h1>
                {/* Image input */}
                <div className={styles.line}>
                    <h2 className={styles.window}>Выбор фотографии</h2>
                    <input
                        name="image"
                        title="Выберите фото"
                        id="imageSelect"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                {/* Name input */}
                <div className={styles.line}>
                    <h2 className={styles.window}>Название</h2>
                    <input
                        type="text"
                        className={styles.text}
                        value={itemData.name}
                        placeholder="Название товара"
                        onChange={(event) => {
                            handleInputChange(event, 'name')
                        }}
                    />
                </div>
                {/* Description input */}
                <div className={styles.line}>
                    <div className={styles.labelWithCheckbox}>
                        <h2 className={styles.window}>Описание</h2>
                        <input
                            type="checkbox"
                            style={{ transform: 'scale(1.5)' }}
                            checked={hasDescription}
                            onChange={() => {
                                setHasDescription(!hasDescription)
                            }}
                        />
                    </div>
                    <textarea
                        disabled={!hasDescription}
                        className={styles.text}
                        value={itemData.description}
                        placeholder="Ингредиенты или описание"
                        onChange={(event) => {
                            handleInputChange(event, 'description')
                        }}
                    />
                </div>
                {/* Quantity input */}
                {['sets', 'cold-rolls', 'hot-rolls'].includes(type) ? (
                    <div className={styles.line}>
                        <div className={styles.labelWithCheckbox}>
                            <h2 className={styles.window}>Количество (шт.)</h2>
                            <input
                                type="checkbox"
                                style={{ transform: 'scale(1.5)' }}
                                checked={hasQty}
                                onChange={() => {
                                    setHasQty(!hasQty)
                                }}
                            />
                        </div>
                        <div className={styles.inlineInput}>
                            <input
                                type="number"
                                disabled={!hasQty}
                                className={styles.text}
                                value={itemData.qty}
                                placeholder="8 шт."
                                onChange={(event) => {
                                    handleInputChange(event, 'qty')
                                }}
                            />
                            <p>{`\u00a0шт.`}</p>
                        </div>
                    </div>
                ) : null}
                {/* Has "New" label */}
                <div className={styles.line}>
                    <div className={styles.labelWithCheckbox}>
                        <h2
                            className={styles.window}
                        >{`Отметка "Новый товар": `}</h2>
                        <input
                            type="checkbox"
                            style={{ transform: 'scale(1.5)' }}
                            checked={isNew}
                            onChange={() => {
                                setIsNew(!isNew)
                            }}
                        />
                    </div>
                </div>
                {/* Is WOK with sause select */}
                {type === 'wok' ? (
                    <div className={styles.line}>
                        <div className={styles.labelWithCheckbox}>
                            <h2 className={styles.window}>{`Выбор соуса: `}</h2>
                            <input
                                type="checkbox"
                                style={{ transform: 'scale(1.5)' }}
                                checked={isNew}
                                onChange={() => {
                                    setIsWok(!isNew)
                                }}
                            />
                        </div>
                    </div>
                ) : null}
                {/* Price input */}
                {type === 'pizza' || (type === 'wok' && isWok) ? (
                    <>
                        <h2
                            className={styles.window}
                            style={{ width: '98%' }}
                        >{`Цена (в рублях)`}</h2>
                        {Object.entries({
                            0: '200₽',
                            1: '400₽',
                            2: '600₽',
                        }).map(([index, placeholder]) => {
                            return (
                                <div className={styles.inlinePrice} key={index}>
                                    <h2 className={styles.window}>
                                        {
                                            selectorsData[type][
                                                index as unknown as number
                                            ].title
                                        }
                                        :
                                    </h2>
                                    <input
                                        type="number"
                                        className={styles.text}
                                        value={
                                            Array.isArray(itemData.price)
                                                ? itemData.price[
                                                      index as unknown as number
                                                  ]
                                                : 0
                                        }
                                        placeholder={placeholder}
                                        onChange={(event) => {
                                            const inputValue =
                                                event.target.value
                                            const newData: Record<string, any> =
                                                {}
                                            if (Array.isArray(itemData.price)) {
                                                newData.price = [
                                                    ...itemData.price,
                                                ]
                                                newData.price[
                                                    index as unknown as number
                                                ] = inputValue
                                            }
                                            setItemData({
                                                ...itemData,
                                                ...newData,
                                            })
                                        }}
                                    />
                                    <p>{`\u00a0₽`}</p>
                                </div>
                            )
                        })}
                    </>
                ) : (
                    <div className={styles.line}>
                        <div className={styles.labelWithCheckbox}>
                            <h2
                                className={styles.window}
                            >{`Цена (в рублях)`}</h2>
                        </div>
                        <div className={styles.inlineInput}>
                            <input
                                type="number"
                                className={styles.text}
                                value={
                                    Array.isArray(itemData.price)
                                        ? 0
                                        : itemData.price
                                }
                                placeholder="500₽"
                                onChange={(event) => {
                                    if (type !== 'wok') {
                                        handleInputChange(event, 'price')
                                    } else {
                                        const price = parseInt(
                                            event.target.value
                                        )
                                        setItemData({
                                            ...itemData,
                                            price: [price, price, price],
                                        })
                                    }
                                }}
                            />
                            <p>{`\u00a0₽`}</p>
                        </div>
                    </div>
                )}
                {/* Buttons */}
                <div className={styles.buttons}>
                    <button
                        className={styles.back}
                        onClick={() => {
                            setIsAddingItem(false)
                            setIsEditingItem(false)
                        }}
                    >
                        Отмена
                    </button>
                    <button className={styles.submit} onClick={handleSubmit}>
                        {isLoading ? (
                            <img className={styles.loadImage} src={LoadImg} />
                        ) : (
                            `Сохранить`
                        )}
                    </button>
                </div>
                <p style={{ color: '#FF000A', fontSize: '14px' }}>
                    {isError
                        ? `Произошла ошибка. Пожалуйста, проверьте все поля и попробуйте снова`
                        : ``}
                </p>
                {/* Delete item */}
                {isEditingItem ? (
                    <div className={styles.line}>
                        <h3 className={styles.window}>
                            {`Для удаление введите слово "удалить"`}
                        </h3>
                        <input
                            type="text"
                            disabled={!hasQty}
                            className={styles.text}
                            value={itemData.qty}
                            placeholder=""
                            onChange={(event) => {
                                const value = event.target.value
                                const access =
                                    value.trim().toLowerCase() === 'удалить'
                                setAccessDelete(access)
                            }}
                        />
                        <button
                            className={styles.submit}
                            style={{ backgroundColor: '#FF000A' }}
                            disabled={!accessDelete}
                            onClick={() => {
                                setIsDeleting(true)
                                handleSubmit()
                            }}
                        >
                            {isLoading ? (
                                <img
                                    className={styles.loadImage}
                                    src={LoadImg}
                                />
                            ) : (
                                `Удалить`
                            )}
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

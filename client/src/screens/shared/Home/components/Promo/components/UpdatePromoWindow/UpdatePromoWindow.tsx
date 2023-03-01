import React, { useState, useContext, CSSProperties } from 'react'
import type { FC } from 'react'
import axios from 'axios'
import { domain } from '@/services/apiService/config'
import { PromoData } from '@/interfaces'
import { UserContext } from '@/screens/shared/Home/Home'
import styles from './UpdatePromoWindow.module.css'
import LoadImg from '@images/Load.png'

interface Props {
    currentPromoData: PromoData
    setCurrentPromoData: (promoData: PromoData) => void
    isAddingPromo: boolean
    setIsAddingPromo: (isAddingPromo: boolean) => void
    isEditingPromo: boolean
    setIsEditingPromo: (isEditingPromo: boolean) => void
    reloadData: () => void
    style?: CSSProperties
}

export const UpdatePromoWindow: FC<Props> = ({
    currentPromoData,
    setCurrentPromoData,
    isAddingPromo,
    setIsAddingPromo,
    isEditingPromo,
    setIsEditingPromo,
    reloadData,
    style,
}) => {
    const [image, setImage] = useState<File | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [accessDelete, setAccessDelete] = useState<boolean>(false)
    const [hasError, setHasError] = useState<boolean>(false)
    const [isNew, setIsNew] = useState<boolean>(currentPromoData.isNew)
    const label = isAddingPromo ? `Добавление акции` : `Редактирование акции`

    const user = useContext(UserContext)

    const handleImageChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const file = event?.target?.files ? event?.target?.files[0] : false
        if (file) {
            setImage(file)
        }
    }

    const handleInputChange = (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>,
        key: keyof PromoData
    ): void => {
        setHasError(false)
        const inputValue = event.target.value
        setCurrentPromoData({ ...currentPromoData, [key]: inputValue })
    }

    const handleSubmit = (): void => {
        setIsLoading(true)
        sendToServer()
            .then(() => {
                setIsLoading(false)
                setIsAddingPromo(false)
                setIsEditingPromo(false)
            })
            .catch((error) => {
                setIsLoading(false)
                setHasError(true)
                console.error(error)
            })
    }

    const handleDelete = (): void => {
        setIsLoading(true)
        user?.getIdToken()
            .then((token) => {
                axios
                    .post(`${domain}/api/promos/delete`, {
                        promoId: currentPromoData.id,
                        idToken: token,
                    })
                    .then(() => {
                        setIsLoading(false)
                        setIsAddingPromo(false)
                        setIsEditingPromo(false)
                        reloadData()
                    })
                    .catch((error) => {
                        setIsLoading(false)
                        setHasError(true)
                        console.error(error)
                    })
            })
            .catch((error) => {
                setIsLoading(false)
                setHasError(true)
                console.error(error)
            })
    }

    const sendToServer = async (): Promise<number> => {
        const address = isAddingPromo ? '/api/promos/add' : '/api/promos/edit'
        const serverPromoData = {
            ...currentPromoData,
            isNew,
            isActive: true,
        }
        const formData = new FormData()
        const token = await user?.getIdToken()
        formData.set('idToken', token as string)
        formData.append('image', image as Blob)
        formData.append('promoData', JSON.stringify(serverPromoData))
        try {
            const response = await axios.post(`${domain}${address}`, formData, {
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

    return (
        <div className={styles.windowContainer} style={style}>
            <div
                className={styles.background}
                onClick={() => {
                    setIsAddingPromo(false)
                    setIsEditingPromo(false)
                }}
            />
            <div className={styles.window}>
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
                        value={currentPromoData.name}
                        placeholder="Название акции"
                        onChange={(event) => {
                            handleInputChange(event, 'name')
                        }}
                    />
                </div>
                {/* Description input */}
                <div className={styles.line}>
                    <h2 className={styles.window}>Описание</h2>
                    <textarea
                        className={styles.text}
                        value={currentPromoData.description}
                        placeholder="Описание акции"
                        onChange={(event) => {
                            handleInputChange(event, 'description')
                        }}
                    />
                </div>
                {/* Has "New" label */}
                <div className={styles.line}>
                    <div className={styles.labelWithCheckbox}>
                        <h2
                            className={styles.window}
                        >{`Отметка "Новая акция": `}</h2>
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
                {/* Buttons */}
                <div className={styles.buttons}>
                    <button
                        className={styles.back}
                        onClick={() => {
                            setIsAddingPromo(false)
                            setIsEditingPromo(false)
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
                    {hasError
                        ? isAddingPromo
                            ? `Произошла ошибка. Пожалуйста, проверьте все поля и попробуйте снова`
                            : `Произошла ошибка. Пожалуйста, попробуйте ещё раз`
                        : ``}
                </p>
                {/* Delete item */}
                {isEditingPromo ? (
                    <div className={styles.line}>
                        <h3 className={styles.window}>
                            {`Для удаление введите слово "удалить"`}
                        </h3>
                        <input
                            type="text"
                            className={styles.text}
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
                            onClick={handleDelete}
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

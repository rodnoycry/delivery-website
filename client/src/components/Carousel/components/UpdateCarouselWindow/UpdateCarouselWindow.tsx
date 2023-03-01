import React, { useState, CSSProperties } from 'react'
import type { FC } from 'react'
import axios from 'axios'
import { domain } from '@/services/apiService/config'
import { CarouselData } from '@/interfaces'
import styles from './UpdateCarouselWindow.module.css'
import LoadImg from '@images/Load.png'
import { User } from 'firebase/auth'

interface Props {
    user: User | null
    carouselData: CarouselData
    isAdding: boolean
    setIsAdding: (isAdding: boolean) => void
    isEditing: boolean
    setIsEditing: (isEditing: boolean) => void
    reloadData: () => void
    style?: CSSProperties
}

export const UpdateCarouselWindow: FC<Props> = ({
    user,
    carouselData,
    isAdding,
    setIsAdding,
    isEditing,
    setIsEditing,
    reloadData,
    style,
}) => {
    const [image, setImage] = useState<File | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [accessDelete, setAccessDelete] = useState<boolean>(false)
    const [hasError, setHasError] = useState<boolean>(false)
    const label = isAdding ? `Добавление баннера` : `Изменение баннера`
    const handleImageChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const file = event?.target?.files ? event?.target?.files[0] : false
        if (file) {
            setImage(file)
        }
    }
    const handleSubmit = (): void => {
        setIsLoading(true)
        sendToServer()
            .then(() => {
                setIsLoading(false)
                setIsAdding(false)
                setIsEditing(false)
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
                    .post(`${domain}/api/carousels/delete`, {
                        carouselId: carouselData.id,
                        idToken: token,
                    })
                    .then(() => {
                        setIsLoading(false)
                        setIsAdding(false)
                        setIsEditing(false)
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
        const address = isAdding ? '/api/carousels/add' : '/api/carousels/edit'
        const serverCarouselsData = {
            ...carouselData,
            isActive: true,
        }
        const formData = new FormData()
        const token = await user?.getIdToken()
        formData.set('idToken', token as string)
        formData.append('image', image as Blob)
        formData.append('carouselData', JSON.stringify(serverCarouselsData))
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
                    setIsAdding(false)
                    setIsEditing(false)
                }}
            />
            <div className={styles.window}>
                <h1 className={styles.window}>{label}</h1>
                {/* Image input */}
                <div className={styles.line}>
                    <h2
                        className={styles.window}
                    >{`Выбор фотографии (1200x430)`}</h2>
                    <input
                        name="image"
                        title="Выберите фото"
                        id="imageSelect"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                {/* Buttons */}
                <div className={styles.buttons}>
                    <button
                        className={styles.back}
                        onClick={() => {
                            setIsAdding(false)
                            setIsEditing(false)
                        }}
                    >
                        {`Отмена`}
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
                        ? isAdding
                            ? `Произошла ошибка. Пожалуйста, проверьте все поля и попробуйте снова`
                            : `Произошла ошибка. Пожалуйста, попробуйте ещё раз`
                        : ``}
                </p>
                {/* Delete item */}
                {isEditing ? (
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

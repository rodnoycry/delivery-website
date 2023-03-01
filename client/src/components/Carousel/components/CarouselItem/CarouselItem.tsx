import React, { useState, useEffect } from 'react'
import type { FC } from 'react'
import { CarouselData } from '@/interfaces'
import styles from '../../Carousel.module.css'
import { domain } from '@/services/apiService/config'

import EditImg from './images/Edit.png'
import AddImg from './images/Add.png'

interface Props {
    carouselData: CarouselData
    index: number
    isAdmin: boolean
    setCurrentCarouselData: (carouselData: CarouselData) => void
    setIsEditing: (isEditing: boolean) => void
    setIsAdding: (isAdding: boolean) => void
}

export const CarouselItem: FC<Props> = ({
    carouselData: parentCarouselData,
    index,
    isAdmin,
    setCurrentCarouselData,
    setIsEditing,
    setIsAdding,
}) => {
    const [carouselData, setCarouselData] =
        useState<CarouselData>(parentCarouselData)
    useEffect(() => {
        setCarouselData(parentCarouselData)
    }, [parentCarouselData])
    console.log(index)
    return (
        <div className="each-slide-effect" key={index} id={`slide-${index}`}>
            <div className={styles.item}>
                <img
                    className={styles.item}
                    src={`${domain}${carouselData.image}`}
                />
                {isAdmin ? (
                    <div className={styles.admin}>
                        <button
                            className={styles.admin}
                            onClick={() => {
                                setCurrentCarouselData(carouselData)
                                setIsEditing(true)
                            }}
                        >
                            <img className={styles.adminEdit} src={EditImg} />
                        </button>
                        <button
                            className={styles.admin}
                            onClick={() => {
                                setIsAdding(true)
                            }}
                        >
                            <img className={styles.adminAdd} src={AddImg} />
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

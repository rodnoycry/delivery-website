import React, { useState } from 'react'
import type { FC, RefObject } from 'react'
import { SnapItem, useScroll, useDragToScroll } from 'react-snaplist-carousel'
import styles from './PromoItem.module.css'

interface Props {
    id: number
    name: string
    description: string
    image: string
    isNew: boolean
    isLast: boolean
    snapList: RefObject<HTMLDivElement>
}

export const PromoItem: FC<Props> = ({
    id,
    name,
    description,
    image,
    isNew,
    isLast,
    snapList,
}) => {
    const goToSnapItem = useScroll({ ref: snapList })
    useDragToScroll({ ref: snapList })
    const [isHovered, setIsHovered] = useState(false)
    const margin = isLast ? '0' : '30px'
    return (
        <SnapItem margin={{ right: margin }} snapAlign="center">
            <div
                className={styles.promo}
                onClick={() => {
                    goToSnapItem(id)
                }}
                onMouseEnter={() => {
                    setIsHovered(true)
                }}
                onMouseLeave={() => {
                    setIsHovered(false)
                }}
            >
                <img
                    className={`${styles.promo as string} ${
                        styles.selector as string
                    }`}
                    src={image}
                />
                <div
                    className={styles.promoTip}
                    style={{
                        top: isHovered ? '0' : '100%',
                        // top: '0',
                    }}
                >
                    <div className={styles.descriptionContainer}>
                        <h1 className={styles.descriptionContainer}>{name}</h1>
                        <p className={styles.descriptionContainer}>
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </SnapItem>
    )
}

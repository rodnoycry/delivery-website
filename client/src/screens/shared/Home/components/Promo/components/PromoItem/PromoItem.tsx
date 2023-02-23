import React, { useState, useContext, CSSProperties } from 'react'
import type { FC, RefObject } from 'react'
import { SnapItem, useScroll, useDragToScroll } from 'react-snaplist-carousel'
import { PromoData } from '@/interfaces'
import styles from './PromoItem.module.css'
import { IsAdminContext } from '../../../../Home'
import EditImage from './images/Edit.png'

interface Props {
    id: number
    name: string
    description: string
    image: string
    isNew: boolean
    isLast: boolean
    snapList: RefObject<HTMLDivElement>
    setIsEditing?: (isEditing: boolean) => void
    setCurrentPromoData?: (currentPromoData: PromoData) => void
    style?: CSSProperties
}

export const PromoItem: FC<Props> = ({
    id,
    name,
    description,
    image,
    isNew,
    isLast,
    snapList,
    setIsEditing,
    setCurrentPromoData,
    style,
}) => {
    const isAdmin = useContext(IsAdminContext)
    const goToSnapItem = useScroll({ ref: snapList })
    useDragToScroll({ ref: snapList })
    const [isHovered, setIsHovered] = useState(false)
    const margin = isLast && !isAdmin ? '0' : '30px'
    return (
        <SnapItem margin={{ right: margin }} snapAlign="center">
            <div
                className={styles.promo}
                style={style}
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
                {isAdmin ? (
                    <button
                        className={styles.adminEdit}
                        onClick={() => {
                            if (setCurrentPromoData && setIsEditing) {
                                setIsEditing(true)
                                setCurrentPromoData({
                                    id,
                                    name,
                                    description,
                                    image,
                                    isNew,
                                })
                            }
                        }}
                    >
                        <img className={styles.adminEdit} src={EditImage} />
                    </button>
                ) : null}
                {isNew ? <div className={styles.newLabel}>New</div> : null}
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

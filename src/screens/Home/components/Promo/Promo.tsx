import React, { useRef } from 'react'
import type { FC } from 'react'
import { SnapList } from 'react-snaplist-carousel'
import { PromoItem } from './components/PromoItem'
import styles from './Promo.module.css'
import { promoData } from './promoData'

interface promoDataItem {
    id: number
    name: string
    description: string
    image: string
    isNew: boolean
}

export const Promo: FC = () => {
    const snapList = useRef(null)

    return (
        <div className={styles.promoContainer}>
            <h1 className="category">Акции</h1>
            <SnapList
                className={styles.promoSnapList}
                direction="horizontal"
                ref={snapList}
            >
                {promoData.map((props: promoDataItem): JSX.Element => {
                    const isLast = props.id === promoData.at(-1)?.id
                    return (
                        <>
                            <PromoItem
                                key={props.id}
                                {...props}
                                snapList={snapList}
                                isLast={isLast}
                            />
                        </>
                    )
                })}
            </SnapList>
        </div>
    )
}

import React, { useRef } from 'react'
import type { FC } from 'react'
import {
    SnapList,
    SnapItem,
    useScroll,
    useDragToScroll,
} from 'react-snaplist-carousel'
import styles from './Promo.module.css'
import { promoData } from './promoData'

export const Promo: FC = () => {
    const snapList = useRef(null)
    const goToSnapItem = useScroll({ ref: snapList })
    useDragToScroll({ ref: snapList })

    return (
        <div className={styles.promoContainer}>
            <h1 className={styles.promo}>Акции</h1>
            <SnapList direction="horizontal" ref={snapList}>
                {promoData.map(
                    ({ id, name, description, image, isNew }): JSX.Element => {
                        const margin =
                            id === promoData.at(-1)?.id ? '0' : '30px'
                        return (
                            <SnapItem
                                margin={{ right: margin }}
                                snapAlign="center"
                                key={id}
                            >
                                <div
                                    onClick={() => {
                                        goToSnapItem(id)
                                    }}
                                    className={styles.promo}
                                >
                                    <img
                                        className={`${styles.promo as string} ${
                                            styles.selector as string
                                        }`}
                                        src={image}
                                    />
                                </div>
                            </SnapItem>
                        )
                    }
                )}
            </SnapList>
        </div>
    )
}

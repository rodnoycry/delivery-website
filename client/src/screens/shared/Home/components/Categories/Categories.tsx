import React, { useContext } from 'react'
import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { IsAdminContext } from '../../Home'
import styles from './Categories.module.css'
import { categoriesData } from './categoriesData'

interface Props {
    style?: object
}

export const Categories: FC<Props> = ({ style }) => {
    const isAdmin = useContext(IsAdminContext)
    const pathPrefix = isAdmin ? '/admin/editing' : ''
    return (
        <div className={styles.categories} style={style}>
            <h1 className="category">Еда на заказ</h1>
            <ul className={styles.categories}>
                {categoriesData.map(({ name, image, to }) => {
                    return (
                        <Link to={`${pathPrefix}${to}`} key={name}>
                            <li
                                className={styles.categories}
                                style={{
                                    backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 21.35%, rgba(0, 0, 0, 0.8) 100%), url(${image})`,
                                }}
                            >
                                <h1 className={styles.categories}>{name}</h1>
                            </li>
                        </Link>
                    )
                })}
            </ul>
        </div>
    )
}

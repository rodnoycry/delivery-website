import React from 'react'
import type { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './NavBar.module.css'
import { linksObject } from './links'

interface Props {
    style?: object
}

export const NavBar: FC<Props> = ({ style }) => {
    const location = useLocation()
    const currentPath = location.pathname
    return !currentPath.startsWith('/admin') ? (
        <nav style={style}>
            {Object.entries(linksObject).map(([link, label]): JSX.Element => {
                return (
                    <Link to={link} key={link}>
                        <button
                            className={styles.link}
                            style={
                                currentPath === link
                                    ? {
                                          backgroundColor: '#FAFAFA',
                                          color: '#000',
                                      }
                                    : {}
                            }
                        >
                            {label}
                        </button>
                    </Link>
                )
            })}
        </nav>
    ) : null
}

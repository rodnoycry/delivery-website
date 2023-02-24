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
    const isAdmin = currentPath.startsWith('/admin/editing')
    let shouldShow = true

    if (currentPath.startsWith('/admin')) {
        if (isAdmin) {
            shouldShow = true
        } else {
            shouldShow = false
        }
    }

    const linkPrefix = isAdmin ? '/admin/editing' : ''

    return shouldShow ? (
        <nav style={style}>
            {Object.entries(linksObject).map(([link, label]): JSX.Element => {
                return (
                    <Link to={`${linkPrefix}${link}`} key={link}>
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

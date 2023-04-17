import React, { useState, useEffect, createContext } from 'react'
import type { FC } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import type { User } from 'firebase/auth'
import axios from 'axios'
import { auth } from '@/firebase'
import { PromoData } from '@/interfaces'
import { domain } from '@/services/apiService/config'
import { Promo } from './components/Promo'
import { Categories } from './components/Categories'
import styles from './Home.module.css'

interface Props {
    isAdmin: boolean
    search: string
    resetSearch: () => void
    style?: object
}

export const IsAdminContext = createContext<boolean>(false)
export const UserContext = createContext<User | null>(null)

export const Home: FC<Props> = ({ isAdmin, search, resetSearch, style }) => {
    const [user, setUser] = useState<User | null>(null)
    const [promosData, setPromosData] = useState<PromoData[]>([])
    const appearanceStyle = search ? { display: 'none' } : {}

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
        })
        return () => {
            unsubscribe()
        }
    }, [])

    useEffect(() => {
        reloadData()
    }, [])

    const reloadData = (): void => {
        axios
            .post(`${domain}/api/promos/get`)
            .then((response) => {
                setPromosData(response.data)
            })
            .catch((error) => {
                console.error(error)
                setPromosData([])
            })
    }

    return (
        <UserContext.Provider value={user}>
            <IsAdminContext.Provider value={isAdmin}>
                <div
                    className={styles.homeContainer}
                    style={{ ...style, ...appearanceStyle }}
                >
                    <Promo promosData={promosData} reloadData={reloadData} />
                    <Categories
                        resetSearch={resetSearch}
                        style={{ marginTop: '30px' }}
                    />
                </div>
            </IsAdminContext.Provider>
        </UserContext.Provider>
    )
}

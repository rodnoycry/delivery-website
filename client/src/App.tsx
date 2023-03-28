import React, { useState, useEffect, createContext } from 'react'
import type { FC } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import axios from 'axios'

import { onAuthStateChanged } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { auth } from '@/firebase'

import { CarouselData } from './interfaces'
import { getUserCart, getUserData } from './services/apiService'
import { domain } from './services/apiService/config'

import './reset.module.css'
import {
    setCart as setReduxCart,
    updateOrder as updateReduxOrder,
    setLocalOrdersData,
    updateUserState,
} from './redux/store'
import styles from './App.module.css'
import { topItemsAppearancePaths, categoriesPaths } from './config'

import { Header } from './components/Header'
import { HomeCarousel } from './components/Carousel'
import { NavBar } from './components/NavBar'
import { Search } from './components/Search'
import { UserHome } from './screens/UserHome'
import { UserItemsList } from './screens/UserItemsList'
import { MyOrders } from './screens/MyOrders'

import { Cart } from './screens/Cart'
import { OrderDetails } from './screens/OrderDetails'

import { Footer } from './components/Footer'

import { Admin } from './screens/adminPages/Admin'
import { Panel as AdminPanel } from './screens/adminPages/Panel/Panel'
import { AdminHome } from './screens/adminPages/AdminHome'
import { AdminItemsList } from './screens/adminPages/AdminItemsList'
import { Test } from './screens/Test'

// Legal pages
import { Offer } from './screens/legal/Offer'
import { Terms } from './screens/legal/Terms'
import { DataPolicy } from './screens/legal/DataPolicy'

// Windows
import { AuthWindow } from './screens/_windows/AuthWindow'

export const UserContext = createContext<User | null>(null)

export const App: FC = () => {
    const [user, setUser] = useState<User | null>(null)

    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)

                // Getting user data from server, create user in db if not exists
                const getUserDataFromServer = async (
                    user: User
                ): Promise<void> => {
                    try {
                        const token = await user.getIdToken()
                        const displayName = user?.displayName
                            ? user.displayName
                            : undefined
                        const userData = await getUserData(token, displayName)
                        dispatch(
                            updateUserState({
                                isLoggedIn: true,
                                displayName: userData?.displayName,
                                phone: userData?.phone,
                                email: userData?.email,
                            })
                        )
                        // Update local input states with user input states
                        if (userData?.inputStates) {
                            dispatch(updateReduxOrder(userData.inputStates))
                        }
                        // Update local cart with db user data
                        const cart = await getUserCart(token)
                        dispatch(setReduxCart(cart))
                    } catch (error) {
                        console.error(error)
                        throw new Error(`App.tsx: getUserDataFromServer error`)
                    }
                }
                getUserDataFromServer(user).catch(console.error)
            } else {
                dispatch(
                    updateUserState({
                        isLoggedIn: false,
                    })
                )
                setUser(null)
            }
        })
        return () => {
            unsubscribe()
        }
    }, [])

    // Create cookie sessionId if not exists
    const [cookies, setCookie] = useCookies(['sessionId'])

    useEffect(() => {
        if (!cookies?.sessionId) {
            const sessionId = Math.random().toString(36).substring(2)
            setCookie('sessionId', sessionId)
        }
    }, [cookies])

    const [search, setSearch] = useState<string>('')
    const [isCartStoreLoaded, setIsCartStoreLoaded] = useState<boolean>(false)
    const [isOrderStoreLoaded, setIsOrderStoreLoaded] = useState<boolean>(false)
    const localStorageStore = {
        cart: window.localStorage.getItem('cart'),
        order: window.localStorage.getItem('order'),
        localOrdersData: window.localStorage.getItem('localOrdersData'),
    }
    const [carouselsData, setCarouselsData] = useState<CarouselData[]>([])

    const reloadCarouselData = (): void => {
        axios
            .post(`${domain}/api/carousels/get`)
            .then((response) => {
                setCarouselsData(response.data)
            })
            .catch((error) => {
                console.error(error)
                setCarouselsData([])
            })
    }

    useEffect(() => {
        reloadCarouselData()
    }, [])

    useEffect(() => {
        if (localStorageStore.cart && !isCartStoreLoaded) {
            dispatch(setReduxCart(JSON.parse(localStorageStore.cart)))
            setIsCartStoreLoaded(true)
        }
        if (localStorageStore.order && !isOrderStoreLoaded) {
            dispatch(updateReduxOrder(JSON.parse(localStorageStore.order)))
            setIsOrderStoreLoaded(true)
        }
        if (localStorageStore.localOrdersData && !isOrderStoreLoaded) {
            dispatch(
                setLocalOrdersData(
                    JSON.parse(localStorageStore.localOrdersData)
                )
            )
            setIsOrderStoreLoaded(true)
        }
    }, [localStorageStore])
    return (
        <Router>
            <UserContext.Provider value={user}>
                {/* Windows */}
                <AuthWindow />
                {/* Main */}
                <div className={styles.main}>
                    <Header />
                    <hr className={styles.hr} />
                    {/* <h1 className={styles.dontAcceptOrders}>
                    {`Извините, сегодня (8 марта), мы больше не принимаем заказы, приносим извинения за предоставленные неудобства!`}
                </h1> */}
                    {carouselsData.length > 0 ? (
                        <HomeCarousel
                            user={user}
                            carouselsData={carouselsData}
                            reloadData={reloadCarouselData}
                            appearancePaths={topItemsAppearancePaths}
                        />
                    ) : null}
                    <NavBar
                        resetSearch={() => {
                            setSearch('')
                        }}
                        style={{ marginTop: '10px' }}
                    />
                    <Search
                        search={search}
                        setSearch={setSearch}
                        appearancePaths={topItemsAppearancePaths}
                    />
                    <Switch>
                        <Route exact path="/">
                            <UserHome
                                style={{ marginTop: '30px' }}
                                resetSearch={() => {
                                    setSearch('')
                                }}
                                search={search.trim()}
                            />
                            {search.trim() ? (
                                <UserItemsList search={search} />
                            ) : null}
                        </Route>

                        <Route exact path="/my-orders">
                            <MyOrders />
                        </Route>

                        {/* TEST */}
                        <Route exact path="/test">
                            <Test />
                        </Route>

                        <Route exact path="/promo">
                            <span>1</span>
                        </Route>

                        {/* Categories of items */}
                        {categoriesPaths.map((path) => {
                            return (
                                <Route exact path={`${path}`} key={path}>
                                    <UserItemsList search={search} />
                                </Route>
                            )
                        })}

                        {/* Cart */}
                        <Route exact path="/cart">
                            <Cart />
                        </Route>

                        {/* Order related */}
                        <Route exact path="/order-details">
                            <OrderDetails />
                        </Route>

                        {/* Admin */}
                        <Route exact path="/admin">
                            <Admin />
                        </Route>
                        <Route exact path="/admin/panel">
                            <AdminPanel />
                        </Route>
                        <Route exact path="/admin/editing">
                            <AdminHome
                                style={{ marginTop: '30px' }}
                                search={search.trim()}
                            />
                        </Route>

                        {categoriesPaths.map((path) => {
                            return (
                                <Route
                                    exact
                                    path={`/admin/editing${path}`}
                                    key={path}
                                >
                                    <AdminItemsList />
                                </Route>
                            )
                        })}

                        {/* Legal links */}
                        <Route exact path="/offer">
                            <Offer />
                        </Route>
                        <Route exact path="/terms">
                            <Terms />
                        </Route>
                        <Route exact path="/policy">
                            <DataPolicy />
                        </Route>
                    </Switch>
                </div>
                <Footer />
            </UserContext.Provider>
        </Router>
    )
}

import React, { useState, useEffect, createContext, Suspense } from 'react'
import type { FC } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import io from 'socket.io-client'

import { onAuthStateChanged } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { auth } from '@/firebase'

import { CarouselData } from './interfaces'
import { domain } from './services/apiService/config'
import { getItems } from './services/apiService'
import { getUserDataFromServerCSI } from './services/crossStoragesIntegration'

import { isProd, topItemsAppearancePaths, categoriesPaths } from './config'

import './reset.module.css'
import {
    setCart as setReduxCart,
    updateInputStates as updateReduxInputStates,
    setLocalOrdersData,
    updateUserState,
    clearUserData,
    setUserOrders,
    setItemsData,
} from './redux/store'
import styles from './App.module.css'

import { Header } from './components/Header'
import { HomeCarousel } from './components/Carousel'
import { NavBar } from './components/NavBar'
import { Search } from './components/Search'
import { UserHome } from './screens/_HOCs/UserHome'
import { UserItemsList } from './screens/_HOCs/UserItemsList'
import { Profile } from './screens/Profile'
import { MyOrders } from './screens/MyOrders'

import { Cart } from './screens/Cart'
import { OrderDetails } from './screens/OrderDetails'

import { Footer } from './components/Footer'

import { Admin } from './screens/_adminPages/Admin'
import { Panel as AdminPanel } from './screens/_adminPages/Panel/Panel'
import { AdminHome } from './screens/_adminPages/AdminHome'
import { AdminItemsList } from './screens/_adminPages/AdminItemsList'

// Legal pages
import { Offer } from './screens/legal/Offer'
import { Terms } from './screens/legal/Terms'
import { DataPolicy } from './screens/legal/DataPolicy'

// Windows
import { AuthWindow } from './components/_windows/AuthWindow'

export const UserContext = createContext<User | null>(null)

export const App: FC = () => {
    const [user, setUser] = useState<User | null>(null)

    const dispatch = useDispatch()
    // Local storage loading
    const [isCartStoreLoaded, setIsCartStoreLoaded] = useState<boolean>(false)
    const [isOrderStoreLoaded, setIsOrderStoreLoaded] = useState<boolean>(false)
    const localStorageStore = {
        cart: window.localStorage.getItem('cart'),
        order: window.localStorage.getItem('inputStates'),
        localOrdersData: window.localStorage.getItem('localOrdersData'),
    }

    // Update redux cart data, order inputs data, saved orders data
    // from localStorage
    useEffect(() => {
        if (localStorageStore.cart && !isCartStoreLoaded) {
            dispatch(setReduxCart(JSON.parse(localStorageStore.cart)))
            setIsCartStoreLoaded(true)
        }
        if (localStorageStore.order && !isOrderStoreLoaded) {
            dispatch(
                updateReduxInputStates(JSON.parse(localStorageStore.order))
            )
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

    // On login user, updating local data in redux to current user info
    const [isAuthTracking, setIsAuthTracking] = useState<boolean>(false)

    useEffect(() => {
        if (localStorageStore.order === undefined) {
            return
        }
        if (isAuthTracking) {
            return
        }
        let timerId: NodeJS.Timer | null = null
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                const inputStates = localStorageStore.order
                const cart = localStorageStore.cart
                const socket = io(
                    isProd
                        ? 'http://your_domain.com'
                        : 'http://localhost:3000',
                    {
                        withCredentials: true,
                    }
                )
                user.getIdToken(true)
                    .then((token) => {
                        // Connect to the Socket.io of server
                        const sendIdTokenToServer = (): void => {
                            socket.send(
                                JSON.stringify({
                                    type: 'getUserOrders',
                                    idToken: token,
                                })
                            )
                        }
                        sendIdTokenToServer()
                        timerId = setInterval(() => {
                            sendIdTokenToServer()
                        }, 55 * 60 * 1000)
                        setIsAuthTracking(true)
                    })
                    .catch(console.error)
                // Listen for the orders data message from the server and save it in redux
                socket.on('userOrders', (orders) => {
                    dispatch(setUserOrders(orders))
                })
                // Getting user data from server, create user in db if not exists
                getUserDataFromServerCSI(user, inputStates, cart, dispatch)
                    .then(() => {
                        // To not duplicate user listener
                        setIsAuthTracking(true)
                    })
                    .catch(console.error)
            } else {
                dispatch(clearUserData())
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
            if (timerId) {
                clearInterval(timerId)
            }
        }
    }, [])

    // We need to store items data to use it on items pages and to
    // calculate sums of orders
    useEffect(() => {
        getItems()
            .then((items) => {
                dispatch(setItemsData(items))
            })
            .catch(console.error)
    }, [])

    // Create cookie sessionId if not exists
    const [cookies, setCookie] = useCookies(['sessionId'])

    useEffect(() => {
        if (!cookies?.sessionId) {
            const sessionId = Math.random().toString(36).substring(2)
            setCookie('sessionId', sessionId)
        }
    }, [cookies])

    // Initialize search input
    const [search, setSearch] = useState<string>('')

    // Control over main page carousel
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

    return (
        <Router>
            <UserContext.Provider value={user}>
                {/* Windows */}
                <AuthWindow />
                {/* Main */}
                <div className={styles.main}>
                    <Header />
                    <hr className={styles.hr} />
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

                        <Route exact path="/profile">
                            <Suspense>
                                <Profile />
                            </Suspense>
                        </Route>

                        {/* Saved in localStorage orders, currently unsupported */}
                        <Route exact path="/my-orders">
                            <MyOrders />
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
                            <Suspense>
                                <OrderDetails />
                            </Suspense>
                        </Route>

                        {/* Admin */}
                        <Route exact path="/admin">
                            <Suspense>
                                <Admin />
                            </Suspense>
                        </Route>

                        <Route exact path="/admin/panel">
                            <Suspense>
                                <AdminPanel />
                            </Suspense>
                        </Route>

                        <Route exact path="/admin/editing">
                            <Suspense>
                                <AdminHome
                                    style={{ marginTop: '30px' }}
                                    search={search.trim()}
                                />
                            </Suspense>
                        </Route>

                        {categoriesPaths.map((path) => {
                            return (
                                <Route
                                    exact
                                    path={`/admin/editing${path}`}
                                    key={path}
                                >
                                    <Suspense>
                                        <AdminItemsList />
                                    </Suspense>
                                </Route>
                            )
                        })}

                        {/* Legal links */}
                        <Route exact path="/offer">
                            <Suspense>
                                <Offer />
                            </Suspense>
                        </Route>
                        <Route exact path="/terms">
                            <Suspense>
                                <Terms />
                            </Suspense>
                        </Route>
                        <Route exact path="/policy">
                            <Suspense>
                                <DataPolicy />
                            </Suspense>
                        </Route>
                    </Switch>
                </div>
                <Footer />
            </UserContext.Provider>
        </Router>
    )
}

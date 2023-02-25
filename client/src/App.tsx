import React, { useState, useEffect } from 'react'
import type { FC } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import './reset.module.css'
import {
    setCart as setReduxCart,
    updateOrder as updateReduxOrder,
} from './redux/store'
import styles from './App.module.css'
import { topItemsAppearancePaths, categoriesPaths } from './config'

import { Header } from './components/Header'
import { HomeCarousel } from './components/Carousel'
import { NavBar } from './components/NavBar'
import { Search } from './components/Search'
import { UserHome } from './screens/UserHome'
import { UserItemsList } from './screens/UserItemsList'

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

export const App: FC = () => {
    const [search, setSearch] = useState<string>('')
    const [isCartStoreLoaded, setIsCartStoreLoaded] = useState<boolean>(false)
    const [isOrderStoreLoaded, setIsOrderStoreLoaded] = useState<boolean>(false)
    const localStorageStore = {
        cart: window.localStorage.getItem('cart'),
        order: window.localStorage.getItem('order'),
    }
    const dispatch = useDispatch()
    useEffect(() => {
        if (localStorageStore.cart && !isCartStoreLoaded) {
            dispatch(setReduxCart(JSON.parse(localStorageStore.cart)))
            setIsCartStoreLoaded(true)
        }
        if (localStorageStore.order && !isOrderStoreLoaded) {
            dispatch(updateReduxOrder(JSON.parse(localStorageStore.order)))
            setIsOrderStoreLoaded(true)
        }
    }, [localStorageStore])
    return (
        <Router>
            <div className={styles.main}>
                <Header />
                <hr
                    style={{
                        width: '1200px',
                        border: '1px solid #313131',
                        marginTop: '90px',
                    }}
                />
                <HomeCarousel appearancePaths={topItemsAppearancePaths} />
                <NavBar style={{ marginTop: '10px' }} />
                <Search
                    search={search}
                    setSearch={setSearch}
                    appearancePaths={topItemsAppearancePaths}
                />
                <Switch>
                    <Route exact path="/">
                        <UserHome
                            style={{ marginTop: '30px' }}
                            search={search.trim()}
                        />
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
                        <AdminHome />
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
        </Router>
    )
}

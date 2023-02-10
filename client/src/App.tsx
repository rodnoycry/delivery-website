import React, { useEffect } from 'react'
import type { FC } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'

import './reset.module.css'
import {
    setCart as setReduxCart,
    updateOrder as updateReduxOrder,
} from '@redux/store'
import styles from './App.module.css'
import { topItemsAppearancePaths } from './config'

import { Header } from './components/Header'
import { HomeCarousel } from './components/Carousel'
import { NavBar } from './components/NavBar'
import { Search } from './components/Search'
import { Home } from './screens/Home'
import { ItemsList } from './screens/ItemsList'

import { Cart } from './screens/Cart'
import { OrderDetails } from './screens/OrderDetails'

import { Footer } from './components/Footer'

export const App: FC = () => {
    const [cookies, setCart] = useCookies(['cart', 'order'])
    const dispatch = useDispatch()
    useEffect(() => {
        if (cookies.cart !== undefined) {
            dispatch(setReduxCart(cookies.cart))
        }
        if (cookies.order !== undefined) {
            dispatch(updateReduxOrder(cookies.order))
        }
    }, [cookies])
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
                <Search appearancePaths={topItemsAppearancePaths} />
                <Switch>
                    <Route exact path="/">
                        <Home style={{ marginTop: '30px' }} />
                    </Route>
                    <Route exact path="/promo">
                        <span>1</span>
                    </Route>
                    <Route exact path="/sets">
                        <ItemsList path="/sets" />
                    </Route>
                    <Route exact path="/pizza">
                        <ItemsList path="/pizza" />
                    </Route>
                    <Route exact path="/cold-rolls">
                        <span>4</span>
                    </Route>
                    <Route exact path="/hot-rolls">
                        <span>5</span>
                    </Route>
                    <Route exact path="/wok">
                        <span>6</span>
                    </Route>
                    <Route exact path="/meals">
                        <span>7</span>
                    </Route>
                    <Route exact path="/burgers">
                        <span>8</span>
                    </Route>
                    <Route exact path="/extra">
                        <span>9</span>
                    </Route>

                    <Route exact path="/cart">
                        <Cart />
                    </Route>

                    <Route exact path="/order-details">
                        <OrderDetails />
                    </Route>
                </Switch>
            </div>
            <Footer />
        </Router>
    )
}

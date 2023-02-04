import React from 'react'
import type { FC } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './reset.module.css'
import styles from './App.module.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'

import { Header } from './components/Header'
import { HomeCarousel } from './components/Carousel'
import { NavBar } from './components/NavBar'
import { Search } from './components/Search'
import { Home } from './screens/Home'
import { ItemsList } from './screens/ItemsList'

import { Footer } from './components/Footer'

export const App: FC = () => {
    return (
        <Provider store={store}>
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
                    <HomeCarousel />
                    <NavBar style={{ marginTop: '10px' }} />
                    <div
                        style={{ marginTop: '30px' }}
                        className={styles.search}
                    >
                        <Search />
                    </div>
                    <Switch>
                        <Route exact path="/">
                            <Home style={{ marginTop: '30px' }} />
                        </Route>
                        <Route exact path="/promo">
                            <span>1</span>
                        </Route>
                        <Route exact path="/sets">
                            <span>2</span>
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
                    </Switch>
                </div>
                <Footer />
            </Router>
        </Provider>
    )
}

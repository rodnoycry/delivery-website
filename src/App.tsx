import React from 'react'
import type { FC } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './reset.module.css'
import styles from './App.module.css'
import { Header } from './components/Header'
import { HomeCarousel } from './components/Carousel'
import { NavBar } from './components/NavBar'
import { Home } from './screens/Home'

export const App: FC = () => {
    return (
        <Router>
            <div className={styles.main}>
                <Header />
                <HomeCarousel />
                <NavBar />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/promo">
                        <span>1</span>
                    </Route>
                    <Route exact path="/sets">
                        <span>2</span>
                    </Route>
                    <Route exact path="/pizza">
                        <span>3</span>
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
        </Router>
    )
}

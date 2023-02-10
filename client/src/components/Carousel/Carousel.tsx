import React from 'react'
import type { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import styles from './Carousel.module.css'
import ArrowPrev from './images/ArrowLeft.png'
import ArrowNext from './images/ArrowRight.png'

import Image0 from '@images/carousel/00.png'
import Image1 from '@images/carousel/01.jpg'
import Image2 from '@images/carousel/02.jpg'

interface Props {
    appearancePaths: string[]
    style?: object
}

const indicators = (): JSX.Element => <div className="indicator" />
const properties = {
    prevArrow: (
        <img
            className={`${styles.arrow as string} ${styles.prev as string}`}
            src={ArrowPrev}
        />
    ),
    nextArrow: (
        <img
            className={`${styles.arrow as string} ${styles.next as string}`}
            src={ArrowNext}
        />
    ),
}

export const HomeCarousel: FC<Props> = ({ appearancePaths, style }) => {
    const location = useLocation()
    const currentPath = location.pathname
    const appearanceStyle =
        appearancePaths.includes(currentPath) || currentPath === '/'
            ? {}
            : { display: 'none' }
    const images = [Image0, Image1, Image2]
    return (
        <div
            className={styles.carouselContainer}
            style={{ ...style, ...appearanceStyle }}
        >
            <Slide
                indicators={indicators}
                canSwipe={false}
                easing="ease-out"
                transitionDuration={2000}
                slidesToShow={3}
                {...properties}
            >
                {images.map((image: string) => {
                    let index = 0
                    const item = (
                        <div
                            className="each-slide-effect"
                            key={index}
                            id={`slide-${index}`}
                        >
                            <div className={styles.item}>
                                <img className={styles.item} src={image} />
                            </div>
                        </div>
                    )
                    index += 1
                    return item
                })}
            </Slide>
        </div>
    )
}

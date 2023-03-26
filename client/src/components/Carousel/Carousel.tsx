import React, { useState, useEffect } from 'react'
import type { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import { CarouselData } from '@/interfaces'
import { UpdateCarouselWindow } from './components'
import styles from './Carousel.module.css'
import ArrowPrev from './images/ArrowLeft.png'
import ArrowNext from './images/ArrowRight.png'

import EditImg from './images/Edit.png'
import AddImg from './images/Add.png'
import { User } from 'firebase/auth'
import { domain } from '@/services/apiService/config'

interface Props {
    user: User | null
    carouselsData: CarouselData[]
    reloadData: () => void
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

const blankCarouselData: CarouselData = {
    id: '',
    image: '',
}

export const HomeCarousel: FC<Props> = ({
    user: parentUser,
    carouselsData: parentCarouselsData,
    reloadData,
    appearancePaths,
    style,
}) => {
    const [carouselsData, setCarouselsData] =
        useState<CarouselData[]>(parentCarouselsData)
    const [slidesToShow, setSlidesToShow] = useState<number>(1)

    useEffect(() => {
        if (parentCarouselsData.length > 0) {
            setCarouselsData(parentCarouselsData)
            const carouselsQty = parentCarouselsData.length
            if (carouselsQty % 2 === 0) {
                setSlidesToShow(carouselsQty - 1)
            } else {
                setSlidesToShow(carouselsQty)
            }
        }
    }, [parentCarouselsData])
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        setUser(parentUser)
    }, [parentUser])

    const [isAdding, setIsAdding] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [currentCarouselData, setCurrentCarouselData] =
        useState<CarouselData>(blankCarouselData)

    useEffect(() => {
        if (!isAdding) {
            setCurrentCarouselData(blankCarouselData)
        }
    }, [isAdding])

    useEffect(() => {
        if (!isEditing) {
            setCurrentCarouselData(blankCarouselData)
        }
    }, [isEditing])

    const location = useLocation()
    const currentPath = location.pathname
    const isAdmin = currentPath.startsWith('/admin/editing')
    const appearanceStyle =
        appearancePaths.includes(currentPath) || currentPath === '/' || isAdmin
            ? {}
            : { display: 'none' }
    return (
        <div
            className={styles.carouselContainer}
            style={{
                ...style,
                ...appearanceStyle,
                maxWidth: 1300 * slidesToShow,
                width: `calc(100vw * ${slidesToShow})`,
            }}
        >
            <Slide
                indicators={indicators}
                autoplay={carouselsData.length > 1}
                canSwipe={true}
                pauseOnHover={true}
                easing="ease-out"
                transitionDuration={2000}
                slidesToShow={slidesToShow}
                duration={5000}
                {...properties}
            >
                {carouselsData.map(({ id, image }: CarouselData) => {
                    let index = 0
                    const item = (
                        <div
                            className="each-slide-effect"
                            key={index}
                            id={`slide-${index}`}
                        >
                            <div className={styles.item}>
                                <div className={styles.itemContainer}>
                                    <img
                                        className={styles.item}
                                        src={`${domain}${image}`}
                                    />
                                </div>
                                {isAdmin ? (
                                    <div className={styles.admin}>
                                        <button
                                            className={styles.admin}
                                            onClick={() => {
                                                setCurrentCarouselData({
                                                    id,
                                                    image,
                                                })
                                                setIsEditing(true)
                                            }}
                                        >
                                            <img
                                                className={styles.adminEdit}
                                                src={EditImg}
                                            />
                                        </button>
                                        <button
                                            className={styles.admin}
                                            onClick={() => {
                                                setIsAdding(true)
                                            }}
                                        >
                                            <img
                                                className={styles.adminAdd}
                                                src={AddImg}
                                            />
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    )
                    index += 1
                    return item
                })}
            </Slide>
            {isAdmin && (isEditing || isAdding) ? (
                <UpdateCarouselWindow
                    user={user}
                    carouselData={currentCarouselData}
                    isAdding={isAdding}
                    setIsAdding={setIsAdding}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    reloadData={reloadData}
                />
            ) : null}
        </div>
    )
}

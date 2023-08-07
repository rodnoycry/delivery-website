import React, {
    useState,
    useContext,
    useRef,
    CSSProperties,
    useEffect,
} from 'react'
import type { FC, RefObject } from 'react'
import { SnapItem, useScroll, useDragToScroll } from 'react-snaplist-carousel'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { PromoData } from '@/interfaces'
import styles from './PromoItem.module.css'
import { IsAdminContext } from '../../../../Home'
import EditImage from './images/Edit.png'
import { domain } from '@/services/apiService/config'

interface Props {
    id: string
    name: string
    description: string
    image: string
    isNew: boolean
    isLast: boolean
    snapList: RefObject<HTMLDivElement>
    setIsEditing?: (isEditing: boolean) => void
    setCurrentPromoData?: (currentPromoData: PromoData) => void
    style?: CSSProperties
}

export const PromoItem: FC<Props> = ({
    id: stringId,
    name,
    description,
    image,
    isNew,
    isLast,
    snapList,
    setIsEditing,
    setCurrentPromoData,
    style,
}) => {
    const id = parseInt(stringId)
    const isAdmin = useContext(IsAdminContext)
    const goToSnapItem = useScroll({ ref: snapList })
    useDragToScroll({ ref: snapList })
    const [isHovered, setIsHovered] = useState(false)

    const [isDescriptionScrolling, setIsDescriptionScrolling] = useState(false)
    const descriptionContainerRef = useRef<HTMLDivElement>(null)
    const touchStartRef = useRef(0)
    const scrollStartRef = useRef(0)
    const isScrollingRef = useRef(false)

    const margin = isLast && !isAdmin ? '0' : '30px'

    useEffect(() => {
        const descriptionContainer = descriptionContainerRef.current
        if (descriptionContainer) {
            // Attach the mousedown and mouseup listeners to scrollbar itself
            const onMouseDown = (_event: Event): void => {
                setIsDescriptionScrolling(true)
            }
            const onMouseUp = (_event: Event): void => {
                setIsDescriptionScrolling(false)
            }
            const onWheel = (event: Event): void => {
                const target = event.currentTarget as HTMLDivElement
                if (
                    ((event as WheelEvent).deltaY < 0 &&
                        target.scrollTop === 0) ||
                    ((event as WheelEvent).deltaY > 0 &&
                        target.scrollHeight - target.clientHeight ===
                            target.scrollTop)
                ) {
                    event.preventDefault()
                }
            }
            descriptionContainer.addEventListener('wheel', onWheel)
            // Mobile scrolling
            const handleTouchStart = (_event: Event): void => {
                isScrollingRef.current = true
            }

            const handleTouchMove = (event: Event): void => {
                if (isScrollingRef.current && event.cancelable) {
                    event.preventDefault()
                }
            }

            const handleTouchEnd = (_event: Event): void => {
                isScrollingRef.current = false
            }
            descriptionContainer.addEventListener(
                'touchstart',
                handleTouchStart
            )
            descriptionContainer.addEventListener('touchmove', handleTouchMove)
            descriptionContainer.addEventListener('touchend', handleTouchEnd)
            descriptionContainer.addEventListener('touchcancel', handleTouchEnd)

            document.addEventListener('touchmove', handleTouchMove, {
                passive: false,
            })

            const scrollbarContainer =
                descriptionContainer.querySelector('.ps__thumb-y')
            if (scrollbarContainer) {
                scrollbarContainer.addEventListener('mousedown', onMouseDown)
                scrollbarContainer.addEventListener('mouseup', onMouseUp)

                // Cleanup function to remove the listener when the component unmounts
                return () => {
                    scrollbarContainer.removeEventListener(
                        'mousedown',
                        onMouseDown
                    )
                    scrollbarContainer.removeEventListener('mouseup', onMouseUp)
                    descriptionContainer.removeEventListener('wheel', onWheel)

                    descriptionContainer.removeEventListener(
                        'touchstart',
                        handleTouchStart
                    )
                    descriptionContainer.removeEventListener(
                        'touchmove',
                        handleTouchMove
                    )
                    descriptionContainer.removeEventListener(
                        'touchend',
                        handleTouchEnd
                    )
                    descriptionContainer.removeEventListener(
                        'touchcancel',
                        handleTouchEnd
                    )

                    document.removeEventListener('touchmove', handleTouchMove)
                }
            }
        }
    }, [])
    return (
        <SnapItem margin={{ right: margin }} snapAlign="center">
            <div
                className={styles.promo}
                style={style}
                onClick={() => {
                    goToSnapItem(id - 1)
                }}
                onMouseEnter={() => {
                    setIsHovered(true)
                }}
                onMouseLeave={() => {
                    setIsHovered(false)
                }}
                onTouchStart={() => {
                    setIsHovered(true)
                }}
            >
                {isAdmin ? (
                    <button
                        className={styles.adminEdit}
                        onClick={() => {
                            if (setCurrentPromoData && setIsEditing) {
                                setIsEditing(true)
                                setCurrentPromoData({
                                    id: stringId,
                                    name,
                                    description,
                                    image,
                                    isNew,
                                })
                            }
                        }}
                    >
                        <img className={styles.adminEdit} src={EditImage} />
                    </button>
                ) : null}
                {isNew ? <div className={styles.newLabel}>New</div> : null}
                <img
                    className={`${styles.promo as string} ${
                        styles.selector as string
                    }`}
                    src={`${domain}${image}`}
                />
                <div
                    ref={descriptionContainerRef}
                    className={styles.promoTip}
                    onWheel={(e) => {
                        e.stopPropagation()
                    }}
                    style={{
                        top: isHovered || isDescriptionScrolling ? '0' : '100%',
                    }}
                >
                    <PerfectScrollbar>
                        <div className={styles.descriptionContainer}>
                            <h1 className={styles.descriptionContainer}>
                                {name}
                            </h1>
                            <p className={styles.descriptionContainer}>
                                {description}
                            </p>
                        </div>
                    </PerfectScrollbar>
                </div>
            </div>
        </SnapItem>
    )
}

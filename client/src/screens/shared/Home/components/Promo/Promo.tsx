import React, {
    useRef,
    useState,
    useEffect,
    useContext,
    CSSProperties,
} from 'react'
import type { FC } from 'react'
import { SnapList } from 'react-snaplist-carousel'
import { PromoData } from '@/interfaces'
import { PromoItem } from './components/PromoItem'
import { BlankItem } from './components/BlankItem'
import { IsAdminContext } from '../../Home'
import styles from './Promo.module.css'
import { promoData } from './promoData'

const blankPromoData: PromoData = {
    id: 0,
    name: '',
    description: '',
    image: '',
    isNew: false,
}

const itemStyle: CSSProperties = {
    height: 230,
    borderRadius: 7,
}

export const Promo: FC = () => {
    const [isAdding, setIsAdding] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [currentPromoData, setCurrentPromoData] =
        useState<PromoData>(blankPromoData)

    useEffect(() => {
        if (!isAdding) {
            setCurrentPromoData(blankPromoData)
        }
    }, [isAdding])

    useEffect(() => {
        if (!isEditing) {
            setCurrentPromoData(blankPromoData)
        }
    }, [isEditing])

    const isAdmin = useContext(IsAdminContext)
    const snapList = useRef(null)
    return (
        <div className={styles.promoContainer}>
            <h1 className="category">Акции</h1>
            <SnapList
                className={styles.promoSnapList}
                direction="horizontal"
                ref={snapList}
            >
                {promoData.map((props: PromoData): JSX.Element => {
                    const isLast = props.id === promoData.at(-1)?.id
                    return (
                        <PromoItem
                            key={props.id}
                            {...props}
                            snapList={snapList}
                            isLast={isLast}
                            setIsEditing={setIsEditing}
                            setCurrentPromoData={
                                isAdmin ? setCurrentPromoData : undefined
                            }
                            style={itemStyle}
                        />
                    )
                })}
                {isAdmin ? <BlankItem setIsAdding={setIsAdding} /> : null}
            </SnapList>
        </div>
    )
}

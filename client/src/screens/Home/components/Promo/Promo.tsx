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
import { PromoItem, BlankItem, UpdatePromoWindow } from './components'
import { IsAdminContext } from '../../Home'
import styles from './Promo.module.css'

const blankPromoData: PromoData = {
    id: '0',
    name: '',
    description: '',
    image: '',
    isNew: false,
}

const itemStyle: CSSProperties = {
    height: 230,
    borderRadius: 7,
}

interface Props {
    promosData: PromoData[]
    reloadData: () => void
}

export const Promo: FC<Props> = ({
    promosData: parentPromosData,
    reloadData,
}) => {
    const [isAdding, setIsAdding] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [promosData, setPromosData] = useState<PromoData[]>(parentPromosData)
    const [currentPromoData, setCurrentPromoData] =
        useState<PromoData>(blankPromoData)

    useEffect(() => {
        setPromosData(parentPromosData)
    }, [parentPromosData])

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
                {promosData.map((props: PromoData): JSX.Element => {
                    const isLast = props.id === promosData.at(-1)?.id
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
                        />
                    )
                })}
                {isAdmin ? <BlankItem setIsAdding={setIsAdding} /> : null}
            </SnapList>
            {isAdmin && (isAdding || isEditing) ? (
                <UpdatePromoWindow
                    currentPromoData={currentPromoData}
                    setCurrentPromoData={setCurrentPromoData}
                    isAddingPromo={isAdding}
                    setIsAddingPromo={setIsAdding}
                    isEditingPromo={isEditing}
                    setIsEditingPromo={setIsEditing}
                    reloadData={reloadData}
                />
            ) : null}
        </div>
    )
}

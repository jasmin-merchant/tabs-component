import { FC } from 'react'

export interface ITabPane {
    title: string
    isActive?: boolean
}

const TabPane: FC<ITabPane> = ({
    isActive,
    children
}) => {
    return (
        <div className={`${!isActive ? "hidden" : ""} tab-content`}>
            <p>{children}</p>
        </div>
    )
}

export default TabPane
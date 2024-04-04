import React from 'react'
import NotificationLink from '../../components/NotificationLink'
const Header = () => {
    return (
        <div className="flex justify-between items-center">
            <span className="text-3xl font-bold">Explore</span>
            <NotificationLink />
        </div>
    )
}
export default Header

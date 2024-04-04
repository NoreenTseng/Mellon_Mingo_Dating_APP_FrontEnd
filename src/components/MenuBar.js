import React, { useEffect, useState } from 'react'
import {
    HomeIcon,
    HeartIcon,
    ChatBubbleOvalLeftIcon,
    UserIcon,
} from '@heroicons/react/24/solid'
const MobileMenuBar = () => {
    const [activeTab, setActiveTab] = useState('match')
    useEffect(() => {
        let activeTabName = window.location.pathname.split('/')[1]
        if (activeTabName === 'profile') {
            activeTabName = 'profile/view'
        }
        setActiveTab(activeTabName || 'match')
    }, [window.location.pathname])
    const MenuButton = ({ icon, name, style, className, child }) => (
        <button
            onClick={() => {
                window.location.href = `/${name === 'match' ? '' : name}`
            }}
            className={`${className} flex-1 text-center py-2
            flex items-center justify-center
            ${activeTab === name ? '' : 'text-purple-500'}`}
            style={style}
        >
            <span
                className={`h-9 w-9 rounded-full flex items-center justify-center
                ${
                    activeTab === name
                        ? 'bg-purple-heavy shadow-md border-solid border-2 border-purple-100'
                        : ''
                }`}
                style={activeTab === name ? { color: 'white' } : {}}
            >
                {icon}
            </span>
            {child}
        </button>
    )

    return (
        <div className="fixed bottom-3 left-2 right-2 bg-purple-bg border-4 border-purple-border shadow-lg flex rounded-full">
            <div className="relative flex-1 flex justify-between z-10 px-5">
                <MenuButton
                    icon={
                        <HomeIcon
                            className={`${
                                activeTab === 'match' ? 'h-6 w-6' : 'h-5 w-5'
                            } mx-auto`}
                        />
                    }
                    className="w-32 h-16 bg-center bg-repeat-x relative bg-menu-line-bg"
                    name="match"
                />
                <MenuButton
                    icon={
                        <HeartIcon
                            className={`${
                                activeTab === 'stories' ? 'h-6 w-6' : 'h-5 w-5'
                            } mx-auto`}
                        />
                    }
                    name="stories"
                    className="bg-center bg-repeat-x relative bg-menu-line-bg"
                />
                <MenuButton
                    icon={
                        <ChatBubbleOvalLeftIcon
                            className={`${
                                activeTab === 'chat' ? 'h-6 w-6' : 'h-5 w-5'
                            } mx-auto`}
                        />
                    }
                    name="chat"
                    className="bg-center bg-repeat-x relative  bg-menu-line-bg"
                />
                <MenuButton
                    icon={
                        <UserIcon
                            className={`${
                                activeTab === 'profile' ? 'h-6 w-6' : 'h-5 w-5'
                            } mx-auto`}
                        />
                    }
                    name="profile/view"
                    className="bg-center bg-repeat-x relative bg-menu-line-bg"
                />
            </div>
        </div>
    )
}

export default MobileMenuBar

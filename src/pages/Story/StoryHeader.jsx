import React, { useEffect } from 'react'
import { PlusIcon } from '@heroicons/react/24/solid'
import { useAuth } from '../../components/AuthContext'
import { Button } from 'antd-mobile'
import { fetchWithToken } from '../../utils/util'
const StoryHeader = ({ setIsEditing, setIsManagingStories }) => {
    const { currentUserId } = useAuth()
    const [profileImg, setProfileImg] = React.useState('')
    const [userName, setUserName] = React.useState('')
    useEffect(() => {
        currentUserId &&
            fetchWithToken(
                `http://localhost:8080/profiles/user/${currentUserId}`
            )
                .then((res) => res.json())
                .then((res) => {
                    setUserName(res.nickname)
                    res.imageUrls && setProfileImg(JSON.parse(res.imageUrls)[0])
                })
    }, [currentUserId])
    return (
        <div className="bg-purple-bg fixed z-30 w-screen left-0 top-0 pt-4 pb-4 border-b-2">
            <div className="pl-4 pr-4 flex w-full items-center justify-between">
                <div className="flex items-center">
                    <div
                        className="h-10 w-10 rounded-md bg-no-repeat bg-cover mr-3"
                        style={{
                            backgroundImage: `url(${profileImg})`,
                        }}
                    ></div>
                    <div>
                        <div className="text-md font-bold">{userName}</div>
                    </div>
                </div>
                <div className="w-[45%] flex items-center">
                    <Button
                        fill="none"
                        onClick={() => {
                            setIsManagingStories(true)
                        }}
                    >
                        Manage Stories
                    </Button>
                    <PlusIcon
                        className="h-6 w-6"
                        onClick={() => {
                            setIsEditing(true)
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
export default StoryHeader

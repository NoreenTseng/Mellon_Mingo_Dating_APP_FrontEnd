import React, { useEffect, useState } from 'react'
import MatchHeader from './MatchHeader'
import MatchCard from './MatchCard/MatchCard'
import UserProfile from '../../components/UserProfile'
import { fetchWithToken } from '../../utils/util'
import { useAuth } from '../../components/AuthContext'

import {
    ChevronDoubleDownIcon,
    ChevronDoubleUpIcon,
} from '@heroicons/react/24/solid'
import MatchedAlert from './MatchedAlert'

const Match = () => {
    // mode: swipe or view
    const [isViewingProfile, setIsViewingProfile] = useState(false)
    const [currentUserData, setCurrentUserData] = useState('')
    const [topCardId, setTopCardId] = useState('')
    const [leftUsers, setLeftUsers] = useState([])
    const [matchedUserData, setMatchedUserData] = useState()
    const { currentUserId } = useAuth()

    useEffect(() => {
        if (!currentUserId) return
        // fetchWithToken(`http://localhost:8080/profiles/user/${currentUserId}`)
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setCurrentUserData(data)
        //     })

        const fetchProfile = async () => {
            try {
                const response = await fetchWithToken(
                    `http://localhost:8080/profiles/user/${currentUserId}`,
                    { method: 'GET' }
                )
                if (!response.ok) {
                    throw new Error('Profile fetch failed')
                }
                const profileData = await response.json()
                setCurrentUserData(profileData)
            } catch (error) {
                console.error('Error fetching profile', error)
            }
        }
        fetchProfile()
    }, [currentUserId])

    useEffect(() => {
        if (!currentUserId) return

        if (!currentUserData) return

        fetchWithToken(`http://localhost:8080/recommendations/${currentUserId}`)
            .then((res) => res.json())
            .then((data) => {
                setLeftUsers(data)

                if (data && data.length > 0) {
                    setTopCardId(data[0].userId)
                } else {
                    setTopCardId('')
                }
            })
    }, [currentUserId, currentUserData])
    console.log('leftUsers in index.js: ', leftUsers)

    return (
        <>
            {matchedUserData && (
                <MatchedAlert
                    {...matchedUserData}
                    setMatchedUserData={setMatchedUserData}
                />
            )}
            <MatchHeader />
            <div className="h-[67vh]">
                {leftUsers.length === 0 ? (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-2xl">No more people around you</p>
                    </div>
                ) : (
                    <>
                        {!isViewingProfile ? (
                            <MatchCard
                                leftUsers={leftUsers}
                                setLeftUsers={setLeftUsers}
                                setCurrentUserId={setTopCardId}
                                setMatchedUserData={setMatchedUserData}
                            />
                        ) : (
                            <UserProfile inputUserProfile={leftUsers[0]} />
                        )}
                        <span
                            className={`absolute right-10 bottom-10 h-8 w-8 rounded-full font-bold flex items-center justify-center`}
                            onClick={() => {
                                setIsViewingProfile(!isViewingProfile)
                            }}
                        >
                            {isViewingProfile ? (
                                <ChevronDoubleDownIcon className="h-8 w-8  text-purple-500 bg-black" />
                            ) : (
                                <ChevronDoubleUpIcon className="h-8 w-8  text-purple-500 bg-black" />
                            )}
                        </span>
                    </>
                )}
            </div>
        </>
    )
}
export default Match

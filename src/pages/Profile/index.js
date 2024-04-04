import React, { useState, useEffect } from 'react'
import ProfileView from './ProfileView/ProfileView'
import ProfileEdit from './ProfileEdit/ProfileEdit'
import { useAuth } from '../../components/AuthContext'
import { fetchWithToken } from '../../utils/util'

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [isNewUser, setIsNewUser] = useState(false)
    const [profile, setProfile] = useState({
        userId: 0,
        nickname: '',
        age: 0,
        gender: 'Female',
        imageUrls: '[]',
        bio: '',
        lastLatitude: 0,
        lastLongitude: 0,
        lookingFor: 'Male',
        mbti: '',
        hobbies: '',
        strategyType: 'DISTANCE',
        drinks: 'NEVER',
        drugs: 'NEVER',
        education: 'MASTER',
        height: 0,
        profileId: 0,
    })
    const { currentUserId } = useAuth()
    useEffect(() => {
        if (window.location.pathname.split('/')[2] === 'edit') {
            setIsEditing(true)
        }
    }, [window.location.pathname])
    useEffect(() => {
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
                setProfile(profileData)
            } catch (error) {
                setIsEditing(true)
                setIsNewUser(true)
                alert('Create your profile first!')
                console.error('Error fetching profile', error)
            }
        }
        if (currentUserId) {
            fetchProfile()
        }
    }, [currentUserId])
    return (
        <div className="mb-24">
            {isEditing ? (
                <ProfileEdit
                    setIsEditing={setIsEditing}
                    userProfile={profile}
                    isNewUser={isNewUser}
                />
            ) : (
                profile && (
                    <ProfileView
                        setIsEditing={setIsEditing}
                        userProfile={profile}
                    />
                )
            )}
        </div>
    )
}

export default Profile

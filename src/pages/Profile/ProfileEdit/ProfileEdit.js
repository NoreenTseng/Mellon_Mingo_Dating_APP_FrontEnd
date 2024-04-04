import React, { useState, useEffect } from 'react'
import MultiImageUploader from '../../../components/MultiImageUploader'
import { TextArea, Button } from 'antd-mobile'
import { fetchWithToken } from '../../../utils/util'
import { useAuth } from '../../../components/AuthContext'
import './ProfileEdit.css'

import {
    UserPlusIcon,
    CalendarDaysIcon,
    PuzzlePieceIcon,
    BookOpenIcon,
    PlayCircleIcon,
    MapPinIcon,
    HeartIcon,
    LightBulbIcon,
    AdjustmentsVerticalIcon,
    AcademicCapIcon,
    BeakerIcon,
    EllipsisVerticalIcon,
    ChevronDoubleUpIcon,
} from '@heroicons/react/24/outline'

const ProfileEdit = ({ setIsEditing, userProfile, isNewUser }) => {
    const { currentUserId } = useAuth()

    // State for each form input
    const [editedNickname, setEditedNickname] = React.useState(
        userProfile?.nickname || ''
    )
    const [editedAge, setEditedAge] = React.useState(userProfile?.age || '')
    const [editedGender, setEditedGender] = React.useState(
        userProfile?.gender || ''
    )
    const [editedBio, setEditedBio] = React.useState(userProfile?.bio || '')
    const [editedLookingFor, setEditedLookingFor] = React.useState(
        userProfile?.lookingFor || ''
    )
    const [editedMbti, setEditedMbti] = React.useState(userProfile?.mbti || '')
    const [editedHobbies, setEditedHobbies] = React.useState(
        userProfile?.hobbies || ''
    )
    const [editedDrinks, setEditedDrinks] = React.useState(
        userProfile?.drinks || 'NEVER'
    )
    const [editedDrugs, setEditedDrugs] = React.useState(
        userProfile?.drugs || 'NEVER'
    )
    const [editedEducation, setEditedEducation] = React.useState(
        userProfile?.education || 'OTHER'
    )
    const [editedHeight, setEditedHeight] = React.useState(
        userProfile?.height || ''
    )
    /* Qs: We just need editedProfileImage right? */
    // const [uploadedImgUrls, setUploadedImgUrls] = React.useState([])
    const [editedProfileImage, setEditedProfileImage] = React.useState(
        userProfile?.profileImageUrl || ''
    )
    const [editedImageUrls, setEditedImageUrls] = React.useState(
        userProfile?.imageUrls
    )
    /* Qs: Do we have Location transformation components ??? */
    const [editedLastLatitude, setEditedLastLatitude] = React.useState(
        userProfile?.lastLatitude || ''
    )
    const [editedLastLongitude, setEditedLastLongitude] = React.useState(
        userProfile?.lastLongitude || ''
    )
    const [editedStrategyType, setEditedStrategyType] = React.useState(
        userProfile?.StrategyType || 'DISTANCE'
    )

    // Handle form submission logic: PUT request to update profile and setIsEditing
    const handleSubmit = (event) => {
        event.preventDefault()

        const updatedProfile = {
            nickname: editedNickname,
            age: Number(editedAge),
            gender: editedGender,
            bio: editedBio,
            lookingFor: editedLookingFor,
            mbti: editedMbti,
            hobbies: editedHobbies,
            drinks: editedDrinks,
            drugs: editedDrugs,
            education: editedEducation,
            height: Number(editedHeight),
            /* Qs: We just need editedProfileImage right? */
            profileImageUrl: editedProfileImage,
            imageUrls: editedImageUrls,
            /* Qs: Do we have Location transformation components ??? */
            lastLatitude: Number(editedLastLatitude),
            lastLongitude: Number(editedLastLongitude),
            strategyType: editedStrategyType,
        }

        fetchWithToken(`http://localhost:8080/profiles/user/${currentUserId}`, {
            method: isNewUser ? 'POST' : 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProfile),
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response data
                window.location.href = '/profile/view'
            })
            .catch((error) => console.error('Error:', error))
    }

    const [error, setError] = useState(null)

    const getLocation = () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser')
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setEditedLastLatitude(position.coords.latitude)
                    setEditedLastLongitude(position.coords.longitude)
                },
                () => {
                    setError('Unable to retrieve your location')
                }
            )
        }
    }

    useEffect(() => {
        getLocation()
    }, [])

    return (
        <div className="user-profile-edit">
            <div>
                <h2>Your Location</h2>
                {error ? <p>Error: {error}</p> : <p></p>}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-item">
                    <UserPlusIcon className="h-6 w-6 mr-2" />
                    <label>Nickname:</label>
                    <input
                        type="text"
                        value={editedNickname}
                        onChange={(e) => setEditedNickname(e.target.value)}
                    />
                </div>
                <div className="form-item">
                    <CalendarDaysIcon className="h-6 w-6 mr-2" />
                    <label>Age:</label>
                    <input
                        type="number"
                        value={editedAge}
                        onChange={(e) => setEditedAge(e.target.value)}
                    />
                </div>
                <div className="form-item">
                    <PuzzlePieceIcon className="h-6 w-6 mr-2" />
                    <label>Gender:</label>
                    <select
                        value={editedGender}
                        onChange={(e) => setEditedGender(e.target.value)}
                    >
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                    </select>
                </div>
                <div className="form-item">
                    <BookOpenIcon className="h-6 w-6 mr-2" />
                    <label>Bio:</label>
                    <input
                        type="text"
                        value={editedBio}
                        onChange={(e) => setEditedBio(e.target.value)}
                    />
                </div>
                <div className="form-item">
                    <HeartIcon className="h-6 w-6 mr-2" />
                    <label>Looking For (Gender):</label>
                    <select
                        value={editedLookingFor}
                        onChange={(e) => setEditedLookingFor(e.target.value)}
                    >
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                    </select>
                </div>
                <div className="form-item">
                    <LightBulbIcon className="h-6 w-6 mr-2" />
                    <label>MBTI:</label>
                    <input
                        type="text"
                        value={editedMbti}
                        onChange={(e) => setEditedMbti(e.target.value)}
                    />
                </div>
                <div className="form-item">
                    <PlayCircleIcon className="h-6 w-6 mr-2" />
                    <label>Hobbies:</label>
                    <input
                        type="text"
                        placeholder="Diving, Hiking, etc."
                        value={editedHobbies}
                        onChange={(e) => setEditedHobbies(e.target.value)}
                    />
                </div>
                <div className="form-item">
                    <ChevronDoubleUpIcon className="h-6 w-6 mr-2" />
                    <label>Height:</label>
                    <input
                        type="number"
                        placeholder="Uint: Centimeter(cm)"
                        value={editedHeight}
                        onChange={(e) => setEditedHeight(e.target.value)}
                    />
                </div>
                {/* Dropdown for enum, Matching Strategy */}
                <div className="form-item">
                    <AdjustmentsVerticalIcon className="h-6 w-6 mr-2" />
                    <label>Matching Strategy: </label>
                    <select
                        value={editedStrategyType}
                        onChange={(e) => setEditedStrategyType(e.target.value)}
                    >
                        <option value="DISTANCE">Distance</option>
                        <option value="HOBBIES">Hobbies</option>
                    </select>
                </div>
                {/* Dropdown for enum, Education */}
                <div className="form-item">
                    <AcademicCapIcon className="h-6 w-6 mr-2" />
                    <label>Education:</label>
                    <select
                        value={editedEducation}
                        onChange={(e) => setEditedEducation(e.target.value)}
                    >
                        <option value="MASTER">Master</option>
                        <option value="BACHELOR">Bachelor</option>
                        <option value="HIGH_SCHOOL">High School</option>
                        <option value="PHD">PhD</option>
                        <option value="OTHER">Other</option>
                    </select>
                </div>
                {/* Dropdown for enum, Drinks */}
                <div className="form-item">
                    <BeakerIcon className="h-6 w-6 mr-2" />
                    <label>Drinks:</label>
                    <select
                        value={editedDrinks}
                        onChange={(e) => setEditedDrinks(e.target.value)}
                    >
                        <option value="NEVER">NEVER</option>
                        <option value="SOCIALLY">SOCIALLY</option>
                        <option value="OFTEN">OFTEN</option>
                    </select>
                </div>
                {/* Dropdown for enum, Drugs */}
                <div className="form-item">
                    <EllipsisVerticalIcon className="h-6 w-6 mr-2" />
                    <label>Drugs:</label>
                    <select
                        value={editedDrugs}
                        onChange={(e) => setEditedDrugs(e.target.value)}
                    >
                        <option value="NEVER">NEVER</option>
                        <option value="SOCIALLY">SOCIALLY</option>
                        <option value="OFTEN">OFTEN</option>
                    </select>
                </div>
                {/* Qs: Previous/Delete/Upates??? */}
                {/* Qs: mt-5 ml-2 mr-2 mb-7 */}
                <div className="form-item">
                    <label>Profile Images:</label>
                    <MultiImageUploader
                        defaultFileList={JSON.parse(userProfile?.imageUrls).map(
                            (url) => {
                                return {
                                    uid: url,
                                    name: url,
                                    status: 'done',
                                    url: url,
                                }
                            }
                        )}
                        setUploadedImgUrl={(urls) => {
                            setEditedImageUrls(JSON.stringify(urls))
                        }}
                    />
                </div>
                {/* Qs: when clicking the Cancel button, user should isEdit(false) How to write the code? */}
                {/* Qs: When an user click on the edit button, how the ProfileEdit component know to send False to the setIsEditing function in Profile.js? */}
                <button type="submit">Save Changes</button>
                {/* Qs: when clicking the Cancel button, user should isEdit(false) How to write the code? */}
                {/* Qs: When an user click on the edit button, how the ProfileEdit component know to send False to the setIsEditing function in Profile.js? */}
                <Button
                    fill="none"
                    onClick={() => {
                        setIsEditing(false)
                        window.location.href = '/profile/view'
                    }}
                >
                    Cancel
                </Button>
            </form>
        </div>
    )
}

export default ProfileEdit

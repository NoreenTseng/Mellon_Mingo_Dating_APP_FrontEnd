import React from 'react'
import './ProfileView.css'

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

const ProfileView = ({ setIsEditing, userProfile }) => {
    
    const handleEdit = () => {
        setIsEditing(true)
    }

    // Split imageUrls string into an array
    const images = JSON.parse(userProfile.imageUrls) || []
    return (
        <div className="user-profile-view">
            <div className="profile-header">
                <img src={images[0]} alt="Profile" className="profile-image" />
                <h1 className="text-2xl font-bold">{userProfile.nickname}</h1>
            </div>
            <div className="profile-details">
                <div className="detail-item">
                    <CalendarDaysIcon className="icon" />
                    <span>{userProfile.age} years old</span>
                </div>
                <div className="detail-item">
                    <PuzzlePieceIcon className="icon" />
                    <span>Gender: {userProfile.gender}</span>
                </div>
                <div className="detail-item">
                    <BookOpenIcon className="icon" />
                    <span className="font-bold">Bio: </span>
                    <p>{userProfile.bio}</p>
                </div>
                <div className="detail-item">
                    <HeartIcon className="icon" />
                    <span>Looking for: {userProfile.lookingFor}</span>
                </div>
                <div className="detail-item">
                    <LightBulbIcon className="icon" />
                    <span>MBTI: {userProfile.mbti}</span>
                </div>
                <div className="detail-item">
                    <PlayCircleIcon className="icon" />
                    <span className="font-bold">Hobbies</span>
                    <p>{userProfile.hobbies}</p>
                </div>
                <div className="detail-item">
                    <ChevronDoubleUpIcon className="icon" />
                    <span>Height: {userProfile.height} cm</span>
                </div>
                <div className="detail-item">
                    <AdjustmentsVerticalIcon className="icon" />
                    <span>Matching Strategy: {userProfile.strategyType}</span>
                </div>
                <div className="detail-item">
                    <AcademicCapIcon className="icon" />
                    <span>Education: {userProfile.education}</span>
                </div>
                <div className="detail-item">
                    <MapPinIcon className="icon" />
                    <span>
                        Lat: {userProfile.lastLatitude}, Long:{' '}
                        {userProfile.lastLongitude}
                    </span>
                </div>
                <div className="detail-item">
                    <BeakerIcon className="icon" />
                    <span>Drinks: {userProfile.drinks}</span>
                </div>
                <div className="detail-item">
                    <EllipsisVerticalIcon className="icon" />
                    <span>Drugs: {userProfile.drugs}</span>
                </div>
            </div>
            <div className="additional-images">
                {images?.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Extra ${index}`}
                        className="extra-image"
                    />
                ))}
            </div>
            <button className="edit-button" onClick={handleEdit}>
                Edit
            </button>
        </div>
    )
}

export default ProfileView

import React, { useState } from 'react'
import TinderCard from 'react-tinder-card'
import { fetchWithToken } from '../../../utils/util'
import { useAuth } from '../../../components/AuthContext'
import './MatchCard.css'

function Simple({
    leftUsers,
    setLeftUsers,
    setCurrentUserId,
    setMatchedUserData,
}) {
    console.log('leftUsers in matchCard.js: ', leftUsers)
    const characters = [...leftUsers].reverse()
    const { currentUserId } = useAuth()

    //const characters = leftUsers.toReversed()

    const [lastDirection, setLastDirection] = useState()
    const swiped = (direction, userIdDelete, nameToDelete, firstImgUrl) => {
        console.log(
            'direction: ' + direction,
            'userIdDelete: ' + userIdDelete,
            'nameToDelete: ' + nameToDelete,
            'firstImgUrl: ' + firstImgUrl
        )
        setLastDirection(direction)
        setLeftUsers(leftUsers.filter((c) => c.userId !== userIdDelete))

        fetchWithToken(`http://localhost:8080/swipes/${direction}`, {
            method: 'POST',
            body: JSON.stringify({
                swiperUserId: currentUserId,
                swipeeUserId: userIdDelete,
            }),
        }).then((res) => {
            console.log('res: ', res)
            // if (!res.ok) {
            //     console.error('res: ', res)
            //     throw new Error('Swipe failed')
            // }

            console.log('Successfully swiped')
        })

        // fake match behavior
        // if (direction === 'right' && userIdDelete === '02') {
        //     setMatchedUserData({
        //         userId: userIdDelete,
        //         imgUrl: firstImgUrl,
        //     })
        // }
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }
    console.log('characters: ', characters)
    return (
        <div className="mt-10">
            <div className="cardContainer flex justify-center">
                {characters.map((character, index) => (
                    <TinderCard
                        className="swipe"
                        key={character.name}
                        onSwipe={(dir) => {
                            swiped(
                                dir,
                                character.userId,
                                character.nickname,
                                JSON.parse(character.imageUrls)[0]
                            )
                        }}
                        onCardLeftScreen={() => {
                            outOfFrame(character.name)
                            if (index > 0) {
                                setCurrentUserId(characters[index - 1].userId)
                            }
                        }}
                    >
                        <div
                            style={{
                                backgroundImage:
                                    'url(' +
                                    JSON.parse(character.imageUrls)[0] +
                                    ')',
                            }}
                            className="card w-full"
                        >
                            <h3>{character.name}</h3>
                        </div>
                    </TinderCard>
                ))}
            </div>
            {lastDirection ? (
                <div className="h-100">
                    <h2 className="infoText"></h2>
                </div>
            ) : (
                <h2 className="infoText" />
            )}
        </div>
    )
}

export default Simple
